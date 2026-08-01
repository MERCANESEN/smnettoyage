import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { SocialIcons } from "@/components/SocialIcons";
import { WhatsAppButton, WhatsAppIcon } from "@/components/WhatsAppButton";
import {
  COMPANY_ADDRESS_FULL,
  COMPANY_EMAIL,
  COMPANY_PHONE,
  COMPANY_PHONE_TEL,
  COMPANY_WHATSAPP_URL,
} from "@/lib/constants";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const tc = await getTranslations("common");

  return (
    <div className="pb-20">
      <section className="border-b border-brand-line/70 bg-white/50 py-14 sm:py-16">
        <div className="section-shell max-w-3xl">
          <h1 className="font-display text-4xl font-semibold text-brand-deep sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-brand-muted">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <aside className="min-w-0 space-y-6 rounded-2xl border border-brand-line bg-white/80 p-5 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-brand-deep">
              {t("infoTitle")}
            </h2>
            <div className="space-y-4 text-sm">
              <p>
                <span className="block font-semibold text-brand-ink">
                  {tc("addressLabel")}
                </span>
                <span className="text-brand-muted">{COMPANY_ADDRESS_FULL}</span>
              </p>
              <p>
                <span className="block font-semibold text-brand-ink">
                  {tc("phoneLabel")}
                </span>
                <a
                  href={`tel:${COMPANY_PHONE_TEL}`}
                  className="text-brand-sky hover:underline"
                >
                  {COMPANY_PHONE}
                </a>
              </p>
              <p>
                <span className="block font-semibold text-brand-ink">
                  {t("whatsappLabel")}
                </span>
                <a
                  href={COMPANY_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#25d366] hover:underline"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {COMPANY_PHONE}
                </a>
              </p>
              <p>
                <span className="block font-semibold text-brand-ink">
                  {tc("emailLabel")}
                </span>
                <a
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="text-brand-sky hover:underline"
                >
                  {COMPANY_EMAIL}
                </a>
              </p>
              <p>
                <span className="block font-semibold text-brand-ink">
                  {tc("hoursLabel")}
                </span>
                <span className="text-brand-muted">{tc("hoursValue")}</span>
              </p>
            </div>

            <WhatsAppButton
              label={t("whatsappCta")}
              prefill={t("whatsappPrefill")}
              className="min-h-11 w-full sm:w-auto"
            />

            <div>
              <p className="mb-2 text-sm font-semibold text-brand-ink">
                {tc("followUs")}
              </p>
              <SocialIcons />
            </div>
          </aside>

          <ContactForm />
        </div>
      </section>
    </div>
  );
}
