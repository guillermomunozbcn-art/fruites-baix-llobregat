import type { AppPathname } from "@/i18n/routing";

export const navItems: { href: AppPathname; key: "home" | "company" | "products" | "professionals" | "suppliers" | "contact" }[] = [
  { href: "/", key: "home" },
  { href: "/empresa", key: "company" },
  { href: "/productos", key: "products" },
  { href: "/profesionales", key: "professionals" },
  { href: "/proveedores", key: "suppliers" },
  { href: "/contacto", key: "contact" },
];
