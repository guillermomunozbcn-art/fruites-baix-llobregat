import type { ImageId } from "./images";

/**
 * Catálogo orientativo. El surtido real varía según temporada, campaña y proveedores.
 *
 * Añadir un producto:
 *   1. Añade un objeto a `products` (id único, categoría, imagen del registro `images.ts`).
 *   2. Añade sus textos en los 5 archivos messages/<idioma>.json → "products.items.<id>"
 *      (name, tag, description, season). `npm run check:i18n` avisa si falta alguno.
 * Retirar un producto: elimina su objeto (y, opcionalmente, sus textos) o pon `visible: false`.
 *
 * No publicar precios, calibres, variedades ni disponibilidades no confirmadas.
 */

export const categoryIds = ["seasonal", "citrus", "melons", "vegetables", "local", "specialties"] as const;
export type CategoryId = (typeof categoryIds)[number];

export type Category = { id: CategoryId; image: ImageId };

export const categories: Category[] = [
  { id: "seasonal", image: "peachTree" },
  { id: "citrus", image: "citrusPile" },
  { id: "melons", image: "watermelon" },
  { id: "vegetables", image: "vegetableBaskets" },
  { id: "local", image: "localCrates" },
  { id: "specialties", image: "mixedFruit" },
];

export type Product = {
  id: string;
  category: CategoryId;
  image: ImageId;
  /** Producto destacado (portada y bloque principal de la página de productos) */
  featured: boolean;
  visible: boolean;
};

export const products: Product[] = [
  // Destacados mencionados por la empresa
  { id: "artichoke", category: "local", image: "artichokes", featured: true, visible: true },
  { id: "mandarin", category: "citrus", image: "mandarins", featured: true, visible: true },
  { id: "melon", category: "melons", image: "melon", featured: true, visible: true },
  { id: "eggplant", category: "vegetables", image: "eggplant", featured: true, visible: true },
  // Referencias de hortaliza citadas en la ficha pública AGEM
  { id: "pepper", category: "vegetables", image: "peppers", featured: false, visible: true },
  { id: "zucchini", category: "vegetables", image: "vegetableStall", featured: false, visible: true },
];

export const visibleProducts = products.filter((p) => p.visible);
export const featuredProducts = visibleProducts.filter((p) => p.featured);
