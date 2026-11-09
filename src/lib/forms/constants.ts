/** Constantes compartidas cliente/servidor (sin dependencias, para no cargar zod en el navegador). */
export const buyerTypes = ["wholesaler", "distributor", "supermarket", "foodCompany", "international", "foodservice", "other"] as const;
export const profiles = ["buyer", "supplier", "other"] as const;
export type FormType = "buyer" | "supplier" | "contact";
