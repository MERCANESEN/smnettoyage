import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SERVICE_SHOWCASE } from "@/lib/form-helpers";

export async function ServicesShowcase() {
  const t = await getTranslations("home");

  return (
    <section className="py-16 sm:py-20">
      <div className="section-shell grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {SERVICE_SHOWCASE.map((item) => (
            <figure
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-brand-line bg-brand-mist shadow-[0_10px_28px_rgba(11,79,138,0.08)]"
            >
              <Image
                src={item.src}
                alt={t(`showcase.labels.${item.id}`)}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 28vw"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-ink/85 via-brand-ink/45 to-transparent px-3 pb-3 pt-10">
                <span className="text-sm font-bold tracking-wide text-white sm:text-base">
                  {t(`showcase.labels.${item.id}`)}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div>
          <h2 className="font-display text-3xl font-semibold text-brand-deep sm:text-4xl">
            {t("showcase.title")}
          </h2>
          <p className="mt-4 text-lg font-semibold text-brand-sky sm:text-xl">
            {t("showcase.subtitle")}
          </p>
          <p className="mt-5 text-base leading-relaxed text-brand-muted sm:text-lg">
            {t("showcase.body")}
          </p>
          <Link href="/services" className="btn-primary mt-8 min-h-11">
            {t("showcase.cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
