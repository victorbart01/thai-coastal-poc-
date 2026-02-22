import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

export async function GET(request: NextRequest) {
  const ref = request.nextUrl.searchParams.get("ref");
  const maxWidth = request.nextUrl.searchParams.get("maxWidth") ?? "800";

  if (!ref) {
    return NextResponse.json({ error: "Missing ref" }, { status: 400 });
  }

  if (!API_KEY) {
    return NextResponse.json(
      { error: "Google Places API key not configured" },
      { status: 500 }
    );
  }

  try {
    // Google Places Photo Media (New API)
    // ref looks like: "places/PLACE_ID/photos/PHOTO_REF"
    const mediaUrl = `https://places.googleapis.com/v1/${ref}/media?maxWidthPx=${maxWidth}&key=${API_KEY}`;

    const res = await fetch(mediaUrl, { redirect: "follow" });

    if (!res.ok) {
      return new NextResponse("Photo not found", { status: 404 });
    }

    const contentType = res.headers.get("content-type") ?? "image/jpeg";
    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (err) {
    console.error("Photo proxy error:", err);
    return new NextResponse("Error fetching photo", { status: 500 });
  }
}
