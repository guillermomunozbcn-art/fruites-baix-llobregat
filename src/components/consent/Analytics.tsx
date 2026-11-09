"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, type ConsentState, readConsent } from "@/lib/consent";

/** Carga Google Analytics 4 únicamente tras consentimiento explícito. */
export function Analytics({ gaId }: { gaId: string }) {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lectura inicial de localStorage tras montar
    setGranted(Boolean(readConsent()?.analytics));
    const onChange = (e: Event) => {
      const analytics = (e as CustomEvent<ConsentState>).detail.analytics;
      setGranted(analytics);
      if (!analytics) {
        // Revocación: deja de medir en esta sesión y elimina cookies _ga
        (window as unknown as Record<string, boolean>)[`ga-disable-${gaId}`] = true;
        document.cookie.split(";").forEach((c) => {
          const name = c.split("=")[0]?.trim();
          if (name?.startsWith("_ga")) document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname.replace(/^www\./, "")}`;
        });
      }
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, [gaId]);

  if (!gaId || !granted) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true,content_group:document.documentElement.lang});`}
      </Script>
    </>
  );
}
