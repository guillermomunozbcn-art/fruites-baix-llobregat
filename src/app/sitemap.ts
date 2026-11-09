import type { MetadataRoute } from "next";
import { company } from "@/data/company";
import { type AppPathname, locales } from "@/i18n/routing";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

/** Sitemap multilingüe: cada URL con sus alternativas hreflang. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { href: AppPathname; priority: number }[] = [
    { href: "/", priority: 1 },
    { href: "/productos", priority: 0.9 },
    { href: "/profesionales", priority: 0.9 },
    { href: "/proveedores", priority: 0.8 },
    { href: "/empresa", priority: 0.7 },
    { href: "/contacto", priority: 0.7 },
  ];
  if (company.legal.reviewed) {
    pages.push({ href: "/aviso-legal", priority: 0.2 }, { href: "/privacidad", priority: 0.2 }, { href: "/cookies", priority: 0.2 });
  }
  const lastModified = new Date();
  return pages.flatMap(({ href, priority }) =>
    locales.map((locale) => ({
      url: absoluteUrl(locale, href),
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages: languageAlternates(href) },
    })),
  );
}
