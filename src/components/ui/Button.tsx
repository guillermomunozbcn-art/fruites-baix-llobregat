import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "./Icons";

type Variant = "primary" | "accent" | "outline" | "light" | "outline-light";

const variants: Record<Variant, string> = {
  primary: "bg-forest text-ivory hover:bg-forest-deep",
  accent: "bg-ochre text-forest-deep hover:bg-[#e3b25f]",
  outline: "border border-forest/30 text-forest hover:border-forest hover:bg-forest hover:text-ivory",
  light: "bg-ivory text-forest hover:bg-white",
  "outline-light": "border border-ivory/40 text-ivory hover:border-ivory hover:bg-ivory hover:text-forest",
};

export const buttonClass = (variant: Variant = "primary", extra = "") =>
  `group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 py-3 text-[0.95rem] font-medium tracking-[0.01em] transition-colors duration-300 ${variants[variant]} ${extra}`;

type LinkProps = ComponentProps<typeof Link> & { variant?: Variant; children: ReactNode; arrow?: boolean };

export function ButtonLink({ variant = "primary", arrow = true, className = "", children, ...props }: LinkProps) {
  return (
    <Link {...props} className={buttonClass(variant, className)}>
      <span>{children}</span>
      {arrow && <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />}
    </Link>
  );
}

export function ExternalButton({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={href} className={buttonClass(variant, className)}>
      {children}
    </a>
  );
}
