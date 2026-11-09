import type { ReactNode } from "react";
import type { ImageId } from "@/data/images";
import type { AppPathname, Locale } from "@/i18n/routing";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { SiteImage } from "../ui/SiteImage";
import { Breadcrumbs } from "./Breadcrumbs";

/** Cabecera editorial de páginas interiores: texto + fotografía. */
export function PageHero({
  locale,
  href,
  crumb,
  eyebrow,
  title,
  lead,
  image,
  children,
}: {
  locale: Locale;
  href: AppPathname;
  crumb: string;
  eyebrow: string;
  title: string;
  lead: string;
  image: ImageId;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-14 pt-8 lg:pb-24 lg:pt-12">
      <Container>
        <Breadcrumbs locale={locale} href={href} label={crumb} />
        <div className="mt-8 grid items-end gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-14">
          <div className="hero-copy lg:col-span-7">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-6 text-[2.5rem] leading-[1.04] text-forest sm:text-6xl lg:text-[4.4rem]">{title}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-stone sm:text-xl">{lead}</p>
            {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
          </div>
          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] sm:aspect-[16/10] lg:aspect-[4/5]">
              <SiteImage id={image} priority sizes="(min-width: 1024px) 40vw, 100vw" className="hero-image" />
            </div>
            <div aria-hidden className="absolute -bottom-4 -left-4 -z-10 hidden h-1/2 w-1/2 rounded-[1.75rem] bg-sage/60 lg:block" />
          </div>
        </div>
      </Container>
    </section>
  );
}
