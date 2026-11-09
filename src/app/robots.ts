import type { MetadataRoute } from "next";
import { IS_INDEXABLE, SITE_URL } from "@/config/site";

/** Solo la web de producción definitiva es rastreable; previews y desarrollo bloquean todo. */
export default function robots(): MetadataRoute.Robots {
  if (!IS_INDEXABLE) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
