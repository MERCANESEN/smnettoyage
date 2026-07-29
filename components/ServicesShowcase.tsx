import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SERVICE_SHOWCASE } from "@/lib/form-helpers";

/** Native file sizes — render full photo, no crop / no letterbox */
const SHOWCASE_META = {
  homes: { serviceKey: "home", width: 1024, height: 681 },
  offices: { serviceKey: "office", width: 1024, height: 682 },
  windows: { serviceKey: "windows", width: 682, height: 1024 },
  construction: { serviceKey: "construction", width: 682, height: 1024 },
} as const;

export async function ServicesShowcase() {
  const t = await getTranslations("home");
  const ts = await getTranslations("services");

  return (
    <section className="py-16 sm:py-20">
      <div className="section-shell grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="grid grid-cols-2 items-start gap-3 sm:gap-4">
          {SERVICE_SHOWCASE.map((item) => {
            const meta = SHOWCASE_META[item.id];
            return (
              <figure
                key={item.id}
                className="overflow-hidden rounded-2xl border border-brand-line bg-brand-mist shadow-[0_10px_28px_rgba(11,79,138,0.08)]"
              >
                <Image
                  src={item.src}
                  alt={ts(`${meta.serviceKey}.title`)}
                  width={meta.width}
                  height={meta.height}
                  quality={92}
                  className="h-auto w-full max-w-none"
                  sizes="(max-width: 1024px) 50vw, 28vw"
                />
              </figure>
            );
          })}
        </div>

        <div className="lg:sticky lg:top-28">
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
