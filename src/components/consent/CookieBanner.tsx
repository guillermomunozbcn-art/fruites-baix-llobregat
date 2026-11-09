"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { OPEN_CONSENT_EVENT, readConsent, saveConsent } from "@/lib/consent";

/** Aviso de cookies analíticas (solo se muestra si hay analítica configurada). Aceptar y rechazar con igual prominencia. */
export function CookieBanner() {
  const t = useTranslations("consent");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- depende de localStorage, solo disponible en cliente
    setVisible(readConsent() === null);
    const open = () => setVisible(true);
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  if (!visible) return null;
  const decide = (analytics: boolean) => {
    saveConsent(analytics);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-xl rounded-2xl border border-forest/10 bg-paper p-5 text-graphite shadow-[0_20px_60px_-20px_rgba(16,41,31,0.5)] sm:inset-x-6 sm:bottom-6 sm:p-6"
    >
      <h2 id="consent-title" className="font-display text-xl text-forest">{t("title")}</h2>
      <p className="mt-2 text-sm leading-relaxed text-stone">
        {t("body")}{" "}
        <Link href="/cookies" className="font-medium text-forest underline underline-offset-2">
          {t("more")}
        </Link>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button type="button" onClick={() => decide(false)} className="min-h-11 rounded-full border border-forest/30 px-4 text-sm font-medium text-forest hover:bg-forest hover:text-ivory">
          {t("reject")}
        </button>
        <button type="button" onClick={() => decide(true)} className="min-h-11 rounded-full border border-forest bg-forest px-4 text-sm font-medium text-ivory hover:bg-forest-deep">
          {t("accept")}
        </button>
      </div>
    </div>
  );
}
