// Descarga y optimiza (WebP) las fotografías provisionales de Unsplash.
// Uso: node scripts/fetch-images.mjs  — solo necesario para regenerar las imágenes.
import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const list = [
  ["hero/mercado-frutas-hortalizas", "1488459716781-31db52582fe9", 2400],
  ["hero/mandarino-campo", "1597714026720-8f74c62310ba", 2000],
  ["products/alcachofas-caja", "1518735869015-566a18eae4be", 1600],
  ["products/melon", "1571575173700-afb9492e6a50", 1600],
  ["products/berenjena", "1615484477201-9f4953340fab", 1600],
  ["products/mandarinas", "1547514701-42782101795e", 1600],
  ["products/citricos-pila", "1611080626919-7cf5a9dbab5b", 1600],
  ["products/sandia", "1587049352846-4a222e784d38", 1600],
  ["products/pimientos", "1601648764658-cf37e8c89b70", 1600],
  ["products/hortalizas-puesto", "1489450278009-822e9be04dff", 1600],
  ["products/hortalizas-cestas", "1557844352-761f2565b576", 1600],
  ["products/melocotones-arbol", "1595743825637-cdafc8ad4173", 1600],
  ["products/tomates", "1606588260160-0c4707ab7db5", 1600],
  ["products/proximidad-cajas", "1471193945509-9ad0617afabf", 1600],
  ["products/patatas-cajas", "1603048719539-9ecb4aa395e3", 1600],
  ["company/frutas-variadas", "1610832958506-aa56368176cf", 1800],
  ["company/zanahorias-caja", "1582515073490-39981397c445", 1600],
  ["company/flor-berenjena", "1659261200833-ec8761558af7", 1600],
  ["mercabarna/lineal-hortalizas", "1542838132-92c53300491e", 1800],
  ["producers/agricultora-campo", "1589923188900-85dae523342b", 1800],
  ["producers/cultivo-hileras", "1625246333195-78d9c38ad449", 1800],
];

for (const [name, id, w] of list) {
  const url = `https://images.unsplash.com/photo-${id}?w=${w}&q=85&fm=jpg`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${id}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const out = await sharp(buf).webp({ quality: 76 }).toBuffer({ resolveWithObject: true });
  await writeFile(`public/images/${name}.webp`, out.data);
  console.log(name, out.info.width + "x" + out.info.height, Math.round(out.data.length / 1024) + "KB");
}
