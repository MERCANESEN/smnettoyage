import { NextResponse } from "next/server";
import { fetchGoogleReviews } from "@/lib/google-reviews";

export async function GET() {
  const payload = await fetchGoogleReviews();

  if (!payload.configured) {
    return NextResponse.json(payload, { status: 503 });
  }

  if (payload.error && payload.reviews.length === 0) {
    return NextResponse.json(payload, { status: 502 });
  }

  return NextResponse.json(payload);
}
