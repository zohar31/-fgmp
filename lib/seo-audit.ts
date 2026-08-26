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

// Core static pages set <title>/description inline in each page.tsx (not a
// data module), so they are not auto-derived. This mirrors the current RENDERED
// meta so the audit covers them. KEEP IN SYNC when a core page meta changes.
const STATIC_CORE: { path: string; title: string; desc: string }[] = [
  { path: "/", title: "לידים מקבוצות פייסבוק בוואטסאפ — מערכת AI | FGMP", desc: "מערכת לידים אוטומטית מקבוצות פייסבוק לוואטסאפ. AI מזהה לקוחות שמחפשים את השירות שלך ושולח לך התראה תוך שניות. 299 ₪/חודש · החזר מלא תוך 3 ימים אם לא תהיה מרוצה." },
  { path: "/about", title: "אודות FGMP — מערכת הלידים האוטומטית מקבוצות פייסבוק | FGMP", desc: "FGMP — שירות SaaS ישראלי שסורק 50,000+ קבוצות פייסבוק 24/7 ושולח לידים חמים לוואטסאפ. הטכנולוגיה היחידה כיום בעולם עם היכולת הזו." },
  { path: "/methodology", title: "מתודולוגיה — איך אנחנו מודדים את המספרים | FGMP", desc: "המקור והשיטה לכל מספר שמופיע באתר FGMP — 50,000+ קבוצות, 60,000+ פוסטים יומיים, 4,670+ מילות מפתח, 1,000+ לידים יומיים. מדד אמיתי, מעודכן בזמן אמת." },
  { path: "/data", title: "מחקר לידים ישראל 2026 — נתונים מ-50,000 קבוצות | FGMP", desc: "נתונים מקוריים על שוק הלידים בישראל 2026: כמות פוסטים יומית, מחירי לידים לפי תחום, זמני תגובה ושיעורי המרה. מבוסס על 50,000+ קבוצות פעילות." },
  { path: "/success-stories", title: "סיפורי לקוחות — עסקים שמקבלים לידים אמיתיים | FGMP", desc: "סיפורי הצלחה אמיתיים של עסקים בישראל שמקבלים לידים חמים מקבוצות פייסבוק עם FGMP — שיפוצניקים, קוסמטיקאיות, סוכני ביטוח, צלמים ועוד. דירוג ממוצע 5.0." },
  { path: "/tools", title: "כלים חינמיים לעסקים — מחשבוני לידים ו-ROI | FGMP", desc: "כלים חינמיים לבעלי עסקים: מחשבון עלות לליד (CPL), מחשבון ROI לשיווק, ומחשבון כמה לידים צריך בחודש. חשב, תכנן, והחלט נכון." },
  { path: "/accessibility", title: "הצהרת נגישות | FGMP", desc: "הצהרת נגישות לאתר FGMP בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות ולתקן הישראלי ת״י 5568" },
  { path: "/terms", title: "תקנון ותנאי שימוש | FGMP", desc: "תקנון ותנאי השימוש בשירות FGMP — מנוי, תשלום, חידוש, ביטול וערבות החזר. חשוב לקרוא לפני ההרשמה." },
  { path: "/privacy", title: "מדיניות פרטיות | FGMP", desc: "מדיניות הפרטיות של FGMP — איזה מידע אנחנו אוספים, איך משתמשים בו, איך שומרים עליו, ומהן הזכויות שלך." },
  { path: "/en", title: "FGMP — Automated Facebook-Group Leads to WhatsApp", desc: "Automated lead generation from Facebook groups to your WhatsApp. FGMP's AI scans public group posts 24/7 and sends you people looking for your service." },
  { path: "/en/about", title: "About FGMP — Automated Facebook-Group Lead Generation", desc: "FGMP is an AI service that scans public Facebook groups 24/7 and delivers hot leads to your WhatsApp. What it is, how it works, and what it costs." },
  { path: "/en/methodology", title: "Methodology — how we measure the numbers", desc: "The source and method behind every number on FGMP — 50,000+ groups, 60,000+ posts daily, 4,670+ keywords, 1,000+ leads a day. Updated in real time." },
  { path: "/en/tools", title: "Free Business Tools — Lead & ROI Calculators | FGMP", desc: "Free calculators for business owners: cost per lead, marketing ROI, and how many leads you need to hit your revenue goal." },
  { path: "/en/guides", title: "Lead Generation Guides for Small Business | FGMP", desc: "Practical guides on lead generation for small businesses: how to get leads from Facebook groups, hot vs. cold leads, speed to lead, cost per lead, and more." },
  { path: "/en/leads", title: "Leads by Trade & City — Facebook-Group Leads | FGMP", desc: "Choose your trade and city. FGMP scans local Facebook groups 24/7 and sends every relevant request to your WhatsApp — across major US cities." },
  { path: "/en/accessibility", title: "Accessibility Statement", desc: "FGMP's commitment to an accessible website for all users." },
  { path: "/en/terms", title: "Terms of Service", desc: "Terms of service for the FGMP lead-generation service." },
  { path: "/en/privacy", title: "Privacy Policy", desc: "How FGMP collects, uses, and protects your information." },
];

export function staticPagesMeta(): MetaRow[] {
  return STATIC_CORE.map((p) => ({
    path: p.path,
    kind: "נחיתה" as const,
    title: p.title,
    desc: p.desc,
    issues: lengthIssues(p.title, p.desc),
  }));
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
