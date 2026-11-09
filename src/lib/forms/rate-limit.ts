import "server-only";

/**
 * Rate limiting en memoria por IP (por instancia serverless).
 * Suficiente como primera barrera; para tráfico alto, complementar con las reglas de
 * Vercel Firewall (WAF) o un almacén compartido (p. ej. Upstash Redis).
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX = 5;
const hits = new Map<string, { count: number; reset: number }>();

export function rateLimit(key: string): boolean {
  const now = Date.now();
  if (hits.size > 5000) for (const [k, v] of hits) if (v.reset < now) hits.delete(k);
  const entry = hits.get(key);
  if (!entry || entry.reset < now) {
    hits.set(key, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  entry.count += 1;
  return entry.count <= MAX;
}
