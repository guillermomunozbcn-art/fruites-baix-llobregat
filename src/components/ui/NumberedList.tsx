import { Reveal } from "./Reveal";

/** Lista editorial numerada (pasos, valores, ventajas) sin iconografía genérica. */
export function NumberedList({
  items,
  tone = "dark",
  columns = 2,
}: {
  items: { title: string; text: string }[];
  tone?: "dark" | "light";
  columns?: 2 | 3 | 4;
}) {
  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  const line = tone === "dark" ? "border-forest/15" : "border-ivory/15";
  return (
    <ol className={`grid gap-x-10 gap-y-10 ${cols}`}>
      {items.map((it, i) => (
        <Reveal as="li" key={it.title} delay={i * 70} className={`border-t pt-6 ${line}`}>
          <span className={`font-display text-sm tabular-nums ${tone === "dark" ? "text-ochre-ink" : "text-ochre"}`}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className={`mt-3 text-2xl ${tone === "dark" ? "text-forest" : "text-ivory"}`}>{it.title}</h3>
          <p className={`mt-3 leading-relaxed ${tone === "dark" ? "text-stone" : "text-ivory/75"}`}>{it.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}
