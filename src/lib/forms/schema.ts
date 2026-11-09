import { z } from "zod";
import { locales } from "@/i18n/routing";
import { buyerTypes, profiles } from "./constants";

/** Limpia caracteres de control (salvo saltos de línea en textos largos). */
const clean = (max: number, multiline = false) =>
  z
    .string()
    .transform((s) => (multiline ? s.replace(/[^\P{C}\n\t]/gu, "") : s.replace(/\p{C}/gu, "")).trim())
    .pipe(z.string().max(max));

const required = (max: number, multiline = false) => clean(max, multiline).pipe(z.string().min(1));
const optional = (max: number, multiline = false) => clean(max, multiline).optional().default("");


const base = {
  locale: z.enum(locales),
  website: z.string().max(0).optional().default(""), // honeypot: debe llegar vacío
  startedAt: z.number().int().positive(),
  privacy: z.literal(true),
  email: z.string().trim().max(160).pipe(z.email()),
  phone: optional(40),
};

export const buyerSchema = z.object({
  ...base,
  type: z.literal("buyer"),
  company: required(160),
  name: required(120),
  country: required(80),
  buyerType: z.enum(buyerTypes),
  products: required(500, true),
  volume: optional(200),
  message: optional(3000, true),
});

export const supplierSchema = z.object({
  ...base,
  type: z.literal("supplier"),
  company: required(160),
  contactName: required(120),
  countryRegion: required(120),
  productsOffered: required(500, true),
  origin: required(200),
  season: optional(200),
  volumeAvailable: optional(200),
  message: optional(3000, true),
});

export const contactSchema = z.object({
  ...base,
  type: z.literal("contact"),
  profile: z.enum(profiles),
  name: required(120),
  company: optional(160),
  message: required(3000, true),
});

export const formSchema = z.discriminatedUnion("type", [buyerSchema, supplierSchema, contactSchema]);
export type FormPayload = z.infer<typeof formSchema>;

/** Tiempo mínimo (ms) entre la carga del formulario y el envío: filtra bots básicos. */
export const MIN_FILL_TIME_MS = 2500;
