import { getTranslations } from "next-intl/server";
import { LeadForm } from "@/components/forms/LeadForm";
import { PageHero } from "@/components/layout/PageHero";
import { buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { NumberedList } from "@/components/ui/NumberedList";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteImage } from "@/components/ui/SiteImage";
import { type LocaleParams, resolveLocale } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams) {
  return buildMetadata(await resolveLocale(params), "/proveedores");
}

type Item = { title: string; text: string };

export default async function SuppliersPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = await getTranslations("suppliers");
  const tn = await getTranslations("nav");
  const tc = await getTranslations("common");
  const who = t.raw("who.list") as string[];

  return (
    <>
      <PageHero
        locale={locale}
        href="/proveedores"
        crumb={tn("suppliers")}
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lead={t("hero.lead")}
        image="farmer"
      >
        <a href="#formulario" className={buttonClass("primary")}>
          {tc("iAmSupplier")}
        </a>
      </PageHero>

      {/* A quién buscamos */}
      <section className="py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHeading eyebrow={t("who.eyebrow")} title={t("who.title")} />
            <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-[1.5rem] lg:block">
              <SiteImage id="eggplantFlower" sizes="35vw" />
            </div>
          </Reveal>
          <ul className="border-t border-forest/15 lg:col-span-7">
            {who.map((item, i) => (
              <Reveal as="li" key={item} delay={i * 60} className="flex items-baseline gap-5 border-b border-forest/15 py-5">
                <span className="font-display text-sm tabular-nums text-ochre-ink">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-2xl text-forest sm:text-3xl">{item}</span>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Qué valoramos */}
      <section className="bg-forest py-16 text-ivory lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={t("values.eyebrow")} title={t("values.title")} tone="light" />
          </Reveal>
          <div className="mt-14">
            <NumberedList items={t.raw("values.list") as Item[]} tone="light" columns={3} />
          </div>
        </Container>
      </section>

      {/* Cómo funciona */}
      <section className="py-16 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={t("process.eyebrow")} title={t("process.title")} />
          </Reveal>
          <div className="mt-14">
            <NumberedList items={t.raw("process.steps") as Item[]} columns={3} />
          </div>
          <Reveal>
            <p role="note" className="mt-12 max-w-3xl border-l-2 border-ochre pl-4 text-stone">
              {t("process.note")}
            </p>
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
            <LeadForm type="supplier" />
          </div>
        </Container>
      </section>
    </>
  );
}
