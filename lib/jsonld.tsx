import { SITE } from "./config";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.brand,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/icon`,
    description: SITE.description,
    email: SITE.notificationEmail,
    telephone: `+${SITE.whatsapp}`,
    sameAs: [],
    address: {
      "@type": "PostalAddress",
      addressCountry: "IL",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: `+${SITE.whatsapp}`,
        availableLanguage: ["he"],
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.brand,
    url: SITE.url,
    inLanguage: "he-IL",
    description: SITE.description,
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "מערכת AI לאיתור לידים מקבוצות פייסבוק",
    provider: {
      "@type": "Organization",
      name: SITE.brand,
      url: SITE.url,
    },
    areaServed: { "@type": "Country", name: "Israel" },
    description: SITE.description,
    offers: {
      "@type": "Offer",
      priceCurrency: "ILS",
      price: SITE.pricing.monthlyILS,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: SITE.pricing.monthlyILS,
        priceCurrency: "ILS",
        unitText: "MONTH",
      },
      eligibleRegion: { "@type": "Country", name: "Israel" },
    },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
