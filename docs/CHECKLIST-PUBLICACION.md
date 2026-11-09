# Checklist antes de publicar en producción

Datos y decisiones que hay que **pedir o confirmar con Fruites del Baix Llobregat, S.L.** antes de activar la indexación y el dominio definitivo. Ninguno de estos elementos se muestra como placeholder en la web: lo que no está confirmado se ha omitido o se presenta de forma genérica.

## 1. Datos de empresa (`src/data/company.ts`)

| Dato | Valor actual | Fuente | Acción |
|---|---|---|---|
| Razón social | Fruites del Baix Llobregat, S.L. | Ficha AGEM | Confirmar grafía exacta |
| Inicio de actividad | 1995 ("fundada en 1995") | Ficha AGEM | Confirmar. Se usa como "trayectoria desde 1995", no como fecha legal de constitución |
| Ubicación | Mercabarna, pabellón E, 08040 Barcelona | Ficha AGEM | Confirmar |
| Puestos | 5007, 5037 y 5038 | Ficha AGEM | Confirmar números vigentes |
| Teléfono | +34 933 350 096 | Ficha AGEM | Confirmar que es el comercial |
| Email | info@fruitesbaixllobregat.com | Ficha AGEM | Confirmar que está operativo (el dominio no respondía en web) |
| Horarios | — | — | No se publican. Indicar si se quieren mostrar |
| Redes sociales | — | — | Facilitar URLs si existen |
| Enlace Google Maps | Búsqueda "Mercabarna Pabellón E" | — | Opcional: facilitar ficha de Google Business Profile si existe |

## 2. Datos legales (aviso legal y privacidad)

- [ ] **NIF/CIF** (`legal.taxId`)
- [ ] **Datos registrales**: Registro Mercantil de Barcelona, tomo, folio, hoja, inscripción (`legal.registry`)
- [ ] **Domicilio social** si difiere del comercial (`legal.registeredAddress`)
- [ ] Email para ejercicio de derechos RGPD (`legal.privacyEmail`), si difiere de info@
- [ ] ¿Hay Delegado de Protección de Datos (DPD)?
- [ ] **Revisión jurídica** de `messages/*.json → legal` (aviso legal, privacidad, cookies) en los 5 idiomas. Los textos son una base redactada, **no están aprobados jurídicamente**.
- [ ] Tras revisar: `legal.reviewed = true` (las páginas legales pasan a indexables y entran en el sitemap).

## 3. Contenido comercial

- [ ] Validar los textos de todas las páginas (tono y afirmaciones).
- [ ] **"Productos propios"**: aclarar qué significa (producción vinculada, acuerdos, marcas propias…). Ahora solo se menciona en una frase genérica en la página Empresa.
- [ ] Confirmar las temporadas orientativas de los productos destacados (`products.items.*.season`).
- [ ] Confirmar que pimiento y calabacín (citados en la ficha AGEM) siguen siendo referencias habituales.
- [ ] ¿Se trabaja también fruta del Baix Llobregat y Almería como especialidad? (la ficha AGEM lo menciona; ahora no se destaca).
- [ ] ¿Se quiere mencionar la restauración? Actualmente solo aparece como opción "Restauración u otro profesional" en el formulario.
- [ ] ¿Hay certificaciones, marcas o mercados de exportación que se quieran (y puedan) acreditar? No se ha publicado ninguno.
- [ ] Idiomas en los que el equipo comercial puede atender (para indicarlo en contacto).

## 4. Formularios

- [ ] **Direcciones de destino** de cada formulario (compradores, proveedores, general).
- [ ] Autorización para crear la cuenta del proveedor de correo (Resend u otro) y verificar el dominio de envío.
- [ ] Variables en Vercel: `RESEND_API_KEY`, `FORMS_FROM_EMAIL`, `FORMS_TO_EMAIL` (+ opcionales).
- [ ] Prueba real de envío de los 3 formularios en los 5 idiomas tras configurarlo.

## 5. Identidad visual

- [ ] **Logotipo original en vectorial (SVG/AI/PDF)**. El actual procede de la ficha AGEM (285×180 px), limpiado y recortado sin redibujar.
- [ ] ¿Existe versión horizontal oficial del logo? La cabecera usa símbolo + denominación en horizontal (composición provisional).
- [ ] Colores corporativos oficiales, si los hay (la paleta actual parte de la propuesta del briefing + verde del logotipo).

## 6. Fotografías

Las 21 fotografías actuales son **provisionales**, procedentes del CDN de Unsplash (`images.unsplash.com`, Unsplash License: uso comercial permitido, atribución no obligatoria). Ninguna muestra instalaciones, producto ni personal de la empresa.

- [ ] Anotar el **autor** de cada foto abriendo su `sourceUrl` en `src/data/images.ts` (no se pudo leer desde el entorno de desarrollo; no se ha inventado ninguno).
- [ ] Planificar **sesión fotográfica propia**: puestos en Mercabarna, producto real (alcachofa, mandarina, melón, berenjena), cajas y palés, equipo (con consentimiento), proveedores en origen.
- [ ] La foto de la ficha AGEM de la empresa (puestos) no se ha usado por su baja resolución (270×170 px).

## 7. Dominio, GitHub y Vercel

- [ ] Confirmar **propiedad y acceso** al dominio `fruitesbaixllobregat.com` (no respondía al revisarlo) y quién gestiona el DNS y el correo.
- [ ] Crear el repositorio privado `fruites-baix-llobregat` en GitHub (no había acceso autorizado desde este entorno) y subir el código.
- [ ] Conectar el repositorio a un proyecto de Vercel (producción = `main`, previews en PR).
- [ ] Conectar el dominio **sin modificar MX/SPF/DKIM/DMARC**.
- [ ] `NEXT_PUBLIC_SITE_URL` = dominio definitivo; `NEXT_PUBLIC_ALLOW_INDEXING=true` solo en Production.
- [ ] Verificar el dominio en Google Search Console y Bing Webmaster Tools y enviar el sitemap.
- [ ] (Opcional) GA4: crear propiedad, `NEXT_PUBLIC_GA_ID`, marcar `generate_lead` como evento clave.
- [ ] Si había web anterior con URLs indexadas, definir redirecciones 301.

## 8. Verificaciones finales tras desplegar

- [ ] Las 45 URLs responden 200 y el selector de idioma conserva la página.
- [ ] `https://<dominio>/robots.txt` permite rastreo y enlaza el sitemap.
- [ ] Las URLs `*.vercel.app` devuelven `X-Robots-Tag: noindex`.
- [ ] Rich Results Test sin errores; PageSpeed Insights móvil revisado.
- [ ] Envío real de formularios recibido en el buzón correcto.
