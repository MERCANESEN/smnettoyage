import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "de", "it", "en"],
  defaultLocale: "fr",
  localePrefix: "always",
  // French first load; client banner offers switch if browser language differs
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
