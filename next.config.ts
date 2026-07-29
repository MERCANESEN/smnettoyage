import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  // Keep Turbopack rooted on this app (parent folder also has a lockfile)
  turbopack: {
    root: process.cwd(),
  },
  ...(isStaticExport
    ? {
        // For Hostinger File Manager / public_html (same method as your current live site)
        output: "export" as const,
        images: { unoptimized: true },
        trailingSlash: true,
      }
    : {
        // For Hostinger Node.js Web App (real SMTP forms)
      }),
};

export default withNextIntl(nextConfig);
