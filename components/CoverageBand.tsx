import { getTranslations } from "next-intl/server";
import { COMPANY_ADDRESS } from "@/lib/constants";

export async function CoverageBand() {
  const t = await getTranslations("home.coverage");

  return (
    <section className="border-t border-brand-line/80 bg-brand-mist/40 py-12 sm:py-14">
      <div className="section-shell max-w-3xl animate-fade-up text-center sm:text-left">
        <h2 className="font-display text-2xl font-semibold text-brand-deep sm:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-brand-muted sm:text-lg">
          {t("body", {
            city: COMPANY_ADDRESS.city,
            street: COMPANY_ADDRESS.street,
          })}
        </p>
      </div>
    </section>
  );
}
