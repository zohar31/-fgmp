import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";
import { guides } from "@/lib/guides";
import { landingPages } from "@/lib/landing-pages";
import { allGeoParams } from "@/lib/geo";
import { guidesEn } from "@/lib/guides-en";

// תאריכי lastModified אמיתיים פר-תוכן — לא new Date() בכל deploy.
// גוגל מתעלם מ"טריות מזויפת" (כל הדפים מתעדכנים בכל בנייה); תאריך אמיתי
// פר-תוכן הוא איתות טריות אמין שמעודד re-crawl של מה שבאמת השתנה.

// תאריך השינוי המהותי האחרון בדפי הנחיתה (הוספת הנישות — מאי 2026).
const LANDING_LASTMOD = new Date("2026-05-10");
// דפים סטטיים (אודות, תקנון וכו') — תאריך עדכון מהותי אחרון.
const STATIC_LASTMOD = new Date("2026-05-10");

// התוכן המעודכן ביותר באתר — קובע את הטריות של דף הבית ואינדקס המדריכים,
// שמציגים/מקשרים לתוכן החדש ביותר.
const newestContent = guides.reduce(
  (max, g) => (g.updatedAt > max ? g.updatedAt : max),
  "2026-05-10"
);
const NEWEST = new Date(newestContent);

export default function sitemap(): MetadataRoute.Sitemap {
  const guideUrls: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${SITE.url}/guides/${g.slug}`,
    lastModified: new Date(g.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const landingUrls: MetadataRoute.Sitemap = landingPages.map((p) => ({
    url: `${SITE.url}/lidim/${p.slug}`,
    lastModified: LANDING_LASTMOD,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const enGuideUrls: MetadataRoute.Sitemap = guidesEn.map((g) => ({
    url: `${SITE.url}/en/guides/${g.slug}`,
    lastModified: new Date(g.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // מטריצת מקצוע × עיר (Local SEO) — תאריך שינוי מהותי אחרון: יולי 2026.
  const GEO_LASTMOD = new Date("2026-07-25");
  const geoUrls: MetadataRoute.Sitemap = allGeoParams().map(({ slug, city }) => ({
    url: `${SITE.url}/lidim/${slug}/${city}`,
    lastModified: GEO_LASTMOD,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [
    { url: `${SITE.url}/`, lastModified: NEWEST, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/about`, lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/lidim`, lastModified: LANDING_LASTMOD, changeFrequency: "weekly", priority: 0.9 },
    ...landingUrls,
    ...geoUrls,
    { url: `${SITE.url}/data`, lastModified: NEWEST, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/success-stories`, lastModified: NEWEST, changeFrequency: "monthly", priority: 0.75 },
    { url: `${SITE.url}/tools`, lastModified: NEWEST, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/tools/cpl-calculator`, lastModified: NEWEST, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/tools/roi-calculator`, lastModified: NEWEST, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/tools/leads-target-calculator`, lastModified: NEWEST, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/methodology`, lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/guides`, lastModified: NEWEST, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE.url}/guides/milon`, lastModified: NEWEST, changeFrequency: "monthly", priority: 0.6 },
    ...guideUrls,
    { url: `${SITE.url}/terms`, lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE.url}/privacy`, lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE.url}/accessibility`, lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.3 },
    // ── English (/en) — US market ──
    {
      url: `${SITE.url}/en`,
      lastModified: NEWEST,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: { "he-IL": `${SITE.url}/`, "en-US": `${SITE.url}/en` } },
    },
    { url: `${SITE.url}/en/about`, lastModified: NEWEST, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/en/guides`, lastModified: NEWEST, changeFrequency: "weekly", priority: 0.7 },
    ...enGuideUrls,
  ];
}
