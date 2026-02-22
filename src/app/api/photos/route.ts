import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

/** In-memory cache: zoneId → photo proxy URLs */
const photoCache = new Map<string, string[]>();

interface ZoneGeoJSON {
  type: "FeatureCollection";
  features: {
    properties: {
      id: string;
      placeQuery?: string;
      coordinates?: [number, number];
    };
    geometry: { coordinates: [number, number] };
  }[];
}

/** Load zones.geojson to find placeQuery and coordinates for a zone */
function getZoneData(zoneId: string) {
  const filePath = join(process.cwd(), "public", "data", "zones.geojson");
  const raw = readFileSync(filePath, "utf-8");
  const geojson: ZoneGeoJSON = JSON.parse(raw);
  const feature = geojson.features.find((f) => f.properties.id === zoneId);
  if (!feature) return null;
  return {
    placeQuery: feature.properties.placeQuery,
    coordinates: feature.geometry.coordinates,
  };
}

export async function GET(request: NextRequest) {
  const zoneId = request.nextUrl.searchParams.get("zoneId");

  if (!zoneId) {
    return NextResponse.json({ error: "Missing zoneId" }, { status: 400 });
  }

  if (!API_KEY) {
    return NextResponse.json(
      { error: "Google Places API key not configured" },
      { status: 500 }
    );
  }

  // Return cached results if available
  if (photoCache.has(zoneId)) {
    return NextResponse.json({ photos: photoCache.get(zoneId) });
  }

  // Get zone data
  const zoneData = getZoneData(zoneId);
  if (!zoneData || !zoneData.placeQuery) {
    return NextResponse.json({ photos: [] });
  }

  try {
    // Google Places Text Search (New API)
    const searchRes = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": API_KEY,
          "X-Goog-FieldMask": "places.photos",
        },
        body: JSON.stringify({
          textQuery: zoneData.placeQuery,
          locationBias: {
            circle: {
              center: {
                latitude: zoneData.coordinates[1],
                longitude: zoneData.coordinates[0],
              },
              radius: 10000,
            },
          },
          maxResultCount: 1,
        }),
      }
    );

    if (!searchRes.ok) {
      console.error(
        "Places search failed:",
        searchRes.status,
        await searchRes.text()
      );
      return NextResponse.json({ photos: [] });
    }

    const searchData = await searchRes.json();
    const place = searchData.places?.[0];

    if (!place?.photos?.length) {
      photoCache.set(zoneId, []);
      return NextResponse.json({ photos: [] });
    }

    // Take up to 5 photos
    const photoRefs: string[] = place.photos
      .slice(0, 5)
      .map((p: { name: string }) => p.name);

    // Build proxy URLs
    const proxyUrls = photoRefs.map(
      (ref) =>
        `/api/photos/image?ref=${encodeURIComponent(ref)}&maxWidth=800`
    );

    photoCache.set(zoneId, proxyUrls);

    return NextResponse.json({ photos: proxyUrls });
  } catch (err) {
    console.error("Places API error:", err);
    return NextResponse.json({ photos: [] });
  }
}
