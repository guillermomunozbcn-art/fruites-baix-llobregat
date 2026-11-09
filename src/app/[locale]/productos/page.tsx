import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteImage } from "@/components/ui/SiteImage";
import { categories, featuredProducts, visibleProducts } from "@/data/products";
import { type LocaleParams, resolveLocale } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams) {
  return buildMetadata(await resolveLocale(params), "/productos");
}

export default async function ProductsPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = await getTranslations("products");
  const tn = await getTranslations("nav");
  const tc = await getTranslations("common");
  const others = visibleProducts.filter((p) => !p.featured);

  return (
    <>
      <PageHero
        locale={locale}
        href="/productos"
        crumb={tn("products")}
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lead={t("hero.lead")}
        image="artichokes"
      >
        <ButtonLink href="/profesionales">{tc("checkAvailability")}</ButtonLink>
      </PageHero>

      {/* Aviso de surtido */}
      <Container>
        <p role="note" className="rounded-2xl border border-ochre/50 bg-ochre/10 px-6 py-5 text-[1.02rem] leading-relaxed text-forest">
          {tc("assortmentNotice")}
        </p>
      </Container>

      {/* Especialidades destacadas */}
      <section className="py-16 lg:py-28" aria-labelledby="featured-title">
        <Container>
          <Reveal>
            <h2 id="featured-title" className="text-[2.1rem] leading-[1.08] text-forest sm:text-5xl">
              {t("featuredTitle")}
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-stone">{t("featuredBody")}</p>
          </Reveal>
          <div className="mt-14 space-y-16 lg:space-y-24">
            {featuredProducts.map((p, i) => (
              <article id={p.id} key={p.id} className="grid scroll-mt-28 items-center gap-8 lg:grid-cols-12 lg:gap-16">
                <Reveal className={`lg:col-span-6 ${i % 2 ? "lg:order-2" : ""}`}>
                  <div className="zoom-on-hover relative aspect-[4/3] overflow-hidden rounded-[1.75rem]">
                    <SiteImage id={p.image} sizes="(min-width: 1024px) 45vw, 100vw" />
                  </div>
                </Reveal>
                <Reveal delay={100} className="lg:col-span-6">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-ochre-ink">
                    {String(i + 1).padStart(2, "0")} · {t(`items.${p.id}.tag`)}
                  </p>
                  <h3 className="mt-4 text-4xl text-forest sm:text-5xl">{t(`items.${p.id}.name`)}</h3>
                  <p className="mt-5 text-lg leading-relaxed text-stone">{t(`items.${p.id}.description`)}</p>
                  <dl className="mt-7 grid grid-cols-2 gap-6 border-t border-forest/15 pt-5 text-sm">
                    <div>
                      <dt className="text-stone">{t("seasonLabel")}</dt>
                      <dd className="mt-1 font-medium text-forest">{t(`items.${p.id}.season`)}</dd>
                    </div>
                    <div>
                      <dt className="text-stone">{t("categoryLabel")}</dt>
                      <dd className="mt-1 font-medium text-forest">{t(`categories.${p.category}.name`)}</dd>
                    </div>
                  </dl>
                  <div className="mt-8">
                    <ButtonLink href={{ pathname: "/profesionales", query: { product: t(`items.${p.id}.name`) }, hash: "formulario" }}>
                      {t("askCta")}
                      <span className="sr-only">: {t(`items.${p.id}.name`)}</span>
                    </ButtonLink>
                  </div>
                </Reveal>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Familias de producto */}
      <section className="grain bg-ivory-deep py-16 lg:py-28" aria-labelledby="categories-title">
        <Container>
          <Reveal>
            <h2 id="categories-title" className="text-[2.1rem] leading-[1.08] text-forest sm:text-5xl">
              {t("categoriesTitle")}
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-stone">{t("categoriesBody")}</p>
          </Reveal>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <Reveal as="li" key={c.id} delay={(i % 3) * 80} className="group overflow-hidden rounded-[1.5rem] bg-paper">
                <div id={`cat-${c.id}`} className="zoom-on-hover relative aspect-[16/11] scroll-mt-28 overflow-hidden">
                  <SiteImage id={c.image} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" />
                </div>
                <div className="p-6 sm:p-7">
                  <h3 className="text-2xl text-forest">{t(`categories.${c.id}.name`)}</h3>
                  <p className="mt-3 leading-relaxed text-stone">{t(`categories.${c.id}.description`)}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Otras referencias */}
      {others.length > 0 && (
        <section className="py-16 lg:py-24" aria-labelledby="others-title">
          <Container>
            <Reveal>
              <SectionHeading title={t("otherTitle")} />
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {others.map((p, i) => (
                <Reveal as="article" id={p.id} key={p.id} delay={i * 80} className="grid scroll-mt-28 overflow-hidden rounded-[1.5rem] border border-forest/10 bg-paper sm:grid-cols-5">
                  <div className="relative aspect-[16/10] sm:col-span-2 sm:aspect-auto">
                    <SiteImage id={p.image} sizes="(min-width: 640px) 20vw, 100vw" />
                  </div>
                  <div className="p-6 sm:col-span-3">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ochre-ink">{t(`items.${p.id}.tag`)}</p>
                    <h3 className="mt-2 text-2xl text-forest">{t(`items.${p.id}.name`)}</h3>
                    <p className="mt-3 text-[0.98rem] leading-relaxed text-stone">{t(`items.${p.id}.description`)}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBand title={t("cta.title")} body={t("cta.body")}>
        <ButtonLink href="/profesionales" variant="accent">
          {tc("checkAvailability")}
        </ButtonLink>
        <ButtonLink href="/contacto" variant="outline-light">
          {tc("contactSales")}
        </ButtonLink>
      </CtaBand>
    </>
  );
}
