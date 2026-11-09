import { defineRouting } from "next-intl/routing";

export const locales = ["es", "ca", "fr", "en", "pl"] as const;
export type Locale = (typeof locales)[number];

/**
 * Rutas localizadas. La clave es la ruta interna (carpeta en src/app/[locale]/),
 * el valor es la URL pública en cada idioma.
 */
export const routing = defineRouting({
  locales,
  defaultLocale: "es",
  localePrefix: "always",
  // Los hreflang se generan en los metadatos de cada página (con x-default coherente)
  alternateLinks: false,
  pathnames: {
    "/": "/",
    "/empresa": { es: "/empresa", ca: "/empresa", fr: "/entreprise", en: "/company", pl: "/o-firmie" },
    "/productos": { es: "/productos", ca: "/productes", fr: "/produits", en: "/products", pl: "/produkty" },
    "/profesionales": {
      es: "/profesionales",
      ca: "/professionals",
      fr: "/acheteurs-professionnels",
      en: "/wholesale-buyers",
      pl: "/dla-firm",
    },
    "/proveedores": {
      es: "/productores-proveedores",
      ca: "/productors-proveidors",
      fr: "/producteurs-fournisseurs",
      en: "/growers-suppliers",
      pl: "/producenci-dostawcy",
    },
    "/contacto": { es: "/contacto", ca: "/contacte", fr: "/contact", en: "/contact", pl: "/kontakt" },
    "/aviso-legal": { es: "/aviso-legal", ca: "/avis-legal", fr: "/mentions-legales", en: "/legal-notice", pl: "/nota-prawna" },
    "/privacidad": {
      es: "/politica-privacidad",
      ca: "/politica-privacitat",
      fr: "/politique-confidentialite",
      en: "/privacy-policy",
      pl: "/polityka-prywatnosci",
    },
    "/cookies": {
      es: "/politica-cookies",
      ca: "/politica-galetes",
      fr: "/politique-cookies",
      en: "/cookie-policy",
      pl: "/polityka-cookies",
    },
  },
});

export type AppPathname = keyof typeof routing.pathnames;

export const ogLocales: Record<Locale, string> = {
  es: "es_ES",
  ca: "ca_ES",
  fr: "fr_FR",
  en: "en_GB",
  pl: "pl_PL",
};

export const localeNames: Record<Locale, string> = {
  es: "Español",
  ca: "Català",
  fr: "Français",
  en: "English",
  pl: "Polski",
};
