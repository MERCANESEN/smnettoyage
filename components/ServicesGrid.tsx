import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SERVICE_IDS, SERVICE_IMAGES } from "@/lib/constants";
import { ServiceIcon } from "@/components/ServiceIcons";

type ServicesGridProps = {
  showBookButtons?: boolean;
  detailed?: boolean;
};

export function ServicesGrid({
  showBookButtons = false,
  detailed = false,
}: ServicesGridProps) {
  const t = useTranslations();

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {SERVICE_IDS.map((id) => (
        <article
          key={id}
          id={id}
          className="group overflow-hidden rounded-2xl border border-brand-line bg-white/80 shadow-[0_10px_30px_rgba(11,79,138,0.06)] transition-transform duration-300 hover:-translate-y-1"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-brand-mist">
            <Image
              src={SERVICE_IMAGES[id]}
              alt={t(`services.${id}.title`)}
              fill
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          <div className="p-6">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-mist text-brand-deep transition-colors group-hover:bg-brand-deep group-hover:text-white">
              <ServiceIcon id={id} />
            </div>
            <h3 className="font-display text-xl font-semibold text-brand-deep">
              {t(`services.${id}.title`)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">
              {detailed ? t(`services.${id}.long`) : t(`services.${id}.short`)}
            </p>
            {showBookButtons ? (
              <Link
                href={`/booking?service=${id}`}
                className="btn-primary mt-5 w-full sm:w-auto"
              >
                {t("servicesPage.bookCta")}
              </Link>
            ) : (
              <Link
                href={`/services#${id}`}
                className="mt-4 inline-flex text-sm font-semibold text-brand-sky hover:text-brand-deep"
              >
                {t("common.learnMore")} →
              </Link>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
