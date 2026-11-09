/**
 * Medición de conversiones. Solo envía eventos si GA4 está configurado y el usuario ha aceptado
 * las cookies analíticas (gtag solo existe en ese caso).
 */
type Gtag = (...args: unknown[]) => void;

export function trackEvent(name: string, params: Record<string, string | number | undefined> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", name, params);
}
