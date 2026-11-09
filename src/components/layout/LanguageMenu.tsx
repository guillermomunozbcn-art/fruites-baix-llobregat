"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { localeNames, locales } from "@/i18n/routing";

/** Selector de idioma compacto para la cabecera de escritorio. */
export function LanguageMenu() {
  const t = useTranslations("nav");
  const current = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        ref.current?.querySelector("button")?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${t("changeLanguage")}: ${localeNames[current as keyof typeof localeNames]}`}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-forest transition-colors hover:bg-forest/5"
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
        </svg>
        {current}
        <svg viewBox="0 0 24 24" className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <ul
        id={listId}
        hidden={!open}
        className="absolute right-0 top-full mt-2 min-w-44 overflow-hidden rounded-2xl border border-forest/10 bg-paper py-2 shadow-[0_20px_50px_-20px_rgba(16,41,31,0.45)]"
      >
        {locales.map((l) => (
          <li key={l}>
            <Link
              href={pathname}
              locale={l}
              hrefLang={l}
              lang={l}
              aria-current={l === current ? "true" : undefined}
              onClick={() => setOpen(false)}
              className={`flex min-h-11 items-center justify-between gap-6 px-5 text-sm transition-colors hover:bg-forest/5 ${
                l === current ? "font-semibold text-forest" : "text-graphite"
              }`}
            >
              {localeNames[l]}
              <span className="text-xs uppercase tracking-[0.14em] text-stone">{l}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
