import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

/** Root `/` → default locale (needed when Hostinger serves static files without Node middleware). */
export default function RootPage() {
  redirect(`/${routing.defaultLocale}/`);
}
