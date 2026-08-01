import { NextResponse } from "next/server";
import { isMailConfigured, isValidEmail, sendBusinessEmail } from "@/lib/mail";
import { clientIp, rateLimit } from "@/lib/rate-limit";

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  website?: string; // honeypot
};

export async function POST(request: Request) {
  try {
    const ip = clientIp(request);
    const limited = rateLimit(`contact:${ip}`);
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

    const body = (await request.json()) as ContactBody;

    // Honeypot: bots fill this; humans never see it
    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const message = String(body.message || "").trim();

    const errors: Record<string, string> = {};
    if (!name) errors.name = "Name is required";
    if (!isValidEmail(email)) errors.email = "Valid email is required";
    if (!message) errors.message = "Message is required";

    if (Object.keys(errors).length) {
      return NextResponse.json({ error: "Validation failed", errors }, { status: 400 });
    }

    if (!isMailConfigured()) {
      return NextResponse.json(
        { error: "mail_unconfigured" },
        { status: 503 },
      );
    }

    const text = [
      "New contact form submission : SM Nettoyage",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "-"}`,
      "",
      "Message:",
      message,
    ].join("\n");

    await sendBusinessEmail({
      subject: `Contact : ${name}`,
      text,
      replyTo: email,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Could not send message. Please try again later." },
      { status: 500 },
    );
  }
}
