import Image from "next/image";

/**
 * Logotipo provisional: recortes fieles (sin redibujar) del logotipo original publicado en la ficha AGEM,
 * con el fondo eliminado. Se presentan símbolo y denominación en horizontal para la cabecera.
 * Sustituir por el SVG original en cuanto esté disponible (ver README → Identidad).
 */
export function Logo({ variant = "horizontal", className = "" }: { variant?: "horizontal" | "stacked"; className?: string }) {
  if (variant === "stacked") {
    return (
      <Image
        src="/brand/logo-full.png"
        alt="Fruites del Baix Llobregat, S.L."
        width={825}
        height={336}
        sizes="240px"
        className={className}
      />
    );
  }
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <Image src="/brand/logo-symbol.png" alt="" width={129} height={168} sizes="40px" className="h-10 w-auto" priority />
      <Image
        src="/brand/logo-wordmark.png"
        alt="Fruites del Baix Llobregat, S.L."
        width={801}
        height={102}
        sizes="200px"
        className="h-[19px] w-auto sm:h-[22px]"
        priority
      />
    </span>
  );
}
