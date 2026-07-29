import { NextResponse } from "next/server";

export type GoogleReview = {
  authorName: string;
  rating: number;
  text: string;
  relativeTime: string;
  profilePhotoUrl?: string;
};

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json(
      {
        configured: false,
        reviews: [],
        error:
          "Google Places is not configured. Set GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID.",
      },
      { status: 503 },
    );
  }

  try {
    // Places API (New)
    const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`;
    const res = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "id,displayName,rating,userRatingCount,googleMapsUri,reviews",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Google Places error:", res.status, detail);
      return NextResponse.json(
        { configured: true, reviews: [], error: "Could not load Google reviews." },
        { status: 502 },
      );
    }

    const data = (await res.json()) as {
      displayName?: { text?: string };
      rating?: number;
      userRatingCount?: number;
      googleMapsUri?: string;
      reviews?: Array<{
        authorAttribution?: { displayName?: string; photoUri?: string };
        rating?: number;
        text?: { text?: string };
        relativePublishTimeDescription?: string;
      }>;
    };

    const reviews: GoogleReview[] = (data.reviews || [])
      .filter((r) => r.text?.text && r.rating)
      .map((r) => ({
        authorName: r.authorAttribution?.displayName || "Google user",
        rating: r.rating || 0,
        text: r.text?.text || "",
        relativeTime: r.relativePublishTimeDescription || "",
        profilePhotoUrl: r.authorAttribution?.photoUri,
      }));

    return NextResponse.json({
      configured: true,
      name: data.displayName?.text || "SM Nettoyage",
      rating: data.rating ?? null,
      total: data.userRatingCount ?? reviews.length,
      mapsUri: data.googleMapsUri || null,
      reviews,
    });
  } catch (error) {
    console.error("Google reviews fetch failed:", error);
    return NextResponse.json(
      { configured: true, reviews: [], error: "Could not load Google reviews." },
      { status: 500 },
    );
  }
}
