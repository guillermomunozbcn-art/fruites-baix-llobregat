import { getTranslations } from "next-intl/server";
import { MapEmbed } from "@/components/contact/MapEmbed";
import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRight, MailIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { company, stallsLabel } from "@/data/company";
import { Link } from "@/i18n/navigation";
import { type LocaleParams, resolveLocale } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams) {
  return buildMetadata(await resolveLocale(params), "/contacto");
}

export default async function ContactPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = await getTranslations("contact");
  const tn = await getTranslations("nav");
  const tc = await getTranslations("common");

  return (
    <>
      <section className="pb-12 pt-8 lg:pb-16 lg:pt-12">
        <Container>
          <Breadcrumbs locale={locale} href="/contacto" label={tn("contact")} />
          <div className="hero-copy mt-8 max-w-4xl lg:mt-12">
            <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            <h1 className="mt-6 text-[2.5rem] leading-[1.04] text-forest sm:text-6xl lg:text-[4.4rem]">{t("hero.title")}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-stone sm:text-xl">{t("hero.lead")}</p>
          </div>
        </Container>
      </section>

      <section className="pb-16 lg:pb-24">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-8 lg:col-span-5">
            <Reveal className="rounded-[1.5rem] bg-forest p-8 text-ivory sm:p-10">
              <h2 className="text-3xl">{t("info.title")}</h2>
              <dl className="mt-8 space-y-6">
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-ochre">{t("info.company")}</dt>
                  <dd className="mt-1 text-lg">{company.legalName}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-ochre">{t("info.location")}</dt>
                  <dd className="mt-1 flex gap-3 text-lg">
                    <PinIcon className="mt-1 size-5 shrink-0 text-ochre" />
                    <span>
                      {t("info.locationValue")}
                      <br />
                      <span className="text-ivory/75">
                        {t("info.stallsLabel")} {stallsLabel()}
                        <br />
                        {t("info.postal")}
                      </span>
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-ochre">{tc("phone")}</dt>
                  <dd className="mt-1">
                    <a href={company.phone.href} className="inline-flex min-h-11 items-center gap-3 text-lg hover:underline">
                      <PhoneIcon className="size-5 text-ochre" /> {company.phone.display}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-ochre">{tc("email")}</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${company.email}`} className="inline-flex min-h-11 items-center gap-3 break-all text-lg hover:underline">
                      <MailIcon className="size-5 shrink-0 text-ochre" /> {company.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>
            <Reveal delay={80}>
              <MapEmbed
                labels={{
                  title: t("map.title"),
                  consent: t("map.consent"),
                  load: t("map.load"),
                  iframeTitle: t("map.iframeTitle"),
                  open: tc("openInMaps"),
                }}
              />
            </Reveal>
            <Reveal delay={120} className="rounded-[1.5rem] border border-forest/15 p-7">
              <h2 className="text-2xl text-forest">{t("shortcuts.title")}</h2>
              <ul className="mt-4 space-y-1">
                <li>
                  <Link href={{ pathname: "/profesionales", hash: "formulario" }} className="inline-flex min-h-11 items-center gap-2 font-medium text-forest">
                    <span className="link-underline">{t("shortcuts.buyer")}</span> <ArrowRight />
                  </Link>
                </li>
                <li>
                  <Link href={{ pathname: "/proveedores", hash: "formulario" }} className="inline-flex min-h-11 items-center gap-2 font-medium text-forest">
                    <span className="link-underline">{t("shortcuts.supplier")}</span> <ArrowRight />
                  </Link>
                </li>
              </ul>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <h2 className="text-3xl text-forest sm:text-4xl">{t("form.title")}</h2>
            <p className="mb-8 mt-3 text-stone">{t("form.body")}</p>
            <LeadForm type="contact" />
          </div>
        </Container>
      </section>
    </>
  );
}
