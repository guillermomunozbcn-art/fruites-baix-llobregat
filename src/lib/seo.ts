import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { IS_INDEXABLE, SEARCH_VERIFICATION, SITE_URL } from "@/config/site";
import { company } from "@/data/company";
import { ogImage } from "@/data/images";
import { getPathname } from "@/i18n/navigation";
import { type AppPathname, type Locale, locales, ogLocales, routing } from "@/i18n/routing";

/** Clave de metadatos (messages → meta.<key>) por ruta interna */
export const pageMetaKey = {
  "/": "home",
  "/empresa": "company",
  "/productos": "products",
  "/profesionales": "professionals",
  "/proveedores": "suppliers",
  "/contacto": "contact",
  "/aviso-legal": "legalNotice",
  "/privacidad": "privacy",
  "/cookies": "cookies",
} as const satisfies Record<AppPathname, string>;

export function localizedPath(locale: Locale, href: AppPathname): string {
  return getPathname({ locale, href });
}

export function absoluteUrl(locale: Locale, href: AppPathname): string {
  const path = localizedPath(locale, href);
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

/** Alternativas hreflang de una ruta en los 5 idiomas + x-default (versión en español). */
export function languageAlternates(href: AppPathname): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of locales) out[l] = absoluteUrl(l, href);
  out["x-default"] = absoluteUrl(routing.defaultLocale, href);
  return out;
}

export async function buildMetadata(
  locale: Locale,
  href: AppPathname,
  opts: { noindex?: boolean } = {},
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const key = pageMetaKey[href];
  const isHome = href === "/";
  const title = t(`${key}.title`);
  const description = t(`${key}.description`);
  const url = absoluteUrl(locale, href);
  const index = IS_INDEXABLE && !opts.noindex;
  const fullTitle = isHome ? `${t("siteName")} | ${title}` : title;

  return {
    metadataBase: new URL(SITE_URL),
    title: isHome ? { absolute: fullTitle } : title,
    description,
    alternates: { canonical: url, languages: languageAlternates(href) },
    openGraph: {
      type: "website",
      url,
      siteName: company.brandName,
      title: isHome ? fullTitle : `${title} | ${t("siteName")}`,
      description,
      locale: ogLocales[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
      images: [{ url: ogImage.src, width: ogImage.width, height: ogImage.height, alt: company.legalName }],
    },
    twitter: {
      card: "summary_large_image",
      title: isHome ? fullTitle : `${title} | ${t("siteName")}`,
      description,
      images: [ogImage.src],
    },
    robots: index
      ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } }
      : { index: false, follow: false },
    verification: {
      google: SEARCH_VERIFICATION.google || undefined,
      other: SEARCH_VERIFICATION.bing ? { "msvalidate.01": SEARCH_VERIFICATION.bing } : undefined,
    },
  };
}
