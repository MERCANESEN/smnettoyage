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
    <section className="relative isolate w-full" aria-label={t("sliderTitle")}>
      {/* Photo stage — matches ~3:2 slide ratio so cover barely crops */}
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-brand-ink sm:aspect-[16/10] lg:aspect-auto lg:h-[min(72vh,760px)]">
        {HOME_SLIDES.map((src, i) => {
          const nearby =
            Math.abs(i - index) <= 1 ||
            (index === 0 && i === total - 1) ||
            (index === total - 1 && i === 0);
          if (!nearby && i !== index) return null;

          return (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                i === index ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              aria-hidden={i !== index}
            >
              <Image
                src={src}
                alt=""
                fill
                priority={i === 0}
                quality={90}
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>
          );
        })}

        {/* Desktop readability wash — keeps photo full-bleed */}
        <div
          className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-brand-ink/80 via-brand-ink/35 to-transparent sm:block"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-brand-ink/50 to-transparent"
          aria-hidden
        />

        {/* Desktop copy over photo */}
        <div className="section-shell relative z-10 hidden h-full items-center sm:flex">
          <div className="max-w-xl text-white animate-fade-up">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-white/85">
              SM Nettoyage
            </p>
            <h1 className="font-display text-4xl leading-tight font-semibold tracking-tight md:text-5xl lg:text-[3.2rem]">
              {t("heroTagline")}
            </h1>
            <p className="mt-5 max-w-lg text-lg text-white/90 md:text-xl">
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

        {/* Controls */}
        <div className="absolute inset-x-0 bottom-3 z-20 sm:bottom-5">
          <div className="section-shell flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/95 text-brand-deep shadow-sm backdrop-blur-sm"
              aria-label={t("sliderPrev")}
              onClick={() => go(index - 1)}
            >
              <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden>
                <path
                  d="M12.5 4.5 7 10l5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
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
                    i === index ? "w-8 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
                  }`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
            <button
              type="button"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/95 text-brand-deep shadow-sm backdrop-blur-sm"
              aria-label={t("sliderNext")}
              onClick={() => go(index + 1)}
            >
              <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden>
                <path
                  d="M7.5 4.5 13 10l-5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile copy under photo — photo stays fully readable */}
      <div className="border-b border-brand-line/80 bg-gradient-to-b from-brand-mist/80 to-transparent sm:hidden">
        <div className="section-shell py-8 animate-fade-up">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-sky">
            SM Nettoyage
          </p>
          <h1 className="font-display text-3xl leading-tight font-semibold tracking-tight text-brand-deep">
            {t("heroTagline")}
          </h1>
          <p className="mt-3 text-base text-brand-muted">{t("heroSecondary")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              {t("ctaQuote")}
            </Link>
            <Link
              href="/services"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-brand-line bg-white px-5 py-3 font-semibold text-brand-deep shadow-sm transition hover:-translate-y-0.5 hover:border-brand-sky"
            >
              {t("servicesTitle")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
