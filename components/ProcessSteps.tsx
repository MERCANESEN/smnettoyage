import { getTranslations } from "next-intl/server";

const STEP_IDS = ["1", "2", "3"] as const;

export async function ProcessSteps() {
  const t = await getTranslations("home.process");

  return (
    <section className="border-t border-brand-line/80 pt-8 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20">
      <div className="section-shell">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-semibold text-brand-deep sm:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-brand-muted sm:mt-3 sm:text-base lg:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <ol className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-3 sm:gap-6 lg:gap-10">
          {STEP_IDS.map((id, index) => (
            <li
              key={id}
              className="border-t border-brand-line pt-5 sm:pt-6"
            >
              <span className="font-display text-3xl font-semibold text-brand-sky">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-brand-deep">
                {t(`steps.${id}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted sm:text-base">
                {t(`steps.${id}.body`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
