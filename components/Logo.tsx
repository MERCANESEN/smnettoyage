import Image from "next/image";
import { Link } from "@/i18n/navigation";

type LogoProps = {
  className?: string;
  size?: "header" | "footer" | "hero";
};

const SIZES = {
  header: {
    width: 168,
    height: 168,
    className: "h-16 w-auto sm:h-[4.75rem]",
  },
  footer: {
    width: 200,
    height: 200,
    className: "h-24 w-auto sm:h-28",
  },
  hero: {
    width: 280,
    height: 280,
    className: "h-36 w-auto sm:h-44",
  },
} as const;

export function Logo({ className = "", size = "header" }: LogoProps) {
  const dimensions = SIZES[size];

  return (
    <Link
      href="/"
      className={`group inline-flex shrink-0 items-center transition-transform duration-200 hover:-translate-y-0.5 ${className}`}
      aria-label="SM Nettoyage"
    >
      <Image
        src="/logo-sm-nettoyage-clear.png"
        alt="SM Nettoyage — Propreté, Fiabilité, Qualité"
        width={dimensions.width}
        height={dimensions.height}
        priority={size === "header"}
        unoptimized
        className={`${dimensions.className} object-contain`}
      />
    </Link>
  );
}
