"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { HOME_SLIDES } from "@/lib/form-helpers";

export function Hero() {
  const t = useTranslations("home");
  const [index, setIndex] = useState(0);
  const total = HOME_SLIDES.length;

  const go = useCallback(
    (next: number) => setIndex((next + total) % total),
    [total],
  );

  return (
    <section
      className="relative isolate h-[min(70vh,760px)] w-full overflow-hidden bg-gradient-to-br from-brand-deep via-brand-sky to-brand-ink sm:h-[min(78vh,820px)]"
      aria-label={t("sliderTitle")}
    >
      <div className="absolute inset-0 overflow-hidden">
        {HOME_SLIDES.map((src, i) => {
          const nearby = Math.abs(i - index) <= 1 || (index === 0 && i === total - 1) || (index === total - 1 && i === 0);
          if (!nearby && i !== index) return null;
          return (
            <div
              key={src}
              className={`absolute inset-0 ${
                i === index ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              aria-hidden={i !== index}
            >
              <Image
                src={src}
                alt=""
                fill
                priority={i === 0}
                className="h-full w-full object-contain object-center"
                sizes="100vw"
              />
            </div>
          );
        })}
      </div>

      <div className="section-shell relative z-10 flex h-full flex-col justify-end pb-20 pt-12 sm:justify-center sm:pb-16 sm:pt-16">
        <div className="max-w-2xl rounded-2xl bg-brand-ink/75 p-6 text-white shadow-[0_16px_40px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:p-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-white/85">
            SM Nettoyage
          </p>
          <h1 className="font-display text-4xl leading-tight font-semibold tracking-tight sm:text-5xl lg:text-[3.2rem]">
            {t("heroTagline")}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/90 sm:text-xl">
            {t("heroSecondary")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="btn-primary bg-white text-brand-deep hover:bg-brand-mist"
            >
              {t("ctaQuote")}
            </Link>
            <Link href="/services" className="btn-secondary">
              {t("servicesTitle")}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-3 z-20 sm:bottom-5">
        <div className="section-shell flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/90 text-brand-deep shadow-sm"
            aria-label={t("sliderPrev")}
            onClick={() => go(index - 1)}
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden>
              <path d="M12.5 4.5 7 10l5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <div className="flex flex-wrap gap-2" role="tablist">
            {HOME_SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`${i + 1} / ${total}`}
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-white" : "w-2.5 bg-white/45 hover:bg-white/75"
                }`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/90 text-brand-deep shadow-sm"
            aria-label={t("sliderNext")}
            onClick={() => go(index + 1)}
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden>
              <path d="M7.5 4.5 13 10l-5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
