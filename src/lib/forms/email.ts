import "server-only";
import type { FormPayload } from "./schema";

/**
 * Envío por correo mediante la API HTTP de Resend (sin dependencias).
 * Para usar otro proveedor (SendGrid, Postmark, SMTP…), sustituir `sendWithResend`.
 */

export function emailConfig(type: FormPayload["type"]) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FORMS_FROM_EMAIL;
  const general = process.env.FORMS_TO_EMAIL;
  const specific =
    type === "buyer" ? process.env.FORMS_TO_EMAIL_BUYERS : type === "supplier" ? process.env.FORMS_TO_EMAIL_SUPPLIERS : undefined;
  const to = (specific || general || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (!apiKey || !from || to.length === 0) return null;
  return { apiKey, from, to };
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

const LABELS: Record<string, string> = {
  type: "Tipo de formulario",
  locale: "Idioma de la web",
  profile: "Perfil",
  company: "Empresa / productor",
  name: "Nombre",
  contactName: "Nombre de contacto",
  email: "Email",
  phone: "Teléfono",
  country: "País",
  countryRegion: "País y región",
  buyerType: "Tipo de comprador",
  products: "Productos de interés",
  productsOffered: "Productos ofrecidos",
  origin: "Origen",
  season: "Temporada / calendario",
  volume: "Volumen orientativo",
  volumeAvailable: "Volumen disponible",
  message: "Mensaje",
};

const TYPE_LABEL = { buyer: "Comprador", supplier: "Productor / proveedor", contact: "Contacto general" } as const;

export function buildEmail(data: FormPayload) {
  const entries = Object.entries(data).filter(
    ([k, v]) => !["website", "startedAt", "privacy"].includes(k) && v !== "" && v !== undefined,
  );
  const who = "company" in data && data.company ? data.company : "name" in data ? data.name : data.contactName;
  const country = data.type === "buyer" ? data.country : data.type === "supplier" ? data.countryRegion : "";
  const subject = `[Web · ${TYPE_LABEL[data.type]} · ${data.locale.toUpperCase()}] ${who}${country ? ` (${country})` : ""}`;
  const text = entries.map(([k, v]) => `${LABELS[k] ?? k}: ${String(v)}`).join("\n");
  const html = `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${entries
    .map(
      ([k, v]) =>
        `<tr><td style="color:#555;vertical-align:top;white-space:nowrap"><strong>${esc(LABELS[k] ?? k)}</strong></td><td style="white-space:pre-wrap">${esc(String(v))}</td></tr>`,
    )
    .join("")}</table><p style="font-family:Arial,sans-serif;font-size:12px;color:#777">Enviado desde el formulario web. Responde directamente a este correo para contestar al remitente.</p>`;
  return { subject, text, html, replyTo: data.email };
}

export async function sendWithResend(cfg: NonNullable<ReturnType<typeof emailConfig>>, mail: ReturnType<typeof buildEmail>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: cfg.from,
      to: cfg.to,
      reply_to: mail.replyTo,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Resend HTTP ${res.status}`);
}
