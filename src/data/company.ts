/**
 * Datos corporativos centralizados.
 *
 * Cada dato lleva su estado de verificación. Fuente pública consultada (nov. 2026):
 * ficha AGEM — https://www.agem.mercabarna.com/comprar-frutas-y-verduras-en-mercabarna/mayorista-agem/fruites-del-baix-llobregats-l/
 *
 * IMPORTANTE: antes de publicar, confirmar con la empresa todos los campos con `verified: false`
 * (ver docs/CHECKLIST-PUBLICACION.md). Los campos `null` NO se muestran en la web.
 */
export const company = {
  legalName: "Fruites del Baix Llobregat, S.L.",
  brandName: "Fruites del Baix Llobregat",
  /** Año de inicio de actividad según la ficha AGEM ("fundada en 1995"). No usar como fecha legal de constitución hasta verificarlo. */
  foundedYear: 1995,
  address: {
    market: "Mercabarna",
    pavilion: "E",
    stalls: ["5007", "5037", "5038"],
    postalCode: "08040",
    locality: "Barcelona",
    region: "Barcelona",
    country: "ES",
  },
  phone: { display: "+34 933 350 096", href: "tel:+34933350096" },
  email: "info@fruitesbaixllobregat.com",
  /** Enlace funcional a Google Maps (búsqueda del pabellón E de Mercabarna). */
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Mercabarna%20Pabell%C3%B3n%20E%2C%2008040%20Barcelona",
  mapsEmbedUrl: "https://www.google.com/maps?q=Mercabarna%20Pabell%C3%B3n%20E%2C%2008040%20Barcelona&output=embed",

  /** Datos legales: pendientes. Si son null no se muestran (ver páginas legales). */
  legal: {
    taxId: null as string | null, // NIF / CIF
    registry: null as string | null, // Registro Mercantil: tomo, folio, hoja, inscripción
    registeredAddress: null as string | null, // Domicilio social (si difiere del comercial)
    privacyEmail: null as string | null, // Email para ejercicio de derechos RGPD (si difiere de `email`)
    /** Cambiar a true cuando un profesional haya revisado los textos legales. Mientras sea false, las páginas legales son noindex. */
    reviewed: false,
  },

  social: [] as { name: string; url: string }[],

  verification: {
    foundedYear: false,
    stalls: false,
    phone: false,
    email: false,
  },
} as const;

export function stallsLabel(): string {
  return company.address.stalls.join(", ");
}
