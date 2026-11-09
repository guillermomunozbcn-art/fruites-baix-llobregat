import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { NumberedList } from "@/components/ui/NumberedList";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteImage } from "@/components/ui/SiteImage";
import { company } from "@/data/company";
import { type LocaleParams, resolveLocale } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams) {
  return buildMetadata(await resolveLocale(params), "/empresa");
}

type Item = { title: string; text: string };

export default async function CompanyPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = await getTranslations("company");
  const tn = await getTranslations("nav");
  const tc = await getTranslations("common");

  return (
    <>
      <PageHero
        locale={locale}
        href="/empresa"
        crumb={tn("company")}
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lead={t("hero.lead")}
        image="heroMarket"
      />

      {/* Quiénes somos */}
      <section className="py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHeading eyebrow={t("about.eyebrow")} title={t("about.title")} />
          </Reveal>
          <Reveal className="space-y-5 text-lg leading-relaxed text-stone lg:col-span-7 lg:pt-12" delay={100}>
            <p>{t("about.body1")}</p>
            <p>{t("about.body2")}</p>
          </Reveal>
        </Container>
      </section>

      {/* Trayectoria + Mercabarna */}
      <section className="grain bg-ivory-deep py-16 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p aria-hidden className="font-display text-8xl leading-none text-sage sm:text-9xl">
              {company.foundedYear}
            </p>
            <SectionHeading eyebrow={t("history.eyebrow")} title={t("history.title")} body={t("history.body")} className="mt-6" as="h2" />
          </Reveal>
          <Reveal delay={120} className="lg:pt-24">
            <SectionHeading eyebrow={t("mercabarna.eyebrow")} title={t("mercabarna.title")} body={t("mercabarna.body")} />
            <a
              href={company.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-11 items-center gap-2 font-medium text-forest underline decoration-ochre decoration-2 underline-offset-4"
            >
              {tc("openInMaps")} <span className="sr-only">{tc("newWindow")}</span>
            </a>
          </Reveal>
        </Container>
      </section>

      {/* Forma de trabajar */}
      <section className="py-16 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={t("howWeWork.eyebrow")} title={t("howWeWork.title")} />
          </Reveal>
          <div className="mt-14">
            <NumberedList items={t.raw("howWeWork.steps") as Item[]} columns={4} />
          </div>
        </Container>
      </section>

      {/* Productores / Selección / Mercado */}
      <section className="pb-16 lg:pb-28">
        <Container className="space-y-20 lg:space-y-28">
          {(
            [
              { key: "producers", image: "farmer" },
              { key: "selection", image: "carrotCrate" },
              { key: "market", image: "eggplantFlower" },
            ] as const
          ).map((block, i) => (
            <div key={block.key} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <Reveal className={`lg:col-span-6 ${i % 2 ? "lg:order-2" : ""}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem]">
                  <SiteImage id={block.image} sizes="(min-width: 1024px) 45vw, 100vw" />
                </div>
              </Reveal>
              <Reveal delay={100} className="lg:col-span-6">
                <SectionHeading eyebrow={t(`${block.key}.eyebrow`)} title={t(`${block.key}.title`)} body={t(`${block.key}.body`)} />
              </Reveal>
            </div>
          ))}
        </Container>
      </section>

      {/* Filosofía */}
      <section className="bg-forest py-16 text-ivory lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={t("philosophy.eyebrow")} title={t("philosophy.title")} tone="light" />
          </Reveal>
          <div className="mt-14">
            <NumberedList items={t.raw("philosophy.values") as Item[]} tone="light" columns={4} />
          </div>
        </Container>
      </section>

      <CtaBand title={t("cta.title")} body={t("cta.body")} tone="sage">
        <ButtonLink href="/profesionales">{tc("checkAvailability")}</ButtonLink>
        <ButtonLink href="/proveedores" variant="outline">
          {tc("iAmSupplier")}
        </ButtonLink>
      </CtaBand>
    </>
  );
}
