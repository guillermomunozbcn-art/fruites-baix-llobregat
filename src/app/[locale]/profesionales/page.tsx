import { getTranslations } from "next-intl/server";
import { LeadForm } from "@/components/forms/LeadForm";
import { PageHero } from "@/components/layout/PageHero";
import { buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { NumberedList } from "@/components/ui/NumberedList";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteImage } from "@/components/ui/SiteImage";
import { company, stallsLabel } from "@/data/company";
import { type LocaleParams, resolveLocale } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams) {
  return buildMetadata(await resolveLocale(params), "/profesionales");
}

type Item = { title: string; text: string };

export default async function ProfessionalsPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = await getTranslations("professionals");
  const tn = await getTranslations("nav");
  const tc = await getTranslations("common");

  return (
    <>
      <PageHero
        locale={locale}
        href="/profesionales"
        crumb={tn("professionals")}
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lead={t("hero.lead")}
        image="retailShelves"
      >
        <a href="#formulario" className={buttonClass("primary")}>
          {tc("checkAvailability")}
        </a>
      </PageHero>

      {/* Con quién trabajamos */}
      <section className="py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={t("audience.eyebrow")} title={t("audience.title")} />
          </Reveal>
          <div className="mt-14">
            <NumberedList items={t.raw("audience.list") as Item[]} columns={3} />
          </div>
        </Container>
      </section>

      {/* Qué comercializamos */}
      <section className="pb-16 lg:pb-24">
        <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem]">
              <SiteImage id="vegetableStall" sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6" delay={100}>
            <SectionHeading eyebrow={t("offer.eyebrow")} title={t("offer.title")} body={t("offer.body")} />
            <p className="mt-6 text-sm text-stone">{tc("assortmentNotice")}</p>
          </Reveal>
        </Container>
      </section>

      {/* Ventajas */}
      <section className="bg-forest py-16 text-ivory lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={t("advantages.eyebrow")} title={t("advantages.title")} tone="light" />
          </Reveal>
          <div className="mt-14">
            <NumberedList items={t.raw("advantages.list") as Item[]} tone="light" columns={3} />
          </div>
        </Container>
      </section>

      {/* Modelo de compraventa */}
      <section className="py-16 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={t("model.eyebrow")} title={t("model.title")} />
          </Reveal>
          <div className="mt-14">
            <NumberedList items={t.raw("model.steps") as Item[]} columns={4} />
          </div>
        </Container>
      </section>

      {/* Recogida + comunicación */}
      <section className="pb-16 lg:pb-28">
        <Container className="grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-[1.75rem] bg-sage-soft p-8 sm:p-12">
            <SectionHeading eyebrow={t("pickup.eyebrow")} title={t("pickup.title")} body={t("pickup.body")} />
            <p className="mt-6 border-l-2 border-ochre pl-4 text-[0.98rem] font-medium text-forest">{t("pickup.note")}</p>
            <p className="mt-8 flex items-start gap-3 text-forest">
              <PinIcon className="mt-0.5 size-5 shrink-0 text-ochre-ink" />
              <span>
                {company.address.market} · {tc("pavilion", { pavilion: company.address.pavilion })} · {tc("stalls", { stalls: stallsLabel() })}
              </span>
            </p>
          </Reveal>
          <Reveal delay={100} className="rounded-[1.75rem] border border-forest/15 bg-paper p-8 sm:p-12">
            <SectionHeading eyebrow={t("communication.eyebrow")} title={t("communication.title")} body={t("communication.body")} />
            <div className="mt-8 flex flex-col gap-2">
              <a href={company.phone.href} className="inline-flex min-h-11 items-center gap-3 text-lg text-forest hover:underline">
                <PhoneIcon className="size-5 text-ochre-ink" /> {company.phone.display}
              </a>
              <a href={`mailto:${company.email}`} className="inline-flex min-h-11 items-center gap-3 break-all text-lg text-forest hover:underline">
                <MailIcon className="size-5 shrink-0 text-ochre-ink" /> {company.email}
              </a>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Formulario */}
      <section id="formulario" className="scroll-mt-24 bg-ivory-deep py-16 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading eyebrow={t("form.eyebrow")} title={t("form.title")} body={t("form.body")} />
          </Reveal>
          <div className="lg:col-span-8">
            <LeadForm type="buyer" />
          </div>
        </Container>
      </section>
    </>
  );
}
