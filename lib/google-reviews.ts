export type GoogleReview = {
  authorName: string;
  rating: number;
  text: string;
  relativeTime: string;
  profilePhotoUrl?: string;
};

export type GoogleReviewsPayload = {
  configured: boolean;
  name?: string;
  rating?: number | null;
  total?: number;
  mapsUri?: string | null;
  reviews: GoogleReview[];
  error?: string;
};

const DEFAULT_MAPS_URI =
  "https://www.google.com/maps/search/?api=1&query=SM+Nettoyage+La+Tour-de-Tr%C3%AAme";

export function defaultMapsUri() {
  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL || DEFAULT_MAPS_URI;
}

export async function fetchGoogleReviews(): Promise<GoogleReviewsPayload> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return {
      configured: false,
      reviews: [],
      mapsUri: defaultMapsUri(),
      error: "Google Places is not configured.",
    };
  }

  try {
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
      return {
        configured: true,
        reviews: [],
        mapsUri: defaultMapsUri(),
        error: "Could not load Google reviews.",
      };
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

    return {
      configured: true,
      name: data.displayName?.text || "SM Nettoyage",
      rating: data.rating ?? null,
      total: data.userRatingCount ?? reviews.length,
      mapsUri: data.googleMapsUri || defaultMapsUri(),
      reviews,
    };
  } catch (error) {
    console.error("Google reviews fetch failed:", error);
    return {
      configured: true,
      reviews: [],
      mapsUri: defaultMapsUri(),
      error: "Could not load Google reviews.",
    };
  }
}
