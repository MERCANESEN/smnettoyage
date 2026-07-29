"use client";

import { useCallback, useEffect, useState } from "react";
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

  useEffect(() => {
    const id = window.setInterval(() => go(index + 1), 6000);
    return () => window.clearInterval(id);
  }, [go, index]);

  return (
    <section
      className="relative isolate h-[min(78vh,820px)] w-full overflow-hidden"
      aria-label={t("sliderTitle")}
    >
      <div className="absolute inset-0 overflow-hidden">
        {HOME_SLIDES.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={i !== index}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              className="h-full w-full object-cover object-center"
              sizes="100vw"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/85 via-brand-ink/55 to-brand-deep/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/50 via-transparent to-brand-ink/20" />
      </div>

      <div className="section-shell relative z-10 flex h-full flex-col justify-end gap-8 py-12 sm:justify-center sm:gap-10 sm:py-16">
        <div className="max-w-2xl text-white">
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

        <div className="flex flex-wrap items-center gap-3">
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
