import { useTranslations } from "next-intl";
import { company, stallsLabel } from "@/data/company";
import { featuredProducts } from "@/data/products";
import { Link } from "@/i18n/navigation";
import { ProductTile } from "../products/ProductFeature";
import { ButtonLink, ExternalButton } from "../ui/Button";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { ArrowRight, MailIcon, PhoneIcon, PinIcon } from "../ui/Icons";
import { NumberedList } from "../ui/NumberedList";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { SiteImage } from "../ui/SiteImage";

/* 0 · Hero */
export function HomeHero() {
  const t = useTranslations("home.hero");
  return (
    <section className="relative isolate overflow-hidden bg-forest-deep text-ivory">
      <div className="absolute inset-0 -z-10">
        <SiteImage id="mandarinTree" priority quality={70} sizes="100vw" className="hero-image" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-forest-deep/95 via-forest-deep/70 to-forest-deep/20" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent" />
      </div>
      <Container className="flex min-h-[calc(100svh-4.5rem)] flex-col justify-end pb-10 pt-24 lg:min-h-[min(860px,calc(100svh-5rem))] lg:pb-14">
        <div className="hero-copy max-w-3xl">
          <Eyebrow tone="light">{t("eyebrow")}</Eyebrow>
          <h1 className="mt-6 text-[2.9rem] leading-[0.98] sm:text-7xl lg:text-[6.2rem]">{t("title")}</h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ivory/85 sm:text-xl">{t("subtitle")}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/productos" variant="accent">
              {t("ctaPrimary")}
            </ButtonLink>
            <ButtonLink href="/contacto" variant="outline-light">
              {t("ctaSecondary")}
            </ButtonLink>
          </div>
        </div>
        <ul className="mt-14 grid grid-cols-1 gap-3 border-t border-ivory/15 pt-6 text-sm text-ivory/80 sm:grid-cols-3 lg:mt-20">
          {(["since", "location", "b2b"] as const).map((k) => (
            <li key={k} className="flex items-center gap-3">
              <span aria-hidden className="size-1.5 rounded-full bg-ochre" />
              {t(`facts.${k}`)}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* 1 · Presentación */
export function HomeIntro() {
  const t = useTranslations("home.intro");
  return (
    <section className="py-20 lg:py-32">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-6 text-[2.2rem] leading-[1.06] text-forest sm:text-6xl">{t("title")}</h2>
        </Reveal>
        <Reveal className="space-y-5 text-lg leading-relaxed text-stone lg:col-span-5 lg:pt-14" delay={120}>
          <p>{t("body1")}</p>
          <p>{t("body2")}</p>
          <Link href="/empresa" className="inline-flex items-center gap-2 pt-2 font-medium text-forest">
            <span className="link-underline">{t("link")}</span> <ArrowRight />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}

/* 2 · Especialidades de temporada */
export function HomeFeatured() {
  const t = useTranslations("home.featured");
  const tc = useTranslations("common");
  return (
    <section className="pb-20 lg:pb-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading eyebrow={t("eyebrow")} title={t("title")} body={t("body")} />
          </Reveal>
          <Reveal delay={100} className="shrink-0">
            <ButtonLink href="/productos" variant="outline">
              {t("cta")}
            </ButtonLink>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-12 lg:gap-5">
          {featuredProducts.map((p, i) => (
            <Reveal key={p.id} delay={i * 80} className={i === 0 || i === 3 ? "lg:col-span-7" : "lg:col-span-5"}>
              <ProductTile product={p} index={i} />
            </Reveal>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-stone">{tc("assortmentNotice")}</p>
      </Container>
    </section>
  );
}

/* 3 · Origen y selección */
export function HomeOrigin() {
  const t = useTranslations("home.origin");
  const points = t.raw("points") as { title: string; text: string }[];
  return (
    <section className="bg-forest py-20 text-ivory lg:py-32">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem]">
            <SiteImage id="cropRows" sizes="(min-width: 1024px) 40vw, 100vw" />
          </Reveal>
        </div>
        <div className="lg:col-span-7 lg:pt-6">
          <Reveal>
            <SectionHeading eyebrow={t("eyebrow")} title={t("title")} body={t("body")} tone="light" />
          </Reveal>
          <div className="mt-14">
            <NumberedList items={points} tone="light" columns={3} />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* 4 · A quién vendemos */
export function HomeBuyers() {
  const t = useTranslations("home.buyers");
  const list = t.raw("list") as string[];
  return (
    <section className="py-20 lg:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Reveal>
            <SectionHeading eyebrow={t("eyebrow")} title={t("title")} body={t("body")} />
          </Reveal>
          <ul className="mt-10 border-t border-forest/15">
            {list.map((item, i) => (
              <Reveal as="li" key={item} delay={i * 60} className="flex items-baseline gap-5 border-b border-forest/15 py-4">
                <span className="font-display text-sm tabular-nums text-ochre-ink">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-xl text-forest sm:text-2xl">{item}</span>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-10">
            <ButtonLink href="/profesionales">{t("cta")}</ButtonLink>
          </Reveal>
        </div>
        <div className="relative lg:col-span-6">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] lg:aspect-[5/6]">
            <SiteImage id="retailShelves" sizes="(min-width: 1024px) 45vw, 100vw" />
          </Reveal>
          <Reveal
            delay={150}
            className="relative -mt-16 ml-auto w-2/3 overflow-hidden rounded-[1.25rem] border-[6px] border-ivory sm:w-1/2 lg:absolute lg:-bottom-10 lg:-left-10 lg:mt-0 lg:w-[45%]"
          >
            <div className="relative aspect-square">
              <SiteImage id="potatoCrates" sizes="(min-width: 1024px) 20vw, 50vw" />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* 5 · Trayectoria */
export function HomeExperience() {
  const t = useTranslations("home.experience");
  return (
    <section className="grain border-y border-forest/10 bg-ivory-deep py-20 lg:py-28">
      <Container className="grid items-center gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="font-display text-[7rem] leading-none text-forest sm:text-[10rem] lg:text-[12rem]" aria-hidden>
            {company.foundedYear}
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-ochre-ink">{t("yearLabel")}</p>
        </Reveal>
        <Reveal className="lg:col-span-7" delay={120}>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} body={t("body")} />
        </Reveal>
      </Container>
    </section>
  );
}

/* 6 · Presencia en Mercabarna */
export function HomeMercabarna() {
  const t = useTranslations("home.mercabarna");
  const tc = useTranslations("common");
  return (
    <section className="py-20 lg:py-32">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} body={t("body")} />
          <div className="mt-10 rounded-[1.5rem] border border-forest/15 bg-paper p-7">
            <h3 className="text-2xl text-forest">{t("pickupTitle")}</h3>
            <p className="mt-3 leading-relaxed text-stone">{t("pickup")}</p>
          </div>
        </Reveal>
        <Reveal className="flex flex-col justify-between gap-8 rounded-[1.75rem] bg-forest p-8 text-ivory sm:p-10 lg:col-span-6" delay={120}>
          <div className="relative -mx-2 -mt-2 aspect-[16/10] overflow-hidden rounded-[1.25rem] sm:-mx-4 sm:-mt-4">
            <SiteImage id="vegetableBaskets" sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
          <address className="not-italic">
            <p className="flex items-start gap-3 text-lg">
              <PinIcon className="mt-1 size-5 shrink-0 text-ochre" />
              <span>
                {company.address.market} · {tc("pavilion", { pavilion: company.address.pavilion })}
                <br />
                <span className="text-ivory/75">
                  {tc("stalls", { stalls: stallsLabel() })} · {company.address.postalCode} {company.address.locality}
                </span>
              </span>
            </p>
          </address>
          <div>
            <a
              href={company.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-3 rounded-full bg-ivory px-6 font-medium text-forest transition-colors hover:bg-white"
            >
              {t("cta")} <ArrowRight />
              <span className="sr-only">{tc("newWindow")}</span>
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* 7 · Relaciones con productores */
export function HomeProducers() {
  const t = useTranslations("home.producers");
  return (
    <section className="relative isolate overflow-hidden bg-forest-deep py-24 text-ivory lg:py-36">
      <div className="absolute inset-0 -z-10 opacity-45">
        <SiteImage id="farmer" sizes="100vw" alt="" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-deep/70 to-forest-deep/90" />
      <Container>
        <Reveal className="mx-auto max-w-4xl text-center">
          <Eyebrow tone="light" className="justify-center">
            {t("eyebrow")}
          </Eyebrow>
          <blockquote className="mt-8">
            <p className="font-display text-[2.2rem] leading-[1.1] sm:text-6xl lg:text-7xl">«{t("quote")}»</p>
          </blockquote>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ivory/80">{t("body")}</p>
        </Reveal>
      </Container>
    </section>
  );
}

/* 8 · Invitación a proveedores */
export function HomeSuppliersInvite() {
  const t = useTranslations("home.suppliersInvite");
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <Reveal className="grid overflow-hidden rounded-[2rem] bg-ochre lg:grid-cols-2">
          <div className="relative min-h-72 lg:min-h-full">
            <SiteImage id="localCrates" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div className="p-8 text-forest-deep sm:p-12 lg:p-16">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em]">{t("eyebrow")}</p>
            <h2 className="mt-5 text-[2.1rem] leading-[1.08] sm:text-5xl">{t("title")}</h2>
            <p className="mt-6 text-lg leading-relaxed text-forest-deep/80">{t("body")}</p>
            <div className="mt-9">
              <ButtonLink href="/proveedores" variant="primary">
                {t("cta")}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* 9 · Contacto comercial */
export function HomeContact() {
  const t = useTranslations("home.contactCta");
  return (
    <section className="pb-24 lg:pb-32">
      <Container className="grid gap-12 border-t border-forest/15 pt-16 lg:grid-cols-12 lg:pt-24">
        <Reveal className="lg:col-span-7">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} body={t("body")} />
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/profesionales">{t("ctaBuyer")}</ButtonLink>
            <ButtonLink href="/contacto" variant="outline">
              {t("ctaContact")}
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal className="flex flex-col justify-end gap-4 lg:col-span-5" delay={120}>
          <ExternalButton href={company.phone.href} variant="outline" className="justify-start !rounded-2xl !py-5 text-lg">
            <PhoneIcon className="size-5 text-ochre-ink" /> {company.phone.display}
          </ExternalButton>
          <ExternalButton href={`mailto:${company.email}`} variant="outline" className="justify-start break-all !rounded-2xl !py-5 text-lg">
            <MailIcon className="size-5 shrink-0 text-ochre-ink" /> {company.email}
          </ExternalButton>
        </Reveal>
      </Container>
    </section>
  );
}
