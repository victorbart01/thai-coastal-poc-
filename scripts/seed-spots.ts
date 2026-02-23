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

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ---------------------------------------------------------------------------
// Accounts
// ---------------------------------------------------------------------------

interface Account {
  email: string;
  password: string;
  display_name: string;
  bio: string;
  avatar_seed: string;
}

const ACCOUNTS: Account[] = [
  {
    email: "gulf@seaglassmap.com",
    password: "SeedAccount!Gulf2024",
    display_name: "Gulf Explorer",
    bio: "Exploring the Upper Gulf coast for sea glass treasures",
    avatar_seed: "gulf-explorer",
  },
  {
    email: "islands@seaglassmap.com",
    password: "SeedAccount!Islands2024",
    display_name: "Island Hunter",
    bio: "Hopping between Thai islands in search of sea glass",
    avatar_seed: "island-hunter",
  },
  {
    email: "andaman@seaglassmap.com",
    password: "SeedAccount!Andaman2024",
    display_name: "Andaman Scout",
    bio: "Scouting the Eastern Seaboard and Andaman coast",
    avatar_seed: "andaman-scout",
  },
];

function avatarUrl(seed: string): string {
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}`;
}

// ---------------------------------------------------------------------------
// Spot definitions (mapped from geojson)
// ---------------------------------------------------------------------------

type SpotTag =
  | "rocky_beach"
  | "sandy_beach"
  | "cove"
  | "pier"
  | "river_mouth"
  | "island"
  | "urban"
  | "remote";

interface SpotDef {
  title: string;
  description: string;
  lat: number;
  lng: number;
  rating: number;
  tags: SpotTag[];
  accountIdx: number; // 0=Gulf, 1=Island, 2=Andaman
}

const SPOTS: SpotDef[] = [
  // --- Gulf Explorer (8 spots) ---
  {
    title: "Bang Saen",
    description:
      "Urban beach just 1h from Bangkok. Brown, green and clear glass found here. A local artisan collects sea glass for jewelry.",
    lat: 13.2933,
    lng: 100.9083,
    rating: 3,
    tags: ["sandy_beach", "urban"],
    accountIdx: 0,
  },
  {
    title: "Koh Si Chang — Hat Tham Phang",
    description:
      "Historic island with a former royal port. Exceptional rounded pieces aged 50-80 years. White, green, brown, and rare turquoise glass.",
    lat: 13.1583,
    lng: 100.8083,
    rating: 4,
    tags: ["island", "sandy_beach"],
    accountIdx: 0,
  },
  {
    title: "Koh Si Chang — Ao Tham Jok Kok",
    description:
      "Rocky bay where sea glass naturally accumulates between the rocks. Turquoise, seafoam, brown and green pieces.",
    lat: 13.148,
    lng: 100.817,
    rating: 4,
    tags: ["island", "rocky_beach", "cove"],
    accountIdx: 0,
  },
  {
    title: "Koh Si Chang — Hat Hin Muad Sila",
    description:
      "Pebble beach with sea glass mixed among the stones. Rare turquoise finds alongside green and brown pieces.",
    lat: 13.162,
    lng: 100.813,
    rating: 3,
    tags: ["island", "rocky_beach"],
    accountIdx: 0,
  },
  {
    title: "Koh Kham Yai",
    description:
      "Known for abundance — sea glass everywhere on the beach! Rare seafoam alongside green, brown and clear pieces.",
    lat: 13.125,
    lng: 100.825,
    rating: 5,
    tags: ["island", "sandy_beach", "remote"],
    accountIdx: 0,
  },
  {
    title: "Bang Saray",
    description:
      "First documented sea glass report in Thailand. Green, brown and white glass at jewelry grade, 3-5 pieces per hour. Best season: Dec–Jun.",
    lat: 12.7617,
    lng: 100.925,
    rating: 3,
    tags: ["sandy_beach", "pier"],
    accountIdx: 0,
  },
  {
    title: "Cha-Am Nord",
    description:
      "Sandy zone near Cha-Am. Only 1 piece found in over an hour — disappointing results. Sandy terrain is not ideal for sea glass.",
    lat: 12.805,
    lng: 99.9667,
    rating: 1,
    tags: ["sandy_beach", "urban"],
    accountIdx: 0,
  },
  {
    title: "Cha-Am — Bang Ketu",
    description:
      "Explored on the same trip as Cha-Am Nord. Very little sea glass found here — the sandy beach doesn't retain pieces well.",
    lat: 12.8167,
    lng: 99.9617,
    rating: 1,
    tags: ["sandy_beach"],
    accountIdx: 0,
  },

  // --- Island Hunter (5 spots) ---
  {
    title: "Koh Tao — Lighthouse Bay",
    description:
      "Isolated beach, 40-minute hike to reach. Rare BLACK sea glass found here! Also turquoise, green and blue pieces. A must-visit for collectors.",
    lat: 10.092,
    lng: 99.847,
    rating: 4,
    tags: ["island", "rocky_beach", "remote"],
    accountIdx: 1,
  },
  {
    title: "Koh Tao — Laem Thian",
    description:
      "Abandoned cape near a resort that closed in 2011. Isolated area with turquoise, green and brown sea glass.",
    lat: 10.082,
    lng: 99.852,
    rating: 3,
    tags: ["island", "rocky_beach", "remote"],
    accountIdx: 1,
  },
  {
    title: "Lamai Beach, Koh Samui",
    description:
      "Mentioned in shelling guides but not directly confirmed for sea glass. Worth exploring if you're in the area.",
    lat: 9.47,
    lng: 100.06,
    rating: 2,
    tags: ["island", "sandy_beach"],
    accountIdx: 1,
  },
  {
    title: "Klong Kong Beach, Koh Lanta",
    description:
      "Large, well-frosted sea glass pieces! White, green, aqua blue and brown. Check the area near 'half soi klong kong' for best finds.",
    lat: 7.591,
    lng: 99.039,
    rating: 4,
    tags: ["island", "sandy_beach"],
    accountIdx: 1,
  },
  {
    title: "Ko Bulon Leh",
    description:
      "Remote, undeveloped island in Satun province. Potential for sea glass not yet confirmed — an adventure waiting to happen.",
    lat: 6.87,
    lng: 99.52,
    rating: 2,
    tags: ["island", "remote", "sandy_beach"],
    accountIdx: 1,
  },

  // --- Andaman Scout (6 spots) ---
  {
    title: "Hat Phla, Ban Chang",
    description:
      "Near the Map Ta Phut industrial zone in Rayong. Low to moderate sea glass finds — brown, green and clear pieces.",
    lat: 12.615,
    lng: 101.0583,
    rating: 2,
    tags: ["sandy_beach", "urban"],
    accountIdx: 2,
  },
  {
    title: "Hat Phayun, Ban Chang",
    description:
      "Quiet beach adjacent to Hat Phla. Variable sea glass finds — a calm spot worth checking on the Eastern Seaboard.",
    lat: 12.625,
    lng: 101.065,
    rating: 2,
    tags: ["sandy_beach"],
    accountIdx: 2,
  },
  {
    title: "Hat Nam Rin, Ban Chang",
    description:
      "Rocky beach in the Ban Chang area with potentially favorable conditions for sea glass accumulation.",
    lat: 12.635,
    lng: 101.07,
    rating: 2,
    tags: ["rocky_beach"],
    accountIdx: 2,
  },
  {
    title: "Hat Son Krasib",
    description:
      "Pine-lined beach in Rayong. Variable sea glass finds — the rocky sections may hold more pieces.",
    lat: 12.6083,
    lng: 101.05,
    rating: 2,
    tags: ["sandy_beach"],
    accountIdx: 2,
  },
  {
    title: "Phuket (various beaches)",
    description:
      "Green glass from beer bottles and brown pieces collected during beach cleanups. No specific beach identified — try the quieter west coast spots.",
    lat: 7.8804,
    lng: 98.3923,
    rating: 3,
    tags: ["sandy_beach", "urban"],
    accountIdx: 2,
  },
  {
    title: "Nai Yang Beach, Phuket",
    description:
      "Part of Sirinat National Park. Mentioned in shelling guides — low sea glass potential but a beautiful area to explore.",
    lat: 8.095,
    lng: 98.295,
    rating: 2,
    tags: ["sandy_beach", "remote"],
    accountIdx: 2,
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Generate staggered created_at dates over the last 3 weeks */
function staggeredDates(count: number): string[] {
  const now = Date.now();
  const threeWeeksMs = 21 * 24 * 60 * 60 * 1000;
  const dates: string[] = [];
  for (let i = 0; i < count; i++) {
    // spread evenly over 3 weeks, oldest first
    const offset = threeWeeksMs * ((count - 1 - i) / (count - 1));
    // add small random jitter (±6h)
    const jitter = (Math.random() - 0.5) * 12 * 60 * 60 * 1000;
    dates.push(new Date(now - offset + jitter).toISOString());
  }
  return dates;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("🌊 Sea Glass Spot Seeder\n");

  // 1. Create users
  console.log("Creating accounts...");
  const userIds: string[] = [];

  for (const account of ACCOUNTS) {
    // Check if user already exists
    const { data: existingUsers } =
      await supabase.auth.admin.listUsers();
    const existing = existingUsers?.users.find(
      (u) => u.email === account.email
    );

    if (existing) {
      console.log(`  ✓ ${account.display_name} already exists`);
      userIds.push(existing.id);
      continue;
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email: account.email,
      password: account.password,
      email_confirm: true,
    });

    if (error) {
      console.error(`  ✗ Failed to create ${account.email}: ${error.message}`);
      process.exit(1);
    }

    console.log(`  + Created ${account.display_name}`);
    userIds.push(data.user.id);
  }

  // 2. Upsert profiles
  console.log("\nSetting up profiles...");
  for (let i = 0; i < ACCOUNTS.length; i++) {
    const account = ACCOUNTS[i];
    const { error } = await supabase.from("user_profiles").upsert(
      {
        id: userIds[i],
        display_name: account.display_name,
        bio: account.bio,
        avatar_url: avatarUrl(account.avatar_seed),
      },
      { onConflict: "id" }
    );
    if (error) {
      console.error(`  ✗ Profile for ${account.display_name}: ${error.message}`);
    } else {
      console.log(`  ✓ ${account.display_name}`);
    }
  }

  // 3. Check for existing spots to avoid duplicates
  const { data: existingSpots } = await supabase
    .from("spots")
    .select("title")
    .in(
      "user_id",
      userIds
    );

  const existingTitles = new Set(
    (existingSpots ?? []).map((s: { title: string }) => s.title)
  );

  // 4. Insert spots with staggered dates
  console.log("\nInserting spots...");
  const dates = staggeredDates(SPOTS.length);
  const insertedSpotIds: { id: string; accountIdx: number }[] = [];
  let skippedCount = 0;

  for (let i = 0; i < SPOTS.length; i++) {
    const spot = SPOTS[i];

    if (existingTitles.has(spot.title)) {
      console.log(`  → Skipping "${spot.title}" (already exists)`);
      // Fetch existing spot id for cross-likes
      const { data } = await supabase
        .from("spots")
        .select("id")
        .eq("title", spot.title)
        .eq("user_id", userIds[spot.accountIdx])
        .single();
      if (data) {
        insertedSpotIds.push({ id: data.id, accountIdx: spot.accountIdx });
      }
      skippedCount++;
      continue;
    }

    const { data, error } = await supabase
      .from("spots")
      .insert({
        user_id: userIds[spot.accountIdx],
        title: spot.title,
        description: spot.description,
        latitude: spot.lat,
        longitude: spot.lng,
        rating: spot.rating,
        tags: spot.tags,
        status: "published",
        created_at: dates[i],
        updated_at: dates[i],
      })
      .select("id")
      .single();

    if (error) {
      console.error(`  ✗ "${spot.title}": ${error.message}`);
    } else {
      console.log(`  + "${spot.title}" (${ACCOUNTS[spot.accountIdx].display_name})`);
      insertedSpotIds.push({ id: data.id, accountIdx: spot.accountIdx });
    }
  }

  // 5. Cross-likes: each account likes ~70% of OTHER accounts' spots
  console.log("\nAdding cross-likes...");
  let likeCount = 0;

  for (let acctIdx = 0; acctIdx < ACCOUNTS.length; acctIdx++) {
    const userId = userIds[acctIdx];
    const otherSpots = insertedSpotIds.filter(
      (s) => s.accountIdx !== acctIdx
    );

    // Like ~70% of other accounts' spots
    for (const spot of otherSpots) {
      if (Math.random() < 0.7) {
        const { error } = await supabase.from("likes").upsert(
          {
            spot_id: spot.id,
            user_id: userId,
          },
          { onConflict: "spot_id,user_id" }
        );
        if (!error) likeCount++;
      }
    }
  }

  console.log(`  ✓ ${likeCount} likes added`);

  // 6. Summary
  const newSpots = SPOTS.length - skippedCount;
  console.log("\n--- Summary ---");
  console.log(`Seeded ${ACCOUNTS.length} users, ${newSpots} new spots (${skippedCount} skipped), ${likeCount} likes`);
  console.log("Done! 🎉");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
