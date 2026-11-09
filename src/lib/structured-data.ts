import { SITE_URL } from "@/config/site";
import { company } from "@/data/company";
import { images } from "@/data/images";
import { locales, type Locale } from "@/i18n/routing";

const ORG_ID = `${SITE_URL}/#organization`;

export function organizationGraph(locale: Locale, description: string) {
  const address = {
    "@type": "PostalAddress",
    streetAddress: `${company.address.market}, Pabellón ${company.address.pavilion}, puestos ${company.address.stalls.join(", ")}`,
    postalCode: company.address.postalCode,
    addressLocality: company.address.locality,
    addressRegion: company.address.region,
    addressCountry: company.address.country,
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: company.legalName,
        alternateName: company.brandName,
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/logo-full.png` },
        email: company.email,
        telephone: company.phone.display.replace(/\s/g, ""),
        address,
        foundingDate: String(company.foundedYear),
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: company.phone.display.replace(/\s/g, ""),
            email: company.email,
            availableLanguage: ["es", "ca", "fr", "en", "pl"],
          },
        ],
        sameAs: company.social.map((s) => s.url),
      },
      {
        "@type": "WholesaleStore",
        "@id": `${SITE_URL}/#business`,
        name: company.brandName,
        description,
        url: `${SITE_URL}/${locale}`,
        image: `${SITE_URL}${images.mandarinTree.src}`,
        telephone: company.phone.display.replace(/\s/g, ""),
        email: company.email,
        address,
        hasMap: company.mapsUrl,
        parentOrganization: { "@id": ORG_ID },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: company.brandName,
        inLanguage: [...locales],
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

export function breadcrumbList(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: it.url })),
  };
}
