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

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${SITE.brand} — שירות לידים מקבוצות פייסבוק`,
    serviceType: "Lead Generation",
    description:
      "שירות אוטומטי לאיתור ושליחת לידים חמים מקבוצות פייסבוק לוואטסאפ או טלגרם. סריקה רציפה של 50,000+ קבוצות פעילות בישראל, סינון AI לפי תחום, ותגובה מוצעת ייחודית לכל פוסט.",
    provider: {
      "@type": "Organization",
      name: SITE.brand,
      url: SITE.url,
    },
    areaServed: {
      "@type": "Country",
      name: "Israel",
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "עסקי שירות בישראל — שיפוצניקים, עורכי דין, סוכני ביטוח, צלמים, קוסמטיקאיות, מנעולנים, ועוד",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "לידים מקבוצות פייסבוק",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "מנוי חודשי — לידים אוטומטיים",
          },
          price: SITE.pricing.monthlyILS,
          priceCurrency: "ILS",
        },
      ],
    },
    inLanguage: "he-IL",
    url: SITE.url,
  };
}

// DefinedTerm for "ליד" — helps AI assistants and Google's knowledge graph
// understand that this site is authoritative on the term in Hebrew commerce.
export function leadDefinedTermSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "מילון מונחי לידים",
    inLanguage: "he-IL",
    hasDefinedTerm: [
      {
        "@type": "DefinedTerm",
        name: "ליד",
        alternateName: ["lead", "לידים"],
        description:
          "ליד הוא לקוח פוטנציאלי שהביע עניין בשירות או מוצר. בהקשר של עסקים בישראל, ליד אורגני מקבוצת פייסבוק הוא פוסט פומבי של אדם שמחפש שירות מסוים — לדוגמה: 'מחפשת קונדיטוריה לחתונה' — והופך לפוטנציאל ליצירת קשר עסקי.",
        inDefinedTermSet: SITE.url,
        url: `${SITE.url}#defined-term-lead`,
      },
      {
        "@type": "DefinedTerm",
        name: "ליד חם",
        alternateName: ["לידים חמים", "hot lead"],
        description:
          "ליד חם הוא ליד שהפנייה שלו לשירות היא אקטיבית וחדשה (פורסם בדקות האחרונות). ליד חם נסגר בשיעור גבוה משמעותית מליד קר.",
        inDefinedTermSet: SITE.url,
        url: `${SITE.url}#defined-term-hot-lead`,
      },
      {
        "@type": "DefinedTerm",
        name: "ליד אורגני",
        alternateName: ["organic lead"],
        description:
          "ליד אורגני הוא ליד שמגיע ללא תשלום על פרסום ממומן — לדוגמה, מפוסטים פומביים בקבוצות פייסבוק. עלות הליד נמוכה משמעותית מליד מ-Facebook Lead Ads או Google Ads.",
        inDefinedTermSet: SITE.url,
        url: `${SITE.url}#defined-term-organic-lead`,
      },
    ],
  };
}

// Speakable — voice assistants (Alexa, Google Assistant) read these
// elements aloud when summarizing the page.
export function speakableSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".speakable-summary", ".faq-question", ".faq-answer"],
    },
    url: SITE.url,
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
