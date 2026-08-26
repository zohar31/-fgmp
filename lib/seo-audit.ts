// אודיט מטא-דאטה סטטי — נגזר ישירות מקבצי התוכן (guides, landing, geo).
// מזהה בעיות אורך כותרת/תיאור וכפילויות מטא — קריטי בקנה מידה של אלפי דפים.
import { guides } from "./guides";
import { landingPages } from "./landing-pages";
import { glossary } from "./glossary";
import {
  cities,
  geoProfessions,
  allGeoParams,
  getGeoProfession,
  getCity,
  buildGeoContent,
} from "./geo";
import { STATIC_PATHS } from "./site-urls";
import { SITE } from "./config";
import { SITE_EN } from "./config-en";
import { guidesEn } from "./guides-en";
import { glossaryEn } from "./glossary-en";
import {
  professionsEn,
  citiesEn,
  allGeoEnParams,
  getProfessionEn,
  getCityEn,
  buildGeoEnContent,
} from "./geo-en";

// The root layout appends " | FGMP" to every Hebrew page title (the metadata
// template). English pages (/en) use a "%s" pass-through template, so their
// titles render as-is. Measure the RENDERED title so the audit matches Google.
const HE_TITLE_SUFFIX = ` | ${SITE.brand}`;
const heTitle = (t: string) => t + HE_TITLE_SUFFIX;

export type Inventory = {
  guides: number;
  landing: number;
  geo: number;
  glossary: number;
  cities: number;
  professions: number;
  staticPages: number;
  total: number;
};

export function inventory(): Inventory {
  const geo = allGeoParams().length;
  return {
    guides: guides.length,
    landing: landingPages.length,
    geo,
    glossary: glossary.length,
    cities: cities.length,
    professions: geoProfessions.length,
    staticPages: STATIC_PATHS.length,
    total: STATIC_PATHS.length + guides.length + landingPages.length + geo,
  };
}

export type MetaRow = {
  path: string;
  kind: "מדריך" | "נחיתה" | "גאו";
  title: string;
  desc: string;
  issues: string[];
};

function lengthIssues(title: string, desc: string): string[] {
  const out: string[] = [];
  const tl = title.length;
  const dl = desc.length;
  if (tl < 10) out.push("כותרת קצרה מדי");
  else if (tl > 60) out.push(`כותרת ארוכה (${tl})`);
  if (dl < 50) out.push("תיאור קצר מדי");
  else if (dl > 160) out.push(`תיאור ארוך (${dl})`);
  return out;
}

// מטא של מדריכים + דפי נחיתה (מספר קטן — מוצג במלואו בטבלה).
export function coreMeta(): MetaRow[] {
  const rows: MetaRow[] = [];
  for (const g of guides) {
    rows.push({
      path: `/guides/${g.slug}`,
      kind: "מדריך",
      title: heTitle(g.title),
      desc: g.description,
      issues: lengthIssues(heTitle(g.title), g.description),
    });
  }
  for (const p of landingPages) {
    // Landing metaTitle already includes "| FGMP" branding → no template suffix.
    rows.push({
      path: `/lidim/${p.slug}`,
      kind: "נחיתה",
      title: p.metaTitle,
      desc: p.metaDescription,
      issues: lengthIssues(p.metaTitle, p.metaDescription),
    });
  }
  return rows;
}

// English meta (guides + glossary). English pages use a "%s" title template,
// so titles render exactly as written — no branding suffix to add.
export function coreMetaEn(): MetaRow[] {
  const rows: MetaRow[] = [];
  for (const g of guidesEn) {
    rows.push({
      path: `/en/guides/${g.slug}`,
      kind: "מדריך",
      title: g.title,
      desc: g.description,
      issues: lengthIssues(g.title, g.description),
    });
  }
  void glossaryEn;
  return rows;
}

// English geo meta (all /en/leads/<trade>/<city> pages).
export function geoMetaEn(): MetaRow[] {
  const rows: MetaRow[] = [];
  for (const { profession, city } of allGeoEnParams()) {
    const p = getProfessionEn(profession);
    const c = getCityEn(city);
    if (!p || !c) continue;
    const content = buildGeoEnContent(p, c, SITE_EN.pricing.monthlyUSD, SITE_EN.pricing.refundDays);
    rows.push({
      path: `/en/leads/${profession}/${city}`,
      kind: "גאו",
      title: content.metaTitle,
      desc: content.metaDescription,
      issues: lengthIssues(content.metaTitle, content.metaDescription),
    });
  }
  return rows;
}

// מטא של כל דפי הגאו (960) — נגזר דרך buildGeoContent. מוחזר לצורך זיהוי
// כפילויות וסטטיסטיקה מצטברת, לא להצגת שורות בטבלה.
export function geoMeta(): MetaRow[] {
  const rows: MetaRow[] = [];
  for (const { slug, city } of allGeoParams()) {
    const p = getGeoProfession(slug);
    const c = getCity(city);
    if (!p || !c) continue;
    // Geo pages use an absolute title (their metaTitle already includes
    // branding), so no template suffix is added.
    const content = buildGeoContent(p, c, SITE.pricing.monthlyILS, SITE.pricing.refundDays);
    rows.push({
      path: `/lidim/${slug}/${city}`,
      kind: "גאו",
      title: content.metaTitle,
      desc: content.metaDescription,
      issues: lengthIssues(content.metaTitle, content.metaDescription),
    });
  }
  return rows;
}

export type GeoStats = {
  total: number;
  longTitle: number;
  longDesc: number;
  shortDesc: number;
};

export function geoStats(rows: MetaRow[]): GeoStats {
  return {
    total: rows.length,
    longTitle: rows.filter((r) => r.issues.some((i) => i.startsWith("כותרת ארוכה"))).length,
    longDesc: rows.filter((r) => r.issues.some((i) => i.startsWith("תיאור ארוך"))).length,
    shortDesc: rows.filter((r) => r.issues.includes("תיאור קצר מדי")).length,
  };
}

export type DuplicateGroup = { value: string; field: "כותרת" | "תיאור"; paths: string[] };

// כפילויות מטא על פני כל הדפים — כותרת או תיאור זהים בשני עמודים ומעלה.
export function findDuplicates(rows: MetaRow[]): DuplicateGroup[] {
  const byTitle = new Map<string, string[]>();
  const byDesc = new Map<string, string[]>();
  for (const r of rows) {
    if (!byTitle.has(r.title)) byTitle.set(r.title, []);
    byTitle.get(r.title)!.push(r.path);
    if (!byDesc.has(r.desc)) byDesc.set(r.desc, []);
    byDesc.get(r.desc)!.push(r.path);
  }
  const groups: DuplicateGroup[] = [];
  for (const [value, paths] of byTitle) {
    if (paths.length > 1) groups.push({ value, field: "כותרת", paths });
  }
  for (const [value, paths] of byDesc) {
    if (paths.length > 1) groups.push({ value, field: "תיאור", paths });
  }
  return groups.sort((a, b) => b.paths.length - a.paths.length);
}

export type FreshnessRow = { slug: string; title: string; updatedAt: string; ageDays: number; stale: boolean };

// רעננות מדריכים — כמה זמן עבר מאז העדכון המהותי האחרון.
export function freshness(staleAfterDays = 180): FreshnessRow[] {
  const now = Date.now();
  return guides
    .map((g) => {
      const ageDays = Math.floor((now - new Date(g.updatedAt).getTime()) / 86_400_000);
      return {
        slug: g.slug,
        title: g.title,
        updatedAt: g.updatedAt,
        ageDays,
        stale: ageDays > staleAfterDays,
      };
    })
    .sort((a, b) => b.ageDays - a.ageDays);
}
