import { useTranslations } from "next-intl";
import type { Product } from "@/data/products";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "../ui/Icons";
import { SiteImage } from "../ui/SiteImage";

/** Tarjeta editorial de producto para la portada. */
export function ProductTile({ product, index, tall = false }: { product: Product; index: number; tall?: boolean }) {
  const t = useTranslations("products.items");
  return (
    <Link
      href={{ pathname: "/productos", hash: product.id }}
      className="zoom-on-hover group relative block overflow-hidden rounded-[1.5rem] bg-forest"
    >
      <div className={`relative aspect-[4/5] sm:aspect-[4/5] lg:aspect-auto ${tall ? "lg:h-[36rem]" : "lg:h-[30rem]"}`}>
        <SiteImage id={product.image} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-forest-deep/10 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-ivory sm:p-7">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ochre">
            {String(index + 1).padStart(2, "0")} · {t(`${product.id}.tag`)}
          </p>
          <h3 className="mt-2 text-[1.75rem] leading-tight sm:text-3xl">{t(`${product.id}.name`)}</h3>
        </div>
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-ivory/40 transition-colors group-hover:bg-ivory group-hover:text-forest">
          <ArrowUpRight />
        </span>
      </div>
    </Link>
  );
}
