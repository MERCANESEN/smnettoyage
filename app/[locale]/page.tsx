import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Hero } from "@/components/Hero";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import { ProcessSteps } from "@/components/ProcessSteps";
import { CoverageBand } from "@/components/CoverageBand";
import { GoogleReviews } from "@/components/GoogleReviews";
import { SocialIcons, hasSocialLinks } from "@/components/SocialIcons";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { fetchGoogleReviews } from "@/lib/google-reviews";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tc = await getTranslations("contact");
  const reviews = await fetchGoogleReviews();

  return (
    <>
      <Hero />

      <ServicesShowcase />

      <ProcessSteps />

      <CoverageBand />

      <section className="border-t border-brand-line/80 py-16 sm:py-20">
        <div className="section-shell grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="animate-fade-up">
            <h2 className="font-display text-3xl font-semibold text-brand-deep sm:text-4xl">
              {t("introTitle")}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-muted sm:text-lg">
              {t("introBody")}
            </p>
          </div>
          <div className="animate-fade-up-delay lg:justify-self-end">
            <Link href="/contact" className="btn-primary">
              {t("ctaQuote")}
            </Link>
          </div>
        </div>
      </section>

      <div className="border-y border-brand-line/80 bg-white/50">
        <GoogleReviews data={reviews} />
      </div>

      <section className="py-14 sm:py-16">
        <div className="section-shell flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <h2 className="font-display text-2xl font-semibold text-brand-deep">
            {t("socialTitle")}
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            {hasSocialLinks() ? <SocialIcons /> : null}
            <WhatsAppButton
              label={tc("whatsappCta")}
              prefill={tc("whatsappPrefill")}
              className="min-h-11 w-full sm:w-auto"
            />
          </div>
        </div>
      </section>
    </>
  );
}
