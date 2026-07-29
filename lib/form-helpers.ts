export const BUSINESS_HOURS = {
  start: 7 as number,
  end: 17 as number,
};

/** 30-minute slots from 07:00 through 17:00 (24h). */
export function getBookingTimeSlots(): string[] {
  const slots: string[] = [];
  for (let hour = BUSINESS_HOURS.start; hour <= BUSINESS_HOURS.end; hour++) {
    for (const minute of [0, 30]) {
      if (hour === BUSINESS_HOURS.end && minute > 0) continue;
      slots.push(
        `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
      );
    }
  }
  return slots;
}

export const PHONE_COUNTRY_CODES = [
  { code: "+41", label: "CH +41", iso: "CH" },
  { code: "+33", label: "FR +33", iso: "FR" },
  { code: "+49", label: "DE +49", iso: "DE" },
  { code: "+39", label: "IT +39", iso: "IT" },
  { code: "+43", label: "AT +43", iso: "AT" },
  { code: "+32", label: "BE +32", iso: "BE" },
  { code: "+44", label: "UK +44", iso: "GB" },
  { code: "+1", label: "US/CA +1", iso: "US" },
] as const;

export const DEFAULT_PHONE_COUNTRY = "+41";

export const HOME_SLIDES = [
  "/slider/hero-1.png",
  "/slider/hero-2.png",
  "/slider/hero-3.png",
  "/slider/hero-4.png",
  "/slider/hero-5.png",
  "/slider/hero-6.png",
  "/slider/hero-7.png",
] as const;

export const SERVICE_SHOWCASE = [
  { id: "homes", src: "/services/homes.png" },
  { id: "offices", src: "/services/offices.png" },
  { id: "windows", src: "/services/windows.png" },
  { id: "construction", src: "/services/construction.png" },
] as const;

export function formatPhoneE164(countryCode: string, national: string): string {
  const digits = national.replace(/\D/g, "");
  // Swiss national numbers often start with 0 — drop leading 0 when dialing +41
  const normalized =
    countryCode === "+41" && digits.startsWith("0")
      ? digits.slice(1)
      : digits;
  return `${countryCode} ${normalized}`.trim();
}

export function isValidNationalPhone(national: string): boolean {
  const digits = national.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export function isValidSwissPlz(plz: string): boolean {
  return /^\d{4}$/.test(plz.trim());
}
