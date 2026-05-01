import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";
import { guides } from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const guideUrls: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${SITE.url}/guides/${g.slug}`,
    lastModified: new Date(g.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...guideUrls,
    { url: `${SITE.url}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE.url}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE.url}/accessibility`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];
}
