import { getTranslations } from "next-intl/server";
import type { GoogleReviewsPayload } from "@/lib/google-reviews";
import { defaultMapsUri } from "@/lib/google-reviews";

type GoogleReviewsProps = {
  data: GoogleReviewsPayload;
};

export async function GoogleReviews({ data }: GoogleReviewsProps) {
  const t = await getTranslations("home");
  const reviews = data.reviews || [];
  const mapsUri = data.mapsUri || defaultMapsUri();

  return (
    <section className="py-16 sm:py-20">
      <div className="section-shell">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold text-brand-deep sm:text-4xl">
              {t("reviewsTitle")}
            </h2>
            <p className="mt-3 text-brand-muted">{t("reviewsSubtitle")}</p>
            {data.rating ? (
              <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-brand-ink">
                <span className="text-[#FBBC05]" aria-hidden>
                  ★
                </span>
                {data.rating.toFixed(1)}
                {data.total ? (
                  <span className="font-normal text-brand-muted">
                    · {t("reviewsCount", { count: data.total })}
                  </span>
                ) : null}
                <span className="font-normal text-brand-muted">· Google</span>
              </p>
            ) : null}
          </div>
          <a
            href={mapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary min-h-11 w-fit"
          >
            {t("reviewsOnGoogle")}
          </a>
        </div>

        {reviews.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-3">
            {reviews.slice(0, 6).map((item) => (
              <blockquote
                key={`${item.authorName}-${item.relativeTime}-${item.text.slice(0, 24)}`}
                className="rounded-2xl border border-brand-line bg-white p-6 shadow-[0_8px_24px_rgba(11,79,138,0.05)]"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#4285F4] text-xs font-bold text-white">
                    G
                  </span>
                  <div
                    className="flex gap-0.5 text-[#FBBC05]"
                    aria-label={`${item.rating} stars`}
                  >
                    {Array.from({ length: Math.round(item.rating) }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-brand-ink">
                  &ldquo;{item.text}&rdquo;
                </p>
                <footer className="mt-4 text-sm">
                  <span className="font-semibold text-brand-deep">{item.authorName}</span>
                  {item.relativeTime ? (
                    <span className="mt-1 block text-xs text-brand-muted">
                      {item.relativeTime}
                    </span>
                  ) : null}
                </footer>
              </blockquote>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-brand-line bg-white/80 p-6 sm:p-8">
            <p className="text-base leading-relaxed text-brand-ink">
              {t("reviewsPride")}
            </p>
            <a
              href={mapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 min-h-11"
            >
              {t("reviewsOnGoogle")}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
