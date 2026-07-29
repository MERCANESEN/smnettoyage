import { SOCIAL_LINKS } from "@/lib/constants";

type SocialIconsProps = {
  className?: string;
  variant?: "default" | "light";
};

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9A4.5 4.5 0 0 1 16.5 21h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm0 1.75A2.75 2.75 0 0 0 4.75 7.5v9a2.75 2.75 0 0 0 2.75 2.75h9a2.75 2.75 0 0 0 2.75-2.75v-9a2.75 2.75 0 0 0-2.75-2.75h-9Zm9.25 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM12 8.25A3.75 3.75 0 1 1 8.25 12 3.75 3.75 0 0 1 12 8.25Zm0 1.75A2 2 0 1 0 14 12a2 2 0 0 0-2-2Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1Z" />
    </svg>
  );
}

export function SocialIcons({
  className = "",
  variant = "default",
}: SocialIconsProps) {
  const tone =
    variant === "light"
      ? "text-white/85 hover:bg-white/15 hover:text-white"
      : "text-brand-deep hover:bg-brand-mist hover:text-brand-sky";

  const links = [
    { href: SOCIAL_LINKS.instagram, label: "Instagram", icon: <InstagramIcon /> },
    { href: SOCIAL_LINKS.facebook, label: "Facebook", icon: <FacebookIcon /> },
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          aria-label={link.label}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors ${tone}`}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
