import type { ReactNode } from "react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

/** Banda final de llamada a la acción. */
export function CtaBand({ title, body, children, tone = "forest" }: { title: string; body: string; children: ReactNode; tone?: "forest" | "sage" }) {
  const dark = tone === "forest";
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <Reveal
          className={`relative overflow-hidden rounded-[2rem] px-7 py-14 sm:px-12 lg:px-20 lg:py-20 ${dark ? "bg-forest text-ivory" : "bg-sage-soft text-forest"}`}
        >
          <div aria-hidden className={`absolute -right-24 -top-24 size-80 rounded-full ${dark ? "bg-forest-soft" : "bg-sage"} opacity-60`} />
          <div className="relative grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="text-[2rem] leading-[1.1] sm:text-5xl">{title}</h2>
              <p className={`mt-5 max-w-xl text-lg ${dark ? "text-ivory/80" : "text-stone"}`}>{body}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">{children}</div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
