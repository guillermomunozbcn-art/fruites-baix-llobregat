import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { AppPathname, Locale } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo";
import { breadcrumbList } from "@/lib/structured-data";
import { JsonLd } from "../seo/JsonLd";

/** Migas de pan visibles + BreadcrumbList (Schema.org). */
export async function Breadcrumbs({ locale, href, label, tone = "dark" }: { locale: Locale; href: AppPathname; label: string; tone?: "dark" | "light" }) {
  const t = await getTranslations("nav");
  const items = [
    { name: t("home"), url: absoluteUrl(locale, "/") },
    { name: label, url: absoluteUrl(locale, href) },
  ];
  return (
    <>
      <nav aria-label={t("breadcrumb")} className={`text-xs ${tone === "dark" ? "text-stone" : "text-ivory/70"}`}>
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:underline">
              {t("home")}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className={tone === "dark" ? "text-graphite" : "text-ivory"}>
            {label}
          </li>
        </ol>
      </nav>
      <JsonLd data={breadcrumbList(items)} />
    </>
  );
}
