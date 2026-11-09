import { NextResponse } from "next/server";
import { buildEmail, emailConfig, sendWithResend } from "@/lib/forms/email";
import { rateLimit } from "@/lib/forms/rate-limit";
import { formSchema, MIN_FILL_TIME_MS } from "@/lib/forms/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });

export async function POST(request: Request) {
  // Solo peticiones del propio sitio
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return json({ error: "forbidden" }, 403);

  const len = Number(request.headers.get("content-length") ?? 0);
  if (len > 20_000) return json({ error: "too_large" }, 413);

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim() || "unknown";
  if (!rateLimit(ip)) return json({ error: "rate_limited" }, 429);

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ error: "validation" }, 400);
  }

  const parsed = formSchema.safeParse(raw);
  if (!parsed.success) {
    const fields = [...new Set(parsed.error.issues.map((i) => String(i.path[0] ?? "")))].filter(Boolean);
    // Honeypot relleno o tiempo sospechoso: respuesta neutra sin enviar nada
    if (fields.includes("website")) return json({ ok: true });
    return json({ error: "validation", fields }, 400);
  }
  const data = parsed.data;
  if (Date.now() - data.startedAt < MIN_FILL_TIME_MS) return json({ ok: true });

  const cfg = emailConfig(data.type);
  if (!cfg) {
    // Integración pendiente de credenciales: NO se simula un envío correcto
    return json({ error: "not_configured" }, 503);
  }

  try {
    await sendWithResend(cfg, buildEmail(data));
    return json({ ok: true });
  } catch (err) {
    console.error("[forms] envío fallido", err instanceof Error ? err.message : err);
    return json({ error: "send_failed" }, 502);
  }
}

export function GET() {
  return json({ error: "method_not_allowed" }, 405);
}
