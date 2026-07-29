import { NextResponse } from "next/server";
import { SERVICE_IDS, type ServiceId } from "@/lib/constants";
import {
  getBookingTimeSlots,
  isValidSwissPlz,
} from "@/lib/form-helpers";
import { isValidEmail, sendBusinessEmail } from "@/lib/mail";
import { clientIp, rateLimit } from "@/lib/rate-limit";

type BookingBody = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  street?: string;
  plz?: string;
  town?: string;
  addressExtra?: string;
  address?: string;
  date?: string;
  time?: string;
  notes?: string;
  website?: string;
};

export async function POST(request: Request) {
  try {
    const ip = clientIp(request);
    const limited = rateLimit(`booking:${ip}`);
    if (!limited.ok) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: limited.retryAfterSec
            ? { "Retry-After": String(limited.retryAfterSec) }
            : undefined,
        },
      );
    }

    const body = (await request.json()) as BookingBody;

    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const service = String(body.service || "").trim();
    const street = String(body.street || "").trim();
    const plz = String(body.plz || "").trim();
    const town = String(body.town || "").trim();
    const addressExtra = String(body.addressExtra || "").trim();
    const date = String(body.date || "").trim();
    const time = String(body.time || "").trim();
    const notes = String(body.notes || "").trim();
    const allowedTimes = getBookingTimeSlots();

    const errors: Record<string, string> = {};
    if (!name) errors.name = "Name is required";
    if (!isValidEmail(email)) errors.email = "Valid email is required";
    if (!phone) errors.phone = "Phone is required";
    if (!service || !SERVICE_IDS.includes(service as ServiceId)) {
      errors.service = "Valid service is required";
    }
    if (!street) errors.street = "Street is required";
    if (!isValidSwissPlz(plz)) errors.plz = "Valid 4-digit PLZ is required";
    if (!town) errors.town = "Town is required";
    if (!date) errors.date = "Date is required";
    if (!time || !allowedTimes.includes(time)) {
      errors.time = "Time must be between 07:00 and 17:00";
    }

    if (Object.keys(errors).length) {
      return NextResponse.json({ error: "Validation failed", errors }, { status: 400 });
    }

    const text = [
      "New booking request — SM Nettoyage",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Service: ${service}`,
      `Street: ${street}`,
      `PLZ / Town: ${plz} ${town}`,
      `Additional address: ${addressExtra || "-"}`,
      `Preferred date: ${date}`,
      `Preferred time: ${time}`,
      `Notes: ${notes || "-"}`,
    ].join("\n");

    await sendBusinessEmail({
      subject: `Booking — ${name} (${service})`,
      text,
      replyTo: email,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Booking form error:", error);
    return NextResponse.json(
      { error: "Could not send booking request. Please try again later." },
      { status: 500 },
    );
  }
}
