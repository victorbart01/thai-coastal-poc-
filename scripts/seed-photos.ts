import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

function loadEnv() {
  const envPath = resolve(process.cwd(), ".env.local");
  const content = readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx);
    const value = trimmed.slice(idx + 1);
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY!;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
  process.exit(1);
}

if (!GOOGLE_API_KEY) {
  console.error("Missing GOOGLE_PLACES_API_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const SEED_EMAILS = [
  "gulf@seaglassmap.com",
  "islands@seaglassmap.com",
  "andaman@seaglassmap.com",
];

const PHOTOS_PER_SPOT = 3;
const DELAY_MS = 500;

// ---------------------------------------------------------------------------
// Google Places helpers
// ---------------------------------------------------------------------------

async function searchPlacePhotos(
  query: string,
  lat: number,
  lng: number
): Promise<string[]> {
  const res = await fetch(
    "https://places.googleapis.com/v1/places:searchText",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_API_KEY,
        "X-Goog-FieldMask": "places.photos",
      },
      body: JSON.stringify({
        textQuery: query,
        locationBias: {
          circle: {
            center: { latitude: lat, longitude: lng },
            radius: 10000,
          },
        },
        maxResultCount: 1,
      }),
    }
  );

  if (!res.ok) {
    console.error(`  Places search failed (${res.status}): ${await res.text()}`);
    return [];
  }

  const data = await res.json();
  const place = data.places?.[0];
  if (!place?.photos?.length) return [];

  return place.photos
    .slice(0, PHOTOS_PER_SPOT)
    .map((p: { name: string }) => p.name);
}

async function fetchPhotoBuffer(
  photoRef: string
): Promise<{ buffer: Buffer; contentType: string } | null> {
  const url = `https://places.googleapis.com/v1/${photoRef}/media?maxWidthPx=800&key=${GOOGLE_API_KEY}`;
  const res = await fetch(url, { redirect: "follow" });

  if (!res.ok) {
    console.error(`  Photo fetch failed (${res.status})`);
    return null;
  }

  const contentType = res.headers.get("content-type") ?? "image/jpeg";
  const buffer = Buffer.from(await res.arrayBuffer());
  return { buffer, contentType };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("📸 Seed Photos — Fetching Google Places photos for seeded spots\n");

  // 1. Resolve seed account user IDs
  const { data: usersData } = await supabase.auth.admin.listUsers();
  const seedUsers = SEED_EMAILS.map((email) => {
    const user = usersData?.users.find((u) => u.email === email);
    if (!user) {
      console.error(`Seed account not found: ${email}. Run seed:spots first.`);
      process.exit(1);
    }
    return user;
  });

  const seedUserIds = seedUsers.map((u) => u.id);
  console.log(`Found ${seedUserIds.length} seed accounts\n`);

  // 2. Fetch all spots belonging to seed accounts
  const { data: spots, error: spotsError } = await supabase
    .from("spots")
    .select("id, title, latitude, longitude, user_id")
    .in("user_id", seedUserIds);

  if (spotsError) {
    console.error("Failed to fetch spots:", spotsError.message);
    process.exit(1);
  }

  console.log(`Found ${spots.length} seeded spots\n`);

  // 3. Fetch existing photos to skip spots that already have them
  const spotIds = spots.map((s) => s.id);
  const { data: existingPhotos } = await supabase
    .from("spot_photos")
    .select("spot_id")
    .in("spot_id", spotIds);

  const spotsWithPhotos = new Set(
    (existingPhotos ?? []).map((p: { spot_id: string }) => p.spot_id)
  );

  // 4. Process each spot
  let uploaded = 0;
  let skipped = 0;

  for (const spot of spots) {
    if (spotsWithPhotos.has(spot.id)) {
      console.log(`  → Skipping "${spot.title}" (already has photos)`);
      skipped++;
      continue;
    }

    console.log(`  Processing "${spot.title}"...`);

    // Search Google Places
    const query = `${spot.title} beach Thailand`;
    const photoRefs = await searchPlacePhotos(
      query,
      spot.latitude,
      spot.longitude
    );

    if (photoRefs.length === 0) {
      console.log(`    No photos found`);
      await sleep(DELAY_MS);
      continue;
    }

    // Fetch and upload each photo
    for (let i = 0; i < photoRefs.length; i++) {
      const result = await fetchPhotoBuffer(photoRefs[i]);
      if (!result) continue;

      const ext = result.contentType.includes("png") ? "png" : "jpg";
      const storagePath = `${spot.user_id}/${spot.id}/${i}.${ext}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("spot-photos")
        .upload(storagePath, result.buffer, {
          contentType: result.contentType,
          upsert: true,
        });

      if (uploadError) {
        console.log(`    Upload failed for photo ${i}: ${uploadError.message}`);
        continue;
      }

      // Insert row in spot_photos
      const { error: insertError } = await supabase
        .from("spot_photos")
        .insert({
          spot_id: spot.id,
          storage_path: storagePath,
          position: i,
        });

      if (insertError) {
        console.log(`    DB insert failed for photo ${i}: ${insertError.message}`);
        continue;
      }

      uploaded++;
    }

    console.log(`    Uploaded ${photoRefs.length} photo(s)`);
    await sleep(DELAY_MS);
  }

  // 5. Summary
  console.log("\n--- Summary ---");
  console.log(
    `Uploaded ${uploaded} photos across ${spots.length - skipped} spots (${skipped} skipped)`
  );
  console.log("Done! 🎉");
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
