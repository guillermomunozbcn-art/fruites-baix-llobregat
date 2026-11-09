import { getTranslations } from "next-intl/server";
import { company } from "@/data/company";
import type { AppPathname, Locale } from "@/i18n/routing";
import { Container } from "../ui/Container";
import { Breadcrumbs } from "./Breadcrumbs";

type Section = { title: string; body: string };

/** Plantilla de páginas legales. Los datos no confirmados (NIF, registro…) se añaden solo si existen en company.ts. */
export async function LegalPage({ locale, href, docKey }: { locale: Locale; href: AppPathname; docKey: "legalNotice" | "privacy" | "cookies" }) {
  const t = await getTranslations("legal");
  const sections = t.raw(`${docKey}.sections`) as Section[];
  const fill = (s: string) =>
    s
      .replaceAll("{company}", company.legalName)
      .replaceAll("{email}", company.legal.privacyEmail ?? company.email)
      .replaceAll("{phone}", company.phone.display);
  const extra =
    docKey === "legalNotice"
      ? [company.legal.taxId && `NIF: ${company.legal.taxId}`, company.legal.registry, company.legal.registeredAddress].filter(Boolean)
      : [];

  return (
    <Container className="pb-24 pt-8 lg:pt-12">
      <Breadcrumbs locale={locale} href={href} label={t(`${docKey}.title`)} />
      <article className="mt-10 max-w-3xl">
        <h1 className="text-4xl text-forest sm:text-6xl">{t(`${docKey}.title`)}</h1>
        <div className="mt-12 space-y-10">
          {sections.map((s, i) => (
            <section key={s.title}>
              <h2 className="text-2xl text-forest">{s.title}</h2>
              <p className="mt-3 leading-relaxed text-stone">{fill(s.body)}</p>
              {i === 0 && extra.length > 0 && (
                <ul className="mt-3 space-y-1 text-stone">
                  {extra.map((e) => (
                    <li key={String(e)}>{e}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>
    </Container>
  );
}
