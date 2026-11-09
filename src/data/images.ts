/**
 * Registro centralizado de fotografías.
 *
 * Para sustituir una foto provisional por una definitiva:
 *   1. Copia el archivo (WebP/AVIF/JPG, mín. 1600 px de ancho) en /public/images/<carpeta>/.
 *   2. Cambia `src`, `width`, `height`, `source`, `author`, `license` y `status: "final"` aquí.
 *   3. Revisa el texto alternativo en messages/<idioma>.json → "images.<id>".
 * No hace falta tocar ningún componente ni página.
 *
 * Licencias: todas las fotos provisionales proceden de images.unsplash.com (CDN de Unsplash).
 * Las imágenes servidas desde ese dominio están bajo la Unsplash License (uso comercial permitido,
 * atribución no obligatoria — https://unsplash.com/license). Las de pago (Unsplash+) se sirven desde
 * otro dominio (plus.unsplash.com) y NO se han utilizado.
 * El nombre del autor no se pudo leer desde el entorno de desarrollo: queda pendiente de anotar
 * abriendo `sourceUrl` antes de publicar (ver checklist). No se ha inventado ningún autor.
 *
 * Ninguna de estas fotografías muestra instalaciones, productos o personal de la empresa.
 */

export type ImageStatus = "provisional" | "final";

export type SiteImage = {
  src: string;
  width: number;
  height: number;
  /** Banco o propietario de la imagen */
  source: string;
  /** URL de origen exacta (para verificar autor y licencia) */
  sourceUrl: string;
  author: string | null;
  license: string;
  status: ImageStatus;
};

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;
const UNSPLASH_LICENSE = "Unsplash License (https://unsplash.com/license)";

function img(src: string, width: number, height: number, unsplashId: string): SiteImage {
  return {
    src,
    width,
    height,
    source: "Unsplash",
    sourceUrl: unsplash(unsplashId),
    author: null,
    license: UNSPLASH_LICENSE,
    status: "provisional",
  };
}

export const images = {
  heroMarket: img("/images/hero/mercado-frutas-hortalizas.webp", 2400, 1600, "1488459716781-31db52582fe9"),
  mandarinTree: img("/images/hero/mandarino-campo.webp", 2000, 1333, "1597714026720-8f74c62310ba"),
  artichokes: img("/images/products/alcachofas-caja.webp", 1600, 1042, "1518735869015-566a18eae4be"),
  melon: img("/images/products/melon.webp", 1600, 2133, "1571575173700-afb9492e6a50"),
  eggplant: img("/images/products/berenjena.webp", 1600, 1200, "1615484477201-9f4953340fab"),
  mandarins: img("/images/products/mandarinas.webp", 1600, 2400, "1547514701-42782101795e"),
  citrusPile: img("/images/products/citricos-pila.webp", 1600, 2133, "1611080626919-7cf5a9dbab5b"),
  watermelon: img("/images/products/sandia.webp", 1600, 1600, "1587049352846-4a222e784d38"),
  peppers: img("/images/products/pimientos.webp", 1600, 1066, "1601648764658-cf37e8c89b70"),
  vegetableStall: img("/images/products/hortalizas-puesto.webp", 1600, 1065, "1489450278009-822e9be04dff"),
  vegetableBaskets: img("/images/products/hortalizas-cestas.webp", 1600, 1067, "1557844352-761f2565b576"),
  peachTree: img("/images/products/melocotones-arbol.webp", 1600, 2400, "1595743825637-cdafc8ad4173"),
  tomatoes: img("/images/products/tomates.webp", 1600, 1118, "1606588260160-0c4707ab7db5"),
  localCrates: img("/images/products/proximidad-cajas.webp", 1600, 1067, "1471193945509-9ad0617afabf"),
  potatoCrates: img("/images/products/patatas-cajas.webp", 1600, 1050, "1603048719539-9ecb4aa395e3"),
  mixedFruit: img("/images/company/frutas-variadas.webp", 1800, 1200, "1610832958506-aa56368176cf"),
  carrotCrate: img("/images/company/zanahorias-caja.webp", 1600, 1068, "1582515073490-39981397c445"),
  eggplantFlower: img("/images/company/flor-berenjena.webp", 1600, 1200, "1659261200833-ec8761558af7"),
  retailShelves: img("/images/mercabarna/lineal-hortalizas.webp", 1800, 1350, "1542838132-92c53300491e"),
  farmer: img("/images/producers/agricultora-campo.webp", 1800, 1200, "1589923188900-85dae523342b"),
  cropRows: img("/images/producers/cultivo-hileras.webp", 1800, 1200, "1625246333195-78d9c38ad449"),
} satisfies Record<string, SiteImage>;

export type ImageId = keyof typeof images;

/** Imagen Open Graph por defecto (1200×630) generada a partir de una foto provisional + logotipo. */
export const ogImage = { src: "/images/og/og-default.jpg", width: 1200, height: 630 };
