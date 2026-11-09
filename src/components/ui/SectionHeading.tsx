import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

export function SectionHeading({
  eyebrow,
  title,
  body,
  tone = "dark",
  align = "left",
  as: Tag = "h2",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  body?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  as?: "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center [&>p:first-child]:justify-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <Tag className={`mt-5 text-[2.1rem] leading-[1.08] sm:text-5xl ${tone === "dark" ? "text-forest" : "text-ivory"}`}>{title}</Tag>
      {body && <div className={`mt-6 text-lg leading-relaxed ${tone === "dark" ? "text-stone" : "text-ivory/80"}`}>{body}</div>}
    </div>
  );
}
