import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Todo excepto API, internos de Next/Vercel y archivos con extensión (imágenes, robots.txt, sitemap.xml…)
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
