import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";
import { guides } from "@/lib/guides";
import { landingPages } from "@/lib/landing-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const guideUrls: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${SITE.url}/guides/${g.slug}`,
    lastModified: new Date(g.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const landingUrls: MetadataRoute.Sitemap = landingPages.map((p) => ({
    url: `${SITE.url}/lidim/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/lidim`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...landingUrls,
    { url: `${SITE.url}/methodology`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...guideUrls,
    { url: `${SITE.url}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE.url}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE.url}/accessibility`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];
}
