import {
  COMPANY_ADDRESS,
  COMPANY_ADDRESS_FULL,
  COMPANY_DOMAIN,
  COMPANY_EMAIL,
  COMPANY_NAME,
  COMPANY_PHONE,
} from "@/lib/constants";

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "CleaningService",
    name: COMPANY_NAME,
    url: COMPANY_DOMAIN,
    email: COMPANY_EMAIL,
    telephone: COMPANY_PHONE,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_ADDRESS.street,
      postalCode: COMPANY_ADDRESS.postalCode,
      addressLocality: COMPANY_ADDRESS.city,
      addressCountry: COMPANY_ADDRESS.countryCode,
    },
    areaServed: {
      "@type": "Country",
      name: COMPANY_ADDRESS.country,
    },
    description: COMPANY_ADDRESS_FULL,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
