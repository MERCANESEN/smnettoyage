import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SERVICE_SHOWCASE } from "@/lib/form-helpers";

const SHOWCASE_META = {
  homes: { serviceKey: "home", aspect: "aspect-[4/3]", position: "object-center" },
  offices: { serviceKey: "office", aspect: "aspect-[4/3]", position: "object-center" },
  windows: { serviceKey: "windows", aspect: "aspect-[3/4]", position: "object-top" },
  construction: {
    serviceKey: "construction",
    aspect: "aspect-[3/4]",
    position: "object-center",
  },
} as const;

export async function ServicesShowcase() {
  const t = await getTranslations("home");
  const ts = await getTranslations("services");

  return (
    <section className="py-16 sm:py-20">
      <div className="section-shell grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="grid grid-cols-2 items-start gap-3 sm:gap-4">
          {SERVICE_SHOWCASE.map((item, i) => {
            const meta = SHOWCASE_META[item.id];
            return (
              <figure
                key={item.id}
                className={`group relative overflow-hidden rounded-2xl border border-brand-line bg-brand-mist shadow-[0_10px_28px_rgba(11,79,138,0.08)] ${meta.aspect} ${
                  i % 2 === 1 ? "sm:mt-8" : ""
                }`}
              >
                <Image
                  src={item.src}
                  alt={ts(`${meta.serviceKey}.title`)}
                  fill
                  quality={88}
                  className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${meta.position}`}
                  sizes="(max-width: 1024px) 50vw, 28vw"
                />
              </figure>
            );
          })}
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
