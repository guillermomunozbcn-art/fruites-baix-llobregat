"use client";

import { useState } from "react";
import { company } from "@/data/company";

/** Mapa de Google cargado solo a petición del usuario (evita cookies de terceros sin acción previa). */
export function MapEmbed({ labels }: { labels: { title: string; consent: string; load: string; iframeTitle: string; open: string } }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-sage-soft sm:aspect-[16/10]">
      {loaded ? (
        <iframe
          title={labels.iframeTitle}
          src={company.mapsEmbedUrl}
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-start justify-end gap-4 bg-[radial-gradient(circle_at_70%_30%,#b9c8a9_0,#dce4d2_45%,#e8e1d1_100%)] p-6 sm:p-8">
          <p className="font-display text-2xl text-forest">{labels.title}</p>
          <p className="max-w-sm text-sm text-stone">{labels.consent}</p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="min-h-11 rounded-full bg-forest px-5 text-sm font-medium text-ivory hover:bg-forest-deep"
            >
              {labels.load}
            </button>
            <a
              href={company.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-full border border-forest/30 px-5 text-sm font-medium text-forest hover:bg-forest hover:text-ivory"
            >
              {labels.open}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
