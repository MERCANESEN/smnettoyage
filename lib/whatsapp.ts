import { COMPANY_WHATSAPP } from "@/lib/constants";

export function buildWhatsAppUrl(text: string) {
  const params = new URLSearchParams({ text });
  return `https://wa.me/${COMPANY_WHATSAPP}?${params.toString()}`;
}

export function openWhatsApp(text: string) {
  window.open(buildWhatsAppUrl(text), "_blank", "noopener,noreferrer");
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
