import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

const GALLERY = [
  { src: "/slider/hero-2.png", position: "object-[28%_40%]" },
  { src: "/slider/hero-6.png", position: "object-[center_bottom]" },
  { src: "/slider/hero-7.png", position: "object-[18%_45%]" },
  { src: "/services/windows.png", position: "object-top" },
] as const;

const VALUE_IMAGES = [
  "/slider/hero-3.png",
  "/slider/hero-4.png",
  "/slider/hero-5.png",
] as const;

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const th = await getTranslations("home");

  const values = [
    { title: t("value1Title"), body: t("value1Body"), image: VALUE_IMAGES[0] },
    { title: t("value2Title"), body: t("value2Body"), image: VALUE_IMAGES[1] },
    { title: t("value3Title"), body: t("value3Body"), image: VALUE_IMAGES[2] },
  ];

  return (
    <div className="pb-20">
      <section className="border-b border-brand-line/70 bg-white/50 py-14 sm:py-16">
        <div className="section-shell max-w-3xl animate-fade-up">
          <h1 className="font-display text-4xl font-semibold text-brand-deep sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-brand-muted">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="section-shell max-w-3xl animate-fade-up">
          <h2 className="font-display text-3xl font-semibold text-brand-deep">
            {t("storyTitle")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-muted sm:text-lg">
            {t("storyBody")}
          </p>
        </div>
      </section>

      <section className="border-y border-brand-line/70 bg-brand-mist/30 py-10 sm:py-12">
        <div className="section-shell">
          <div className="grid grid-cols-2 items-stretch gap-3 sm:gap-4 lg:grid-cols-4">
            {GALLERY.map((item) => (
              <figure
                key={item.src}
                className="relative aspect-square overflow-hidden rounded-2xl border border-brand-line bg-brand-mist shadow-[0_8px_24px_rgba(11,79,138,0.06)]"
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  className={`object-cover ${item.position}`}
                  sizes="(max-width: 1024px) 50vw, 22vw"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="section-shell">
          <h2 className="mb-8 font-display text-3xl font-semibold text-brand-deep animate-fade-up">
            {t("valuesTitle")}
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {values.map((value, index) => (
              <article
                key={value.title}
                className={`overflow-hidden rounded-2xl border border-brand-line bg-white/80 shadow-[0_8px_24px_rgba(11,79,138,0.05)] ${
                  index === 0
                    ? "animate-fade-up"
                    : index === 1
                      ? "animate-fade-up-delay"
                      : "animate-fade-up-delay-2"
                }`}
              >
                <div className="relative aspect-[16/10] bg-brand-mist">
                  <Image
                    src={value.image}
                    alt=""
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-brand-deep">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                    {value.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="rounded-3xl bg-brand-deep px-8 py-10 text-white sm:px-12">
          <h2 className="font-display text-3xl font-semibold">{t("ctaTitle")}</h2>
          <p className="mt-3 max-w-xl text-white/85">{t("ctaBody")}</p>
          <Link
            href="/contact"
            className="btn-primary mt-6 bg-white text-brand-deep hover:bg-brand-mist"
          >
            {th("ctaQuote")}
          </Link>
        </div>
      </section>
    </div>
  );
}
