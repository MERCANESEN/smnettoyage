export const COMPANY_NAME = "SM Nettoyage";
export const COMPANY_DOMAIN = "https://smnettoyage.ch";
export const COMPANY_EMAIL = "info@smnettoyage.ch";
export const COMPANY_PHONE = "+41 78 230 79 54";
export const COMPANY_PHONE_TEL = "+41782307954";
export const COMPANY_ADDRESS = {
  street: "Rue des Agges",
  postalCode: "1635",
  city: "La Tour-de-Trême",
  country: "Switzerland",
  countryCode: "CH",
} as const;

export const COMPANY_ADDRESS_FULL =
  "Rue des Agges, 1635 La Tour-de-Trême, Switzerland";

export const SOCIAL_LINKS = {
  instagram: "#",
  facebook: "#",
} as const;

export const SERVICE_IDS = [
  "home",
  "office",
  "windows",
  "construction",
  "moving",
] as const;

export type ServiceId = (typeof SERVICE_IDS)[number];
