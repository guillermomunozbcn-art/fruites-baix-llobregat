/**
 * Configuración global del sitio.
 * La URL pública y la indexación se controlan con variables de entorno (ver .env.example).
 */
const rawUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
  "http://localhost:3000";

export const SITE_URL = rawUrl.replace(/\/+$/, "");

/**
 * Solo se indexa el entorno Production de Vercel cuando se activa explícitamente
 * NEXT_PUBLIC_ALLOW_INDEXING=true (dominio definitivo conectado).
 * Previews, desarrollo y builds locales quedan siempre en noindex.
 */
export const IS_INDEXABLE =
  process.env.VERCEL_ENV === "production" && process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export const SEARCH_VERIFICATION = {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "",
};
