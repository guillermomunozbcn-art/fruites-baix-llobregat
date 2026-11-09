"use client";

import { useLocale, useTranslations } from "next-intl";
import { type FormEvent, type ReactNode, useEffect, useId, useRef, useState } from "react";
import { company } from "@/data/company";
import { Link } from "@/i18n/navigation";
import { trackEvent } from "@/lib/analytics";
import { buyerTypes, type FormType, profiles } from "@/lib/forms/constants";
import { ArrowRight, CheckIcon } from "../ui/Icons";

type FieldDef =
  | { name: string; label: string; kind: "text" | "email" | "tel"; required?: boolean; max: number; placeholder?: string; autoComplete?: string; half?: boolean }
  | { name: string; label: string; kind: "textarea"; required?: boolean; max: number; placeholder?: string; rows?: number }
  | { name: string; label: string; kind: "select"; required?: boolean; options: { value: string; label: string }[]; placeholder: string; half?: boolean }
  | { name: string; label: string; kind: "radio"; required?: boolean; options: { value: string; label: string }[] };

type Status = "idle" | "submitting" | "success" | "error";

export function LeadForm({ type, id }: { type: FormType; id?: string }) {
  const t = useTranslations("forms");
  const locale = useLocale();
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef<number>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string>("");

  useEffect(() => {
    startedAt.current = Date.now();
    // Prefill de producto desde la página de productos (?product=…)
    const product = new URLSearchParams(window.location.search).get("product");
    if (product && formRef.current) {
      const el = formRef.current.elements.namedItem(type === "supplier" ? "productsOffered" : "products");
      if (el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement) el.value = product.slice(0, 120);
    }
  }, [type]);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const f = (k: string) => t(`fields.${k}`);
  const ph = (k: string) => t(`placeholders.${k}`);

  const fields: FieldDef[] =
    type === "buyer"
      ? [
          { name: "company", label: f("company"), kind: "text", required: true, max: 160, autoComplete: "organization", half: true },
          { name: "name", label: f("name"), kind: "text", required: true, max: 120, autoComplete: "name", half: true },
          { name: "email", label: f("email"), kind: "email", required: true, max: 160, autoComplete: "email", half: true },
          { name: "phone", label: f("phone"), kind: "tel", max: 40, autoComplete: "tel", half: true },
          { name: "country", label: f("country"), kind: "text", required: true, max: 80, autoComplete: "country-name", half: true },
          {
            name: "buyerType",
            label: f("buyerType"),
            kind: "select",
            required: true,
            placeholder: t("buyerTypes.placeholder"),
            options: buyerTypes.map((b) => ({ value: b, label: t(`buyerTypes.${b}`) })),
            half: true,
          },
          { name: "products", label: f("products"), kind: "text", required: true, max: 500, placeholder: ph("products"), half: true },
          { name: "volume", label: f("volume"), kind: "text", max: 200, placeholder: ph("volume"), half: true },
          { name: "message", label: f("message"), kind: "textarea", max: 3000, rows: 5 },
        ]
      : type === "supplier"
        ? [
            { name: "company", label: f("companyOrProducer"), kind: "text", required: true, max: 160, autoComplete: "organization", half: true },
            { name: "contactName", label: f("contactName"), kind: "text", required: true, max: 120, autoComplete: "name", half: true },
            { name: "countryRegion", label: f("countryRegion"), kind: "text", required: true, max: 120, placeholder: ph("countryRegion"), half: true },
            { name: "origin", label: f("origin"), kind: "text", required: true, max: 200, placeholder: ph("origin"), half: true },
            { name: "productsOffered", label: f("productsOffered"), kind: "text", required: true, max: 500, placeholder: ph("productsOffered"), half: true },
            { name: "season", label: f("season"), kind: "text", max: 200, placeholder: ph("season"), half: true },
            { name: "volumeAvailable", label: f("volumeAvailable"), kind: "text", max: 200, placeholder: ph("volumeAvailable"), half: true },
            { name: "email", label: f("email"), kind: "email", required: true, max: 160, autoComplete: "email", half: true },
            { name: "phone", label: f("phone"), kind: "tel", max: 40, autoComplete: "tel", half: true },
            { name: "message", label: f("message"), kind: "textarea", max: 3000, rows: 5 },
          ]
        : [
            {
              name: "profile",
              label: f("profile"),
              kind: "radio",
              required: true,
              options: profiles.map((p) => ({ value: p, label: t(`profiles.${p}`) })),
            },
            { name: "name", label: f("name"), kind: "text", required: true, max: 120, autoComplete: "name", half: true },
            { name: "company", label: f("company"), kind: "text", max: 160, autoComplete: "organization", half: true },
            { name: "email", label: f("email"), kind: "email", required: true, max: 160, autoComplete: "email", half: true },
            { name: "phone", label: f("phone"), kind: "tel", max: 40, autoComplete: "tel", half: true },
            { name: "message", label: f("message"), kind: "textarea", required: true, max: 3000, rows: 6 },
          ];

  function validate(form: HTMLFormElement): Record<string, string> {
    const errs: Record<string, string> = {};
    for (const def of fields) {
      const el = form.elements.namedItem(def.name);
      if (def.kind === "radio") {
        const checked = form.querySelector(`input[name="${def.name}"]:checked`);
        if (def.required && !checked) errs[def.name] = t("errors.required");
        continue;
      }
      if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement)) continue;
      const v = el.value.trim();
      if (def.required && !v) errs[def.name] = t("errors.required");
      else if (def.kind === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) errs[def.name] = t("errors.email");
      else if ("max" in def && v.length > def.max) errs[def.name] = t("errors.tooLong");
    }
    const privacy = form.elements.namedItem("privacy");
    if (privacy instanceof HTMLInputElement && !privacy.checked) errs.privacy = t("errors.privacy");
    return errs;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setServerError("");
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const fd = new FormData(form);
    const payload: Record<string, unknown> = { type, locale, startedAt: startedAt.current, privacy: fd.get("privacy") === "on" };
    for (const [k, v] of fd.entries()) if (k !== "privacy") payload[k] = typeof v === "string" ? v : "";

    setStatus("submitting");
    try {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("success");
        trackEvent("generate_lead", {
          form_type: type,
          locale,
          country: String(payload.country ?? payload.countryRegion ?? ""),
          buyer_type: String(payload.buyerType ?? payload.profile ?? ""),
        });
        return;
      }
      const body = (await res.json().catch(() => ({}))) as { error?: string; fields?: string[] };
      setStatus("error");
      if (body.error === "validation" && body.fields?.length) {
        setErrors(Object.fromEntries(body.fields.map((k) => [k, k === "email" ? t("errors.email") : t("errors.required")])));
        setServerError(t("errors.summary"));
      } else if (body.error === "not_configured") {
        setServerError(t("errors.notConfigured", { email: company.email, phone: company.phone.display }));
      } else if (body.error === "rate_limited") {
        setServerError(t("errors.rateLimited"));
      } else {
        setServerError(t("errors.generic", { email: company.email }));
      }
    } catch {
      setStatus("error");
      setServerError(t("errors.generic", { email: company.email }));
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-[1.5rem] border border-forest/15 bg-paper p-8 outline-none sm:p-10"
      >
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-forest text-ivory">
          <CheckIcon />
        </span>
        <h3 className="mt-6 text-3xl text-forest">{t("success.title")}</h3>
        <p className="mt-3 max-w-lg text-stone">{t("success.body")}</p>
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form
      ref={formRef}
      id={id}
      noValidate
      onSubmit={onSubmit}
      onInput={(e) => {
        const name = (e.target as HTMLInputElement).name;
        if (name && errors[name])
          setErrors((prev) => {
            const next = { ...prev };
            delete next[name];
            return next;
          });
      }}
      aria-describedby={hasErrors || serverError ? `${formId}-summary` : undefined}
      className="rounded-[1.5rem] border border-forest/10 bg-paper p-6 shadow-[0_30px_80px_-50px_rgba(16,41,31,0.45)] sm:p-10"
    >
      <div id={`${formId}-summary`} aria-live="assertive" className="empty:hidden">
        {(hasErrors || serverError) && (
          <p role="alert" className="mb-6 rounded-xl border border-[#b3261e]/30 bg-[#b3261e]/5 px-4 py-3 text-sm text-[#8c1d18]">
            {serverError || t("errors.summary")}
          </p>
        )}
      </div>

      <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
        {fields.map((def) => (
          <Field key={def.name} def={def} formId={formId} error={errors[def.name]} t={t} />
        ))}
      </div>

      {/* Honeypot antispam: oculto a usuarios y lectores de pantalla */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${formId}-website`}>{t("honeypot")}</label>
        <input id={`${formId}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="mt-7">
        <div className="flex items-start gap-3">
          <input
            id={`${formId}-privacy`}
            name="privacy"
            type="checkbox"
            aria-invalid={errors.privacy ? true : undefined}
            aria-describedby={errors.privacy ? `${formId}-privacy-error` : undefined}
            className="mt-1 size-5 shrink-0 cursor-pointer accent-forest"
          />
          <label htmlFor={`${formId}-privacy`} className="text-sm leading-relaxed text-stone">
            {t.rich("privacy", {
              link: (chunks: ReactNode) => (
                <Link href="/privacidad" className="font-medium text-forest underline underline-offset-2" target="_blank">
                  {chunks}
                </Link>
              ),
            })}{" "}
            <span aria-hidden className="text-ochre-ink">*</span>
          </label>
        </div>
        {errors.privacy && (
          <p id={`${formId}-privacy-error`} className="mt-2 text-sm text-[#8c1d18]">
            {errors.privacy}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-8 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-forest px-7 py-3 font-medium text-ivory transition-colors hover:bg-forest-deep disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? t("submitting") : t("submit")}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
}

function Field({
  def,
  formId,
  error,
  t,
}: {
  def: FieldDef;
  formId: string;
  error?: string;
  t: ReturnType<typeof useTranslations<"forms">>;
}) {
  const id = `${formId}-${def.name}`;
  const errId = `${id}-error`;
  const full = def.kind === "textarea" || def.kind === "radio" || !("half" in def && def.half);
  const inputCls = `mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-[0.98rem] text-graphite placeholder:text-stone/60 transition-colors focus:border-forest focus:outline-none focus-visible:outline-2 focus-visible:outline-ochre ${
    error ? "border-[#b3261e]" : "border-forest/20 hover:border-forest/40"
  }`;
  const label = (
    <>
      {def.label}
      {def.required ? (
        <span className="text-ochre-ink"> *<span className="sr-only"> ({t("required")})</span></span>
      ) : (
        <span className="font-normal text-stone"> ({t("optional")})</span>
      )}
    </>
  );
  const describedBy = error ? errId : undefined;

  return (
    <div className={full ? "sm:col-span-2" : ""}>
      {def.kind === "radio" ? (
        <fieldset aria-describedby={describedBy}>
          <legend className="text-sm font-medium text-graphite">{label}</legend>
          <div className="mt-3 flex flex-wrap gap-3">
            {def.options.map((o) => (
              <label
                key={o.value}
                className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-forest/20 bg-white px-4 text-sm has-[:checked]:border-forest has-[:checked]:bg-forest has-[:checked]:text-ivory has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ochre"
              >
                <input type="radio" name={def.name} value={o.value} className="sr-only" />
                {o.label}
              </label>
            ))}
          </div>
        </fieldset>
      ) : (
        <>
          <label htmlFor={id} className="text-sm font-medium text-graphite">
            {label}
          </label>
          {def.kind === "textarea" ? (
            <textarea
              id={id}
              name={def.name}
              rows={def.rows ?? 5}
              maxLength={def.max}
              placeholder={def.placeholder}
              aria-required={def.required || undefined}
              aria-invalid={error ? true : undefined}
              aria-describedby={describedBy}
              className={`${inputCls} resize-y`}
            />
          ) : def.kind === "select" ? (
            <select
              id={id}
              name={def.name}
              defaultValue=""
              aria-required={def.required || undefined}
              aria-invalid={error ? true : undefined}
              aria-describedby={describedBy}
              className={`${inputCls} appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10`}
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23193d30' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
              }}
            >
              <option value="" disabled>
                {def.placeholder}
              </option>
              {def.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={id}
              name={def.name}
              type={def.kind}
              maxLength={def.max}
              placeholder={def.placeholder}
              autoComplete={def.autoComplete}
              inputMode={def.kind === "tel" ? "tel" : def.kind === "email" ? "email" : undefined}
              aria-required={def.required || undefined}
              aria-invalid={error ? true : undefined}
              aria-describedby={describedBy}
              className={inputCls}
            />
          )}
        </>
      )}
      {error && (
        <p id={errId} className="mt-2 text-sm text-[#8c1d18]">
          {error}
        </p>
      )}
    </div>
  );
}
