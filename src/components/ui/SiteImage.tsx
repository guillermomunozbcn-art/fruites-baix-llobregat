import Image from "next/image";
import { useTranslations } from "next-intl";
import { type ImageId, images } from "@/data/images";

type Props = {
  id: ImageId;
  className?: string;
  sizes: string;
  priority?: boolean;
  fill?: boolean;
  /** Texto alternativo explícito; por defecto, messages → images.<id>. Usar "" si es decorativa. */
  alt?: string;
  quality?: number;
};

/** Imagen del registro centralizado (src/data/images.ts) con alt localizado. */
export function SiteImage({ id, className, sizes, priority, fill = true, alt, quality = 75 }: Props) {
  const t = useTranslations("images");
  const img = images[id];
  const altText = alt ?? t(id);
  if (fill) {
    return (
      <Image
        src={img.src}
        alt={altText}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        className={`object-cover ${className ?? ""}`}
      />
    );
  }
  return (
    <Image
      src={img.src}
      alt={altText}
      width={img.width}
      height={img.height}
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={className}
    />
  );
}
