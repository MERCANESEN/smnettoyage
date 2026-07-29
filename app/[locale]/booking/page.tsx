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
        <div className="section-shell max-w-3xl">
          <Suspense fallback={<div className="rounded-2xl border border-brand-line bg-white p-8" />}>
            <BookingForm />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
