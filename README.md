# Fruites del Baix Llobregat — web corporativa

Web corporativa multilingüe (ES · CA · FR · EN · PL) de **Fruites del Baix Llobregat, S.L.**, comercio mayorista de frutas y hortalizas en Mercabarna (Barcelona).

- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript estricto · Tailwind CSS 4 · next-intl 4 · zod (solo servidor)
- **Despliegue:** Vercel (nativo de Next.js), versionado en GitHub
- **Sin base de datos, sin carrito, sin precios.** Contenidos y traducciones en archivos del repositorio.

> ⚠️ **Antes de publicar en producción**, revisa [`docs/CHECKLIST-PUBLICACION.md`](docs/CHECKLIST-PUBLICACION.md): hay datos de la empresa, textos legales y fotografías que deben confirmarse.

---

## Índice

1. [Ejecutar en local](#1-ejecutar-en-local)
2. [Estructura del proyecto](#2-estructura-del-proyecto)
3. [Editar traducciones y textos](#3-editar-traducciones-y-textos)
4. [Modificar productos](#4-modificar-productos)
5. [Sustituir fotografías y logotipo](#5-sustituir-fotografías-y-logotipo)
6. [Datos de la empresa](#6-datos-de-la-empresa)
7. [Configurar los formularios](#7-configurar-los-formularios)
8. [Analítica, consentimiento y buscadores](#8-analítica-consentimiento-y-buscadores)
9. [GitHub: repositorio y flujo de trabajo](#9-github-repositorio-y-flujo-de-trabajo)
10. [Desplegar en Vercel](#10-desplegar-en-vercel)
11. [Conectar el dominio](#11-conectar-el-dominio)
12. [Revisar el SEO](#12-revisar-el-seo)
13. [Comprobaciones de calidad](#13-comprobaciones-de-calidad)

---

## 1. Ejecutar en local

Requisitos: **Node.js ≥ 20.9** (recomendado 22, ver `.nvmrc`) y npm.

```bash
npm install
cp .env.example .env.local   # opcional en local
npm run dev                  # http://localhost:3000 → redirige a /es
```

Build de producción local:

```bash
npm run build && npm start
```

> En local la web siempre se sirve con `noindex` (es intencionado, ver §12).

## 2. Estructura del proyecto

```text
├── messages/                 # Traducciones (es, ca, fr, en, pl) — TODOS los textos visibles
├── public/
│   ├── brand/                # Logotipo (provisional, ver §5)
│   └── images/               # Fotografías (hero, products, company, mercabarna, producers, og)
├── scripts/
│   ├── check-i18n.mjs        # Verifica que los 5 idiomas tienen las mismas claves
│   └── fetch-images.mjs      # Regenera las fotos provisionales desde Unsplash
├── src/
│   ├── app/
│   │   ├── [locale]/         # Páginas (carpeta = ruta interna; URL pública localizada)
│   │   │   ├── page.tsx               Inicio
│   │   │   ├── empresa/               Empresa
│   │   │   ├── productos/             Productos
│   │   │   ├── profesionales/         Para profesionales (+ formulario compradores)
│   │   │   ├── proveedores/           Productores y proveedores (+ formulario)
│   │   │   ├── contacto/              Contacto (+ formulario general y mapa)
│   │   │   └── aviso-legal/ privacidad/ cookies/
│   │   ├── api/forms/route.ts  # Envío de formularios (validación, antispam, rate limit, email)
│   │   ├── sitemap.ts · robots.ts · icon.png · apple-icon.png
│   ├── components/           # layout, home, products, forms, consent, contact, seo, ui
│   ├── config/site.ts        # URL pública, indexación, IDs de analítica
│   ├── data/                 # company.ts · products.ts · images.ts  ← contenido editable
│   ├── i18n/                 # routing (URLs por idioma), navigation, request
│   ├── lib/                  # seo, structured-data, forms, analytics, consent
│   ├── proxy.ts              # Middleware de idioma (next-intl)
│   └── styles/globals.css    # Paleta y tipografía (tokens de marca)
└── docs/                     # Checklist de publicación, SEO, benchmark
```

### URLs por idioma

Cada página tiene URL propia y localizada (definidas en `src/i18n/routing.ts`):

| Página | ES | CA | FR | EN | PL |
|---|---|---|---|---|---|
| Inicio | `/es` | `/ca` | `/fr` | `/en` | `/pl` |
| Empresa | `/es/empresa` | `/ca/empresa` | `/fr/entreprise` | `/en/company` | `/pl/o-firmie` |
| Productos | `/es/productos` | `/ca/productes` | `/fr/produits` | `/en/products` | `/pl/produkty` |
| Profesionales | `/es/profesionales` | `/ca/professionals` | `/fr/acheteurs-professionnels` | `/en/wholesale-buyers` | `/pl/dla-firm` |
| Proveedores | `/es/productores-proveedores` | `/ca/productors-proveidors` | `/fr/producteurs-fournisseurs` | `/en/growers-suppliers` | `/pl/producenci-dostawcy` |
| Contacto | `/es/contacto` | `/ca/contacte` | `/fr/contact` | `/en/contact` | `/pl/kontakt` |

La raíz `/` redirige al idioma del navegador (o a `/es`). El selector de idioma conserva la página equivalente.

## 3. Editar traducciones y textos

Todos los textos están en `messages/<idioma>.json` con la **misma estructura** en los cinco archivos:

- `meta.*` → títulos y meta descriptions de cada página (SEO)
- `nav.*`, `footer.*`, `common.*` → navegación y elementos comunes
- `home.*`, `company.*`, `products.*`, `professionals.*`, `suppliers.*`, `contact.*` → contenido de cada página
- `forms.*` → etiquetas, ayudas y mensajes de error de los formularios
- `legal.*` → textos legales (pendientes de revisión jurídica)
- `images.*` → texto alternativo (alt) de cada fotografía

Tras editar, ejecuta:

```bash
npm run check:i18n
```

Avisa si falta alguna clave, sobra alguna, está vacía o parece no traducida.

## 4. Modificar productos

Archivo: `src/data/products.ts`.

**Añadir un producto**

1. Añade un objeto a `products`:
   ```ts
   { id: "tomato", category: "vegetables", image: "tomatoes", featured: false, visible: true },
   ```
2. Añade sus textos en los 5 `messages/*.json` → `products.items.tomato` (`name`, `tag`, `description`, `season`).
3. `npm run check:i18n`.

**Retirar un producto:** pon `visible: false` (o elimina el objeto).
**Destacarlo en portada:** `featured: true` (el diseño de portada está pensado para 4 destacados).
**Categorías:** `categories` en el mismo archivo + textos en `products.categories.<id>`.

No publiques precios, calibres, variedades ni disponibilidades no confirmadas.

## 5. Sustituir fotografías y logotipo

### Fotografías

Todas las fotos se gestionan desde **`src/data/images.ts`**. Para cambiar una:

1. Copia la nueva imagen en `public/images/<carpeta>/` (WebP o JPG, ≥ 1600 px de ancho; Next.js genera AVIF/WebP y tamaños responsive automáticamente).
2. En `images.ts` actualiza `src`, `width`, `height`, `source`, `author`, `license` y pon `status: "final"`.
3. Ajusta el texto alternativo en `messages/*.json → images.<id>`.

No hace falta tocar componentes ni páginas.

Las fotos actuales son **provisionales** (Unsplash License). Ver estado y pendientes en el checklist.

### Logotipo

`public/brand/` contiene recortes **fieles** del logotipo original publicado en la ficha de AGEM (solo se ha eliminado el fondo y separado símbolo y denominación; no se ha redibujado nada):

| Archivo | Uso |
|---|---|
| `logo-original-agem.jpg` | Original de referencia (285×180 px) |
| `logo-full.png` | Logo completo (pie, Open Graph, datos estructurados) |
| `logo-symbol.png` + `logo-wordmark.png` | Composición horizontal de la cabecera |

La resolución de origen es baja. **Es imprescindible obtener el logotipo en vectorial (SVG/AI/PDF)** y sustituir estos archivos (mismos nombres) antes de producción. El componente es `src/components/layout/Logo.tsx`. Los iconos `src/app/icon.png` y `apple-icon.png` se generaron a partir del símbolo.

### Paleta

Tokens en `src/styles/globals.css` (`--color-forest`, `--color-ivory`, `--color-sage`, `--color-ochre`, `--color-graphite`, `--color-leaf`…). Tipografías: Fraunces (titulares) e Inter (texto), servidas localmente por `next/font`.

## 6. Datos de la empresa

`src/data/company.ts` centraliza nombre, dirección, puestos, teléfono, email, enlace a Google Maps y datos legales. Cada dato no confirmado tiene `verification.* = false`. Los datos legales con valor `null` (NIF, registro…) **no se muestran**.

Cuando los textos legales estén revisados, pon `legal.reviewed: true`: las páginas legales pasarán a ser indexables y entrarán en el sitemap.

## 7. Configurar los formularios

Hay tres formularios: **compradores** (`/profesionales`), **productores/proveedores** (`/proveedores`) y **contacto general** (`/contacto`, con selector comprador/proveedor/otro).

Todos envían a `POST /api/forms`, que:

- valida en servidor con zod (además de la validación accesible en cliente),
- filtra spam (campo trampa *honeypot* + tiempo mínimo de rellenado),
- limita a 5 envíos / 10 min por IP (en memoria; ver nota),
- comprueba el origen de la petición,
- **no guarda** los mensajes: los reenvía por email,
- si el correo **no está configurado**, responde `503` y la web muestra un aviso con teléfono y email. **Nunca simula un envío correcto.**

### Activar el envío (Resend)

1. Crea una cuenta en [resend.com](https://resend.com) (requiere autorización de la empresa).
2. Verifica el dominio de envío (registros SPF/DKIM que indique Resend — **añadir sin tocar los MX ni los registros de correo existentes**).
3. En Vercel → Settings → Environment Variables (Production y, si se desea, Preview):

   | Variable | Ejemplo |
   |---|---|
   | `RESEND_API_KEY` | `re_…` (secreto) |
   | `FORMS_FROM_EMAIL` | `Web Fruites <web@fruitesbaixllobregat.com>` |
   | `FORMS_TO_EMAIL` | *dirección confirmada por la empresa* |
   | `FORMS_TO_EMAIL_BUYERS` / `FORMS_TO_EMAIL_SUPPLIERS` | opcionales |

4. Redeploy. Cada solicitud llega con asunto `[Web · Comprador · FR] Empresa (País)` y *Reply-To* del remitente.

Otro proveedor (SendGrid, Postmark, SMTP): sustituir `sendWithResend` en `src/lib/forms/email.ts`.
**CRM futuro:** el punto de integración es el mismo `route.ts` (tras validar `data`).
**Rate limiting en producción:** complementar con reglas de Vercel Firewall o Upstash Redis si hay abuso.

## 8. Analítica, consentimiento y buscadores

| Variable | Efecto |
|---|---|
| `NEXT_PUBLIC_GA_ID` | Activa GA4. Aparece el aviso de cookies (Aceptar/Rechazar con igual prominencia) y GA **solo se carga tras aceptar**. Sin esta variable no hay cookies no esenciales ni aviso. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Meta de verificación de Google Search Console |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Meta de verificación de Bing Webmaster Tools |

**Conversiones:** cada envío correcto dispara el evento GA4 `generate_lead` con `form_type` (buyer/supplier/contact), `locale`, `country` y `buyer_type`, lo que permite medir captación por idioma y mercado. Márcalo como *evento clave* en GA4.

Search Console / Bing: preferible verificación por **DNS (TXT)** del dominio; después, enviar `https://<dominio>/sitemap.xml`.

## 9. GitHub: repositorio y flujo de trabajo

Repositorio propuesto: **`fruites-baix-llobregat`** (privado). Rama de producción: **`main`**.

Si el repositorio aún no existe:

```bash
gh repo create fruites-baix-llobregat --private --source=. --remote=origin
```

```bash
git push -u origin main
```

Flujo de trabajo:

```text
rama feature/… → Pull Request → Preview de Vercel → revisión → merge a main → Producción
```

```bash
git checkout -b feature/nombre-del-cambio
```

```bash
git push -u origin feature/nombre-del-cambio
```

```bash
gh pr create --fill
```

Recomendado en GitHub → Settings → Branches: proteger `main` (requerir PR y que el check de Vercel pase).

**Nunca** subir `.env.local` ni claves (ya excluidos en `.gitignore`).

## 10. Desplegar en Vercel

1. [vercel.com/new](https://vercel.com/new) → *Import Git Repository* → `fruites-baix-llobregat`.
2. Framework: **Next.js** (autodetectado). Build: `next build`. No requiere `vercel.json`.
3. **Production Branch:** `main` (Settings → Git). Cada PR genera automáticamente un **Preview Deployment**.
4. **Environment Variables** (Settings → Environment Variables):

   | Variable | Production | Preview |
   |---|---|---|
   | `NEXT_PUBLIC_SITE_URL` | `https://www.fruitesbaixllobregat.com` (dominio definitivo) | *(vacía: usa la URL de Vercel)* |
   | `NEXT_PUBLIC_ALLOW_INDEXING` | `true` **solo cuando el dominio definitivo esté conectado** | `false` |
   | Formularios / analítica | según §7 y §8 | opcional |

5. Deploy.

**Protección de indexación (ya implementada):**
- Solo se indexa si `VERCEL_ENV=production` **y** `NEXT_PUBLIC_ALLOW_INDEXING=true`.
- Previews y local: `robots.txt` bloquea todo, `<meta name="robots" content="noindex">` y cabecera `X-Robots-Tag: noindex`.
- Cualquier host `*.vercel.app` recibe siempre `X-Robots-Tag: noindex`, incluso en producción.
- Recomendado también: Settings → Deployment Protection → proteger Previews.

## 11. Conectar el dominio

> El dominio `fruitesbaixllobregat.com` aparece públicamente asociado a la empresa, pero **no se ha verificado su propiedad ni su estado** (no respondía al revisarlo). Confirmar quién lo administra antes de tocar nada.

1. Vercel → Project → Settings → Domains → añadir `www.fruitesbaixllobregat.com` y `fruitesbaixllobregat.com` (redirigir el apex a `www` o viceversa).
2. En el proveedor DNS, **añadir solo** los registros que indique Vercel (normalmente `A 76.76.21.21` para el apex y `CNAME cname.vercel-dns.com` para `www`).
3. ⚠️ **No modificar ni eliminar** registros `MX`, `SPF (TXT)`, `DKIM`, `DMARC` ni otros existentes: el correo `info@…` depende de ellos. No cambiar los nameservers sin revisar antes toda la zona.
4. HTTPS: Vercel emite el certificado automáticamente.
5. Actualizar `NEXT_PUBLIC_SITE_URL` al dominio definitivo y poner `NEXT_PUBLIC_ALLOW_INDEXING=true` en Production → Redeploy.
6. Si existía una web antigua con otras URLs, añadir redirecciones 301 en `next.config.ts → redirects()`.

## 12. Revisar el SEO

Implementado:

- Renderizado estático (SSG) de las 45 páginas (9 × 5 idiomas)
- `title` y `meta description` únicos y localizados por página (`messages/*.json → meta`)
- Canonical autorreferencial y `hreflang` (es, ca, fr, en, pl + `x-default` → español) en cada página
- `sitemap.xml` multilingüe con alternativas `xhtml:link`
- `robots.txt` dependiente del entorno
- Open Graph y Twitter Cards localizados; imagen OG 1200×630
- Schema.org: `Organization`, `WholesaleStore` (LocalBusiness), `WebSite`, `ContactPoint`, `BreadcrumbList` (sin reseñas, ratings ni datos inventados)
- Un único `H1` por página, migas de pan, enlazado interno, alt localizado
- `next/image` con AVIF/WebP, `sizes` responsive, carga diferida y prioridad en el hero

Cómo revisarlo:

```bash
npm run build && npm start
```

```bash
curl -s http://localhost:3000/sitemap.xml | head -40
```

- Ver código fuente de cualquier página: `<link rel="canonical">`, `<link rel="alternate" hreflang>`, `og:*`, `application/ld+json`.
- Tras publicar: [Rich Results Test](https://search.google.com/test/rich-results), PageSpeed Insights, informe de *Segmentación internacional* y *Páginas* en Search Console.

Palabras clave objetivo por idioma: ver [`docs/SEO.md`](docs/SEO.md).

## 13. Comprobaciones de calidad

```bash
npm run check   # i18n + lint + typecheck + build
```

Accesibilidad (referencia WCAG 2.2 AA): enlace "saltar al contenido", foco visible, navegación por teclado (incluido menú móvil con Escape y foco atrapado), formularios con etiquetas, errores asociados con `aria-describedby` y anunciados, contraste AA de la paleta, `prefers-reduced-motion` respetado.
