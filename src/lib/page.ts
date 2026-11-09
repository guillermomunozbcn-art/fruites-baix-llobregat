import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { type Locale, routing } from "@/i18n/routing";

export type LocaleParams = { params: Promise<{ locale: string }> };

/** Valida el idioma de la ruta y habilita el renderizado estático. */
export async function resolveLocale(params: LocaleParams["params"]): Promise<Locale> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return locale;
}
