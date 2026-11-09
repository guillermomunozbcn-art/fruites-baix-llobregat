"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { localeNames, locales } from "@/i18n/routing";

/** Selector de idioma: enlaces rastreables que conservan la página equivalente. */
export function LanguageSwitcher({ tone = "dark", size = "sm" }: { tone?: "dark" | "light"; size?: "sm" | "lg" }) {
  const t = useTranslations("nav");
  const current = useLocale();
  const pathname = usePathname();
  const base = tone === "dark" ? "text-stone hover:text-forest" : "text-ivory/70 hover:text-ivory";
  const active = tone === "dark" ? "text-forest" : "text-ivory";
  return (
    <nav aria-label={t("changeLanguage")}>
      <ul className={`flex items-center ${size === "lg" ? "gap-1 text-base" : "gap-0.5 text-[0.78rem]"}`}>
        {locales.map((l) => {
          const isCurrent = l === current;
          return (
            <li key={l}>
              <Link
                href={pathname}
                locale={l}
                hrefLang={l}
                lang={l}
                aria-current={isCurrent ? "true" : undefined}
                aria-label={localeNames[l]}
                title={localeNames[l]}
                className={`inline-flex min-h-10 min-w-10 items-center justify-center rounded-full px-2 font-semibold uppercase tracking-[0.12em] transition-colors ${
                  isCurrent ? `${active} underline decoration-ochre decoration-2 underline-offset-[6px]` : base
                }`}
              >
                {l}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
