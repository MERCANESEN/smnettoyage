import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SERVICE_SHOWCASE } from "@/lib/form-helpers";

const SHOWCASE_META = {
  homes: { serviceKey: "home" },
  offices: { serviceKey: "office" },
  windows: { serviceKey: "windows" },
  construction: { serviceKey: "construction" },
} as const;

export async function ServicesShowcase() {
  const t = await getTranslations("home");
  const ts = await getTranslations("services");

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="section-shell grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
          {SERVICE_SHOWCASE.map((item) => {
            const meta = SHOWCASE_META[item.id];
            return (
              <figure
                key={item.id}
                className="relative aspect-[4/3] overflow-hidden rounded-xl border border-brand-line bg-brand-mist shadow-[0_10px_28px_rgba(11,79,138,0.08)] sm:rounded-2xl"
              >
                <Image
                  src={item.src}
                  alt={ts(`${meta.serviceKey}.title`)}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 50vw, 28vw"
                />
              </figure>
            );
          })}
        </div>

        <div className="lg:sticky lg:top-28">
          <h2 className="font-display text-2xl font-semibold text-brand-deep sm:text-3xl lg:text-4xl">
            {t("showcase.title")}
          </h2>
          <p className="mt-3 text-base font-semibold text-brand-sky sm:mt-4 sm:text-lg lg:text-xl">
            {t("showcase.subtitle")}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-brand-muted sm:mt-5 sm:text-base lg:text-lg">
            {t("showcase.body")}
          </p>
          <Link href="/services" className="btn-primary mt-6 min-h-11 sm:mt-8">
            {t("showcase.cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
