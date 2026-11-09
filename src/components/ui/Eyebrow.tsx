import type { ReactNode } from "react";

export function Eyebrow({ children, tone = "dark", className = "" }: { children: ReactNode; tone?: "dark" | "light"; className?: string }) {
  return (
    <p
      className={`flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] ${
        tone === "dark" ? "text-ochre-ink" : "text-ochre"
      } ${className}`}
    >
      <span aria-hidden className="h-px w-8 bg-current opacity-70" />
      {children}
    </p>
  );
}
