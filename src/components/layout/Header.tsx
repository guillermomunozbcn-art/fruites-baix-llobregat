"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { company } from "@/data/company";
import { Link, usePathname } from "@/i18n/navigation";
import { buttonClass } from "../ui/Button";
import { ArrowRight, CloseIcon, MailIcon, MenuIcon, PhoneIcon } from "../ui/Icons";
import { LanguageMenu } from "./LanguageMenu";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { navItems } from "./navItems";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloqueo de scroll, Escape y foco inicial del menú móvil
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>("a,button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-forest px-5 py-3 text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t("skipToContent")}
      </a>
      <header
        className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-500 ${
          scrolled || open
            ? "border-forest/10 bg-ivory/92 shadow-[0_8px_30px_-20px_rgba(16,41,31,0.45)] backdrop-blur-md"
            : "border-transparent bg-ivory"
        }`}
      >
        <div className="mx-auto flex h-[4.5rem] w-full max-w-[1320px] items-center justify-between gap-6 px-5 sm:px-8 lg:h-20 lg:px-12">
          <Link href="/" aria-label={t("homeAria")} className="shrink-0" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <nav aria-label={t("mainNav")} className="hidden xl:block">
            <ul className="flex items-center gap-5 whitespace-nowrap text-[0.9rem] 2xl:gap-8">
              {navItems.slice(1).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`link-underline py-2 transition-colors ${
                      isActive(item.href) ? "text-forest font-semibold" : "text-graphite/80 hover:text-forest"
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <LanguageMenu />
            </div>
            <div className="hidden md:block">
              <Link href="/profesionales" className={buttonClass("primary", "whitespace-nowrap !min-h-11 !px-5 !text-[0.88rem]")}>
                {t("cta")}
              </Link>
            </div>
            <button
              ref={buttonRef}
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full border border-forest/20 text-forest transition-colors hover:bg-forest hover:text-ivory xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t("closeMenu") : t("openMenu")}
              onClick={() => (open ? close() : setOpen(true))}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

      </header>

      {/* Menú móvil / tablet */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto bg-forest text-ivory lg:top-20 xl:hidden"
      >
        <div className="mx-auto flex min-h-full max-w-[1320px] flex-col px-5 pb-10 pt-8 sm:px-8 lg:px-12">
          <nav aria-label={t("mainNav")}>
            <ol className="divide-y divide-ivory/10 border-y border-ivory/10">
              {navItems.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="group flex items-baseline gap-5 py-4 font-display text-[1.75rem] leading-tight sm:text-4xl"
                  >
                    <span className="font-sans text-xs tabular-nums tracking-widest text-ochre">0{i + 1}</span>
                    <span className={isActive(item.href) ? "text-ochre" : "transition-colors group-hover:text-sage"}>{t(item.key)}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          <div className="mt-8 flex flex-col gap-6">
            <Link href="/profesionales" onClick={() => setOpen(false)} className={buttonClass("accent", "w-full sm:w-auto sm:self-start")}>
              {t("cta")} <ArrowRight />
            </Link>
            <div className="flex flex-col gap-3 text-ivory/80">
              <a href={company.phone.href} className="inline-flex min-h-11 items-center gap-3 hover:text-ivory">
                <PhoneIcon /> {company.phone.display}
              </a>
              <a href={`mailto:${company.email}`} className="inline-flex min-h-11 items-center gap-3 break-all hover:text-ivory">
                <MailIcon /> {company.email}
              </a>
            </div>
            <div className="border-t border-ivory/10 pt-5">
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-ivory/60">{t("language")}</p>
              <LanguageSwitcher tone="light" size="lg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
