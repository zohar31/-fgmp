// מקור אמת יחיד לרשימת כל ה-URLs הציבוריים של האתר.
// משמש את IndexNow (הגשה מיידית) ואת אינוונטר התוכן בפאנל ה-SEO.
import { SITE } from "./config";
import { guides } from "./guides";
import { landingPages } from "./landing-pages";
import { allGeoParams } from "./geo";

// עמודים סטטיים אינדקסביליים (ללא /admin ו-/account שחסומים).
export const STATIC_PATHS = [
  "/",
  "/about",
  "/lidim",
  "/guides",
  "/guides/milon",
  "/data",
  "/tools",
  "/tools/cpl-calculator",
  "/tools/roi-calculator",
  "/tools/leads-target-calculator",
  "/methodology",
  "/terms",
  "/privacy",
  "/accessibility",
];

export function allSitePaths(): string[] {
  const paths = [...STATIC_PATHS];
  for (const g of guides) paths.push(`/guides/${g.slug}`);
  for (const p of landingPages) paths.push(`/lidim/${p.slug}`);
  for (const { slug, city } of allGeoParams()) paths.push(`/lidim/${slug}/${city}`);
  return paths;
}

export function allSiteUrls(): string[] {
  return allSitePaths().map((p) => `${SITE.url}${p === "/" ? "" : p}`);
}
