export type ConsentState = { analytics: boolean; date: string; v: 1 };

const KEY = "fbl-consent";
export const CONSENT_EVENT = "fbl:consent-change";
export const OPEN_CONSENT_EVENT = "fbl:open-consent";

export function readConsent(): ConsentState | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    return parsed.v === 1 ? parsed : null;
  } catch {
    return null;
  }
}

export function saveConsent(analytics: boolean) {
  const state: ConsentState = { analytics, date: new Date().toISOString(), v: 1 };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* almacenamiento no disponible: la decisión solo dura esta visita */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
}
