import { COMPANY_WHATSAPP } from "@/lib/constants";

/** Opens WhatsApp chat (app or web) with optional prefilled text. */
export function buildWhatsAppUrl(text?: string) {
  const params = new URLSearchParams({ phone: COMPANY_WHATSAPP });
  if (text?.trim()) params.set("text", text);
  return `https://api.whatsapp.com/send?${params.toString()}`;
}

export function openWhatsApp(text?: string) {
  const url = buildWhatsAppUrl(text);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

export type BookingWhatsAppPayload = {
  name: string;
  email: string;
  phone: string;
  service: string;
  street: string;
  plz: string;
  town: string;
  addressExtra: string;
  date: string;
  time: string;
  notes: string;
};

export function formatBookingWhatsAppMessage(
  payload: BookingWhatsAppPayload,
  serviceLabel: string,
) {
  return [
    "Réservation : SM Nettoyage",
    "",
    `Nom: ${payload.name}`,
    `E-mail: ${payload.email}`,
    `Téléphone: ${payload.phone}`,
    `Service: ${serviceLabel}`,
    `Rue: ${payload.street}`,
    `NPA / Localité: ${payload.plz} ${payload.town}`,
    `Adresse complémentaire: ${payload.addressExtra || "-"}`,
    `Date souhaitée: ${payload.date}`,
    `Heure souhaitée: ${payload.time}`,
    `Notes: ${payload.notes}`,
  ].join("\n");
}
