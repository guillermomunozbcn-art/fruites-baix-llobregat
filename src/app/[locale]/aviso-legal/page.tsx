import { LegalPage } from "@/components/layout/LegalPage";
import { company } from "@/data/company";
import { type LocaleParams, resolveLocale } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams) {
  // noindex hasta que los textos legales hayan sido revisados (company.legal.reviewed)
  return buildMetadata(await resolveLocale(params), "/aviso-legal", { noindex: !company.legal.reviewed });
}

export default async function LegalNoticePage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  return <LegalPage locale={locale} href="/aviso-legal" docKey="legalNotice" />;
}
