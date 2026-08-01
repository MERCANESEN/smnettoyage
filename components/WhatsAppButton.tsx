import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.84c0 1.99.59 3.84 1.61 5.4L2 22l4.92-1.61a9.86 9.86 0 0 0 5.12 1.41h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2Zm5.75 13.99c-.24.67-1.39 1.23-1.93 1.31-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.78-4.17-4.93-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.74-2.12 1-2.41.26-.29.57-.36.76-.36h.55c.17 0 .4-.06.63.48.24.55.81 1.98.88 2.12.07.14.12.31.02.5-.1.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.56.17.28.74 1.22 1.59 1.98 1.09.97 2.01 1.28 2.29 1.42.28.14.45.12.61-.07.17-.19.7-.81.89-1.09.19-.28.38-.23.64-.14.26.1 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.69-.17 1.36Z" />
    </svg>
  );
}

type WhatsAppButtonProps = {
  label: string;
  prefill?: string;
  className?: string;
};

export function WhatsAppButton({
  label,
  prefill,
  className = "",
}: WhatsAppButtonProps) {
  return (
    <a
      href={buildWhatsAppUrl(prefill)}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-whatsapp ${className}`.trim()}
    >
      <WhatsAppIcon />
      <span>{label}</span>
    </a>
  );
}
