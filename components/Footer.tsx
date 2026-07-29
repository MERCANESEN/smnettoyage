import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/Logo";
import { SocialIcons } from "@/components/SocialIcons";
import {
  COMPANY_ADDRESS_FULL,
  COMPANY_EMAIL,
  COMPANY_PHONE,
  COMPANY_PHONE_TEL,
} from "@/lib/constants";

const LINKS = [
  { href: "/", key: "home" as const },
  { href: "/about", key: "about" as const },
  { href: "/services", key: "services" as const },
  { href: "/booking", key: "booking" as const },
  { href: "/contact", key: "contact" as const },
];

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-brand-line bg-white/70">
      <div className="section-shell grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo size="footer" />
          <p className="max-w-sm text-sm text-brand-muted">{t("footer.tagline")}</p>
          <SocialIcons />
        </div>

        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-brand-deep">
            {t("footer.quickLinks")}
          </h2>
          <ul className="space-y-2">
            {LINKS.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-sm text-brand-muted transition-colors hover:text-brand-deep"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 text-sm">
          <h2 className="mb-3 font-display text-lg font-semibold text-brand-deep">
            {t("contact.infoTitle")}
          </h2>
          <p>
            <span className="font-semibold text-brand-ink">
              {t("common.addressLabel")}:{" "}
            </span>
            <span className="text-brand-muted">{COMPANY_ADDRESS_FULL}</span>
          </p>
          <p>
            <span className="font-semibold text-brand-ink">
              {t("common.phoneLabel")}:{" "}
            </span>
            <a
              href={`tel:${COMPANY_PHONE_TEL}`}
              className="text-brand-sky hover:underline"
            >
              {COMPANY_PHONE}
            </a>
          </p>
          <p>
            <span className="font-semibold text-brand-ink">
              {t("common.emailLabel")}:{" "}
            </span>
            <a
              href={`mailto:${COMPANY_EMAIL}`}
              className="text-brand-sky hover:underline"
            >
              {COMPANY_EMAIL}
            </a>
          </p>
          <p>
            <span className="font-semibold text-brand-ink">
              {t("common.hoursLabel")}:{" "}
            </span>
            <span className="text-brand-muted">{t("common.hoursValue")}</span>
          </p>
        </div>
      </div>

      <div className="border-t border-brand-line/80">
        <div className="section-shell py-4 text-center text-xs text-brand-muted sm:text-left">
          {t("footer.rights", { year })}
        </div>
      </div>
    </footer>
  );
}
