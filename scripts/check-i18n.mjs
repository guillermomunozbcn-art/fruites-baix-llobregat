// Comprueba que los 5 archivos de traducción tienen exactamente las mismas claves que es.json
// y que ningún valor está vacío. Uso: npm run check:i18n
import { readFileSync } from "node:fs";

const locales = ["es", "ca", "fr", "en", "pl"];
const load = (l) => JSON.parse(readFileSync(new URL(`../messages/${l}.json`, import.meta.url), "utf8"));
const flatten = (obj, prefix = "") =>
  Object.entries(obj).flatMap(([k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k;
    return v && typeof v === "object" ? flatten(v, key) : [[key, v]];
  });

const base = new Map(flatten(load("es")));
// Claves que pueden coincidir legítimamente entre idiomas (nombre de marca)
const SAME_OK = new Set(["meta.siteName", "meta.titleTemplate"]);
let errors = 0;
for (const l of locales) {
  const map = new Map(flatten(load(l)));
  for (const k of base.keys()) if (!map.has(k)) { console.error(`[${l}] falta: ${k}`); errors++; }
  for (const k of map.keys()) if (!base.has(k)) { console.error(`[${l}] sobra: ${k}`); errors++; }
  for (const [k, v] of map) if (typeof v === "string" && !v.trim()) { console.error(`[${l}] vacío: ${k}`); errors++; }
  if (l !== "es") {
    const same = [...map].filter(([k, v]) => typeof v === "string" && v.length > 25 && !SAME_OK.has(k) && base.get(k) === v).map(([k]) => k);
    if (same.length) { console.error(`[${l}] ${same.length} textos idénticos al español (¿sin traducir?), p. ej. ${same.slice(0, 3).join(", ")}`); errors++; }
  }
}
if (errors) { console.error(`\n✖ ${errors} problema(s) de traducción`); process.exit(1); }
console.log(`✔ Traducciones completas: ${locales.join(", ")} (${base.size} claves)`);
