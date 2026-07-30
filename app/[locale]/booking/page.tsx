import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookingForm } from "@/components/BookingForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BookingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("booking");
  const tc = await getTranslations("common");

  return (
    <div className="pb-20">
      <section className="border-b border-brand-line/70 bg-white/50 py-14 sm:py-16">
        <div className="section-shell max-w-3xl animate-fade-up">
          <h1 className="font-display text-4xl font-semibold text-brand-deep sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-brand-muted">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="section-shell grid min-w-0 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-12">
          <div className="min-w-0 w-full max-w-3xl lg:max-w-none">
            <Suspense
              fallback={
                <div className="rounded-2xl border border-brand-line bg-white p-8" />
              }
            >
              <BookingForm />
            </Suspense>
          </div>

          <aside className="min-w-0 rounded-2xl border border-brand-line bg-brand-mist/50 p-5 sm:p-6 lg:sticky lg:top-28">
            <h2 className="font-display text-xl font-semibold text-brand-deep">
              {t("asideTitle")}
            </h2>
            <p className="mt-3 text-sm font-medium text-brand-sky">
              {t("asideHours", { hours: tc("hoursValue") })}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-brand-muted">
              {t("asideBody")}
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}
