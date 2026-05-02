import { SITE } from "./config";
import type { CustomerReview } from "./reviews";

// תוקף הצעת המחיר — שנה אחת קדימה (מתעדכן בכל deploy)
function priceValidUntil() {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.brand,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/icon`,
    description: SITE.descriptions.organization,
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
    description: SITE.descriptions.meta,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function softwareApplicationSchema(reviews: CustomerReview[] = []) {
  const ratingCount = reviews.length;
  const ratingValue =
    ratingCount > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / ratingCount).toFixed(1)
      : null;

  // תאריך פרסום קבוע לביקורות (כדי שלא יקפוץ בכל deploy)
  // משתמשים בתאריך פתיחת השירות
  const REVIEW_DATE = "2026-04-01";

  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${SITE.brand} — מערכת לידים אוטומטית מקבוצות פייסבוק`,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Lead Generation",
    operatingSystem: "Web",
    url: SITE.url,
    description: SITE.descriptions.software,
    inLanguage: "he-IL",
    image: `${SITE.url}/og-image.jpeg`,
    screenshot: `${SITE.url}/og-image.jpeg`,
    audience: {
      "@type": "BusinessAudience",
      audienceType: "עסקים קטנים ובינוניים, פרילנסרים, נותני שירות",
      geographicArea: { "@type": "Country", name: "Israel" },
    },
    featureList: [
      "סריקת קבוצות פייסבוק 24/7",
      "סינון לידים ב-AI לפי תחום העיסוק",
      "התראות מיידיות בוואטסאפ",
      "התראות בטלגרם",
      "4,670+ מילות מפתח מובנות",
      "אזור אישי לניהול",
      "ביטול מנוי בלחיצה",
    ],
    provider: {
      "@type": "Organization",
      name: SITE.brand,
      url: SITE.url,
    },
    offers: {
      "@type": "Offer",
      name: `מנוי חודשי ל-${SITE.brand}`,
      priceCurrency: "ILS",
      price: SITE.pricing.monthlyILS,
      priceValidUntil: priceValidUntil(),
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/login`,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: SITE.pricing.monthlyILS,
        priceCurrency: "ILS",
        unitText: "MONTH",
        valueAddedTaxIncluded: true,
      },
      eligibleRegion: { "@type": "Country", name: "Israel" },
    },
  };

  if (ratingValue) {
    base.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount: ratingCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  // ביקורות מוטמעות בתוך ה-SoftwareApplication
  // Google מציג כל ביקורת כ-rich card נפרד — לכן כל itemReviewed
  // חייב להכיל לפחות 2 שדות נדרשים (applicationCategory + operatingSystem)
  if (reviews.length > 0) {
    const reviewedItem = {
      "@type": "SoftwareApplication",
      name: `${SITE.brand} — מערכת לידים אוטומטית מקבוצות פייסבוק`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
    };
    base.review = reviews.map((r) => ({
      "@type": "Review",
      itemReviewed: reviewedItem,
      author: { "@type": "Person", name: r.name },
      datePublished: REVIEW_DATE,
      reviewBody: r.quote,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
    }));
  }

  return base;
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

export function howToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "איך מקבלים לידים אוטומטית מקבוצות פייסבוק",
    description:
      "ארבעה שלבים פשוטים: מפוסט בקבוצה — דרך סינון AI — ועד הליד שמגיע אליך לוואטסאפ או טלגרם.",
    totalTime: "PT1M",
    inLanguage: "he-IL",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "פוסט מתפרסם בקבוצת פייסבוק",
        text: "אדם מפרסם בקבוצה ציבורית שאלה או בקשה לשירות שאתה נותן.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "AI סורק ומסנן את הפוסט",
        text: "מערכת FGMP זיהתה את הפוסט תוך שניות, השוותה אותו למילות המפתח שלך, וסיווגה אותו כליד רלוונטי.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "התראה נשלחת אליך",
        text: "המערכת שולחת אליך הודעת וואטסאפ או טלגרם עם פרטי הפוסט וקישור ישיר.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "אתה מגיב והופך את הליד לעסקה",
        text: "אתה רואה את הליד, פונה ללקוח תוך 5 דקות, וסוגר עסקה.",
      },
    ],
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
