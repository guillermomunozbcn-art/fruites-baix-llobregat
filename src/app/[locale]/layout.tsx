import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { Analytics } from "@/components/consent/Analytics";
import { CookieBanner } from "@/components/consent/CookieBanner";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { GA_ID, SITE_URL } from "@/config/site";
import { type Locale, routing } from "@/i18n/routing";
import { organizationGraph } from "@/lib/structured-data";

const display = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});
const sans = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });

export const viewport: Viewport = {
  themeColor: "#f3efe5",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("siteName"), template: t("titleTemplate") },
    applicationName: t("siteName"),
    formatDetection: { telephone: false },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** Namespaces que necesitan los componentes de cliente (cabecera, formularios, cookies). */
const CLIENT_NAMESPACES = ["nav", "forms", "consent", "images"] as const;

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const clientMessages = Object.fromEntries(CLIENT_NAMESPACES.map((ns) => [ns, messages[ns]]));
  const t = await getTranslations("meta");

  return (
    <html lang={locale} className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          <Header />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
          {GA_ID && (
            <>
              <CookieBanner />
              <Analytics gaId={GA_ID} />
            </>
          )}
        </NextIntlClientProvider>
        <JsonLd data={organizationGraph(locale as Locale, t("home.description"))} />
      </body>
    </html>
  );
}
