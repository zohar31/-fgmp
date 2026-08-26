import Link from "next/link";
import { SITE } from "@/lib/config";
import { runSiteChecks } from "@/lib/seo-checks";
import {
  inventory,
  coreMeta,
  geoMeta,
  geoStats,
  findDuplicates,
  freshness,
  coreMetaEn,
  geoMetaEn,
  staticPagesMeta,
} from "@/lib/seo-audit";
import { isGscConfigured, getGscData, type GscSummary } from "@/lib/gsc";
import { IndexNowButton } from "./IndexNowButton";
import { UrlChecker } from "./UrlChecker";
import {
  Gauge,
  ShieldCheck,
  Search,
  ExternalLink,
  Globe,
  FileCode,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Boxes,
  BarChart3,
  Send,
  Copy,
  CalendarClock,
} from "lucide-react";

export const dynamic = "force-dynamic";

type PsiCategory = { score?: number; title?: string };
type PsiResult = {
  lighthouseResult?: {
    categories?: {
      performance?: PsiCategory;
      accessibility?: PsiCategory;
      "best-practices"?: PsiCategory;
      seo?: PsiCategory;
    };
    audits?: Record<string, { displayValue?: string; numericValue?: number }>;
  };
};

async function fetchPSI(url: string, strategy: "mobile" | "desktop"): Promise<PsiResult | null> {
  const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=performance&category=accessibility&category=best-practices&category=seo`;
  try {
    const res = await fetch(api, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return (await res.json()) as PsiResult;
  } catch {
    return null;
  }
}

export default async function SeoPage() {
  const [mobile, desktop, checks] = await Promise.all([
    fetchPSI(SITE.url, "mobile"),
    fetchPSI(SITE.url, "desktop"),
    runSiteChecks(SITE.url),
  ]);

  const okCount = checks.filter((c) => c.status === "ok").length;
  const warnCount = checks.filter((c) => c.status === "warn").length;
  const errCount = checks.filter((c) => c.status === "error").length;

  // ── אינוונטר + אודיט מטא ────────────────────────────────────────────
  const inv = inventory();
  const core = [...coreMeta(), ...staticPagesMeta()];
  const geo = geoMeta();
  const enCore = coreMetaEn();
  const enGeo = geoMetaEn();
  const allRows = [...core, ...geo, ...enCore, ...enGeo];
  const dupes = findDuplicates(allRows);
  const gstats = geoStats(geo);
  const enGstats = geoStats(enGeo);
  const coreIssues = core.filter((r) => r.issues.length > 0);
  const enCoreIssues = enCore.filter((r) => r.issues.length > 0);
  const enGeoIssues = enGstats.longTitle + enGstats.longDesc + enGstats.shortDesc;
  const fresh = freshness();
  const staleCount = fresh.filter((f) => f.stale).length;

  // ── Google Search Console ───────────────────────────────────────────
  const gscOn = isGscConfigured();
  let gsc: GscSummary | null = null;
  let gscError: string | null = null;
  if (gscOn) {
    try {
      gsc = await getGscData();
    } catch (e) {
      gscError = e instanceof Error ? e.message : String(e);
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-white">SEO ובריאות האתר</h1>
          <p className="mt-2 text-ink-300">
            אינוונטר תוכן, אודיט מטא, נתוני אינדוקס, PageSpeed, בדיקות on-page והגשה למנועים.
          </p>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <Kpi label="✓ עובר" value={okCount} color="wa" />
        <Kpi label="⚠ אזהרה" value={warnCount} color="amber" />
        <Kpi label="✗ נכשל" value={errCount} color="rose" />
      </div>

      {/* ── אינוונטר תוכן ─────────────────────────────────────── */}
      <section className="card p-6">
        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
          <Boxes className="h-5 w-5 text-brand-300" />
          אינוונטר תוכן
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="סה״כ דפים" value={inv.total} highlight />
          <Stat label="מדריכים" value={inv.guides} />
          <Stat label="דפי מקצוע" value={inv.landing} />
          <Stat label="דפי גאו (מקצוע×עיר)" value={inv.geo} />
          <Stat label="מונחי מילון" value={inv.glossary} />
          <Stat label="ערים" value={inv.cities} />
          <Stat label="מקצועות (גאו)" value={inv.professions} />
          <Stat label="עמודים סטטיים" value={inv.staticPages} />
        </div>
      </section>

      {/* ── Google Search Console ─────────────────────────────── */}
      <section className="card p-6">
        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
          <BarChart3 className="h-5 w-5 text-brand-300" />
          Google Search Console
        </h2>

        {!gscOn ? (
          <div className="rounded-2xl bg-white/[0.03] p-5 ring-1 ring-white/5 text-sm text-ink-300">
            <p className="font-bold text-white">לא מחובר עדיין.</p>
            <p className="mt-2">כדי להציג נתוני חיפוש אמיתיים (queries, clicks, impressions, מיקום ממוצע):</p>
            <ol className="mt-3 list-decimal space-y-1 pr-5 text-ink-300 marker:text-brand-300">
              <li>צור Service Account ב-Google Cloud והורד מפתח JSON.</li>
              <li>הפעל את <span className="font-mono text-ink-200">Search Console API</span> בפרויקט.</li>
              <li>ב-Search Console → Settings → Users → הוסף את מייל ה-Service Account (הרשאת Full).</li>
              <li>
                הגדר ב-Vercel:{" "}
                <span className="font-mono text-ink-200">GSC_SA_KEY</span> (תוכן ה-JSON) ו-
                <span className="font-mono text-ink-200">GSC_PROPERTY</span> (למשל{" "}
                <span className="font-mono text-ink-200">sc-domain:fgmp.net</span>).
              </li>
            </ol>
          </div>
        ) : gscError ? (
          <div className="rounded-2xl bg-rose-500/5 p-5 text-sm text-rose-300 ring-1 ring-rose-500/20">
            <p className="font-bold">שגיאה בחיבור ל-GSC</p>
            <p className="mt-1 font-mono text-xs" dir="ltr">{gscError}</p>
          </div>
        ) : gsc ? (
          <div className="space-y-5">
            <div className="text-xs text-ink-400">
              28 הימים האחרונים · {gsc.range.start} — {gsc.range.end}
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat label="קליקים" value={gsc.totals.clicks} highlight />
              <Stat label="חשיפות" value={gsc.totals.impressions} />
              <Stat label="CTR" value={`${(gsc.totals.ctr * 100).toFixed(1)}%`} />
              <Stat label="מיקום ממוצע" value={gsc.totals.position.toFixed(1)} />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <GscTable title="שאילתות מובילות" rows={gsc.topQueries} />
              <GscTable title="דפים מובילים" rows={gsc.topPages} isPage />
            </div>
          </div>
        ) : null}
      </section>

      {/* ── PageSpeed ─────────────────────────────────────────── */}
      <section className="card p-6">
        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
          <Gauge className="h-5 w-5 text-brand-300" />
          PageSpeed Insights
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <PsiPanel label="Mobile" data={mobile} />
          <PsiPanel label="Desktop" data={desktop} />
        </div>
        <p className="mt-4 text-xs text-ink-400">
          הנתונים מתעדכנים אוטומטית פעם בשעה. ציון 90+ נחשב מצוין.
        </p>
      </section>

      {/* ── On-page (דף הבית) ─────────────────────────────────── */}
      <section className="card p-6">
        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
          <ShieldCheck className="h-5 w-5 text-brand-300" />
          On-Page Checks — דף הבית
        </h2>
        <ul className="space-y-2">
          {checks.map((c, i) => (
            <li
              key={i}
              className="flex items-start justify-between gap-3 rounded-xl bg-white/[0.03] p-3 ring-1 ring-white/5"
            >
              <div className="flex items-start gap-3">
                {c.status === "ok" ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-wa" />
                ) : c.status === "warn" ? (
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
                ) : (
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                )}
                <div>
                  <div className="text-sm font-medium text-white">{c.name}</div>
                  {c.detail && <div className="text-xs text-ink-400">{c.detail}</div>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── בודק URL בודד ─────────────────────────────────────── */}
      <section className="card p-6">
        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
          <Search className="h-5 w-5 text-brand-300" />
          בדיקת URL בודד
        </h2>
        <p className="mb-4 text-sm text-ink-400">
          הזן נתיב כלשהו (מדריך, דף מקצוע, דף עיר) לבדיקת on-page מלאה.
        </p>
        <UrlChecker />
      </section>

      {/* ── אודיט מטא ──────────────────────────────────────────── */}
      <section className="card p-6">
        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
          <Copy className="h-5 w-5 text-brand-300" />
          אודיט מטא-תגיות
        </h2>

        <div className="mb-1 text-xs font-bold text-ink-400">🇮🇱 עברית</div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="בעיות במדריכים/נחיתה" value={coreIssues.length} tone={coreIssues.length ? "warn" : "ok"} />
          <Stat label="כפילויות מטא" value={dupes.length} tone={dupes.length ? "error" : "ok"} />
          <Stat label="גאו · כותרת ארוכה" value={gstats.longTitle} tone={gstats.longTitle ? "warn" : "ok"} />
          <Stat label="גאו · תיאור בעייתי" value={gstats.longDesc + gstats.shortDesc} tone="ok" />
        </div>

        <div className="mb-1 mt-4 text-xs font-bold text-ink-400">🇺🇸 English (/en)</div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="EN מדריכים · בעיות" value={enCoreIssues.length} tone={enCoreIssues.length ? "warn" : "ok"} />
          <Stat label="EN גאו · כותרת ארוכה" value={enGstats.longTitle} tone={enGstats.longTitle ? "warn" : "ok"} />
          <Stat label="EN גאו · תיאור בעייתי" value={enGstats.longDesc + enGstats.shortDesc} tone={enGstats.longDesc + enGstats.shortDesc ? "warn" : "ok"} />
          <Stat label="EN סה״כ בעיות" value={enCoreIssues.length + enGeoIssues} tone={enCoreIssues.length + enGeoIssues ? "warn" : "ok"} />
        </div>

        {enCoreIssues.length > 0 && (
          <div className="mt-5 overflow-x-auto">
            <h3 className="mb-2 text-sm font-bold text-amber-300">EN — בעיות מטא ({enCoreIssues.length})</h3>
            <table className="w-full min-w-[520px] text-right text-sm">
              <tbody className="divide-y divide-white/5">
                {enCoreIssues.map((r) => (
                  <tr key={r.path}>
                    <td className="py-2 pl-3">
                      <Link href={r.path} target="_blank" className="text-brand-300 hover:underline" dir="ltr">
                        {r.path}
                      </Link>
                    </td>
                    <td className="py-2 text-amber-300">{r.issues.join(" · ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {coreIssues.length > 0 && (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[520px] text-right text-sm">
              <thead>
                <tr className="text-ink-400">
                  <th className="pb-2 font-medium">דף</th>
                  <th className="pb-2 font-medium">סוג</th>
                  <th className="pb-2 font-medium">בעיות</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {coreIssues.map((r) => (
                  <tr key={r.path}>
                    <td className="py-2 pl-3">
                      <Link href={r.path} target="_blank" className="text-brand-300 hover:underline" dir="ltr">
                        {r.path}
                      </Link>
                    </td>
                    <td className="py-2 pl-3 text-ink-300">{r.kind}</td>
                    <td className="py-2 text-amber-300">{r.issues.join(" · ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {dupes.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-2 text-sm font-bold text-rose-300">כפילויות מטא ({dupes.length})</h3>
            <ul className="space-y-2 text-sm">
              {dupes.slice(0, 10).map((d, i) => (
                <li key={i} className="rounded-xl bg-rose-500/5 p-3 ring-1 ring-rose-500/15">
                  <span className="text-rose-300">{d.field} זהה</span> ב-{d.paths.length} דפים:{" "}
                  <span className="text-ink-300">{d.paths.slice(0, 3).join(", ")}</span>
                  {d.paths.length > 3 && ` +${d.paths.length - 3}`}
                </li>
              ))}
            </ul>
            {dupes.length > 10 && (
              <p className="mt-2 text-xs text-ink-400">מוצגות 10 מתוך {dupes.length}.</p>
            )}
          </div>
        )}

        {coreIssues.length === 0 && dupes.length === 0 && (
          <p className="mt-5 text-sm text-wa">אין בעיות מטא במדריכים ובדפי הנחיתה — וכל המטא ייחודי. ✓</p>
        )}
      </section>

      {/* ── רעננות תוכן ───────────────────────────────────────── */}
      <section className="card p-6">
        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
          <CalendarClock className="h-5 w-5 text-brand-300" />
          רעננות מדריכים
          {staleCount > 0 && (
            <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-xs text-amber-300 ring-1 ring-amber-500/30">
              {staleCount} לרענון
            </span>
          )}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-right text-sm">
            <thead>
              <tr className="text-ink-400">
                <th className="pb-2 font-medium">מדריך</th>
                <th className="pb-2 font-medium">עודכן</th>
                <th className="pb-2 font-medium">גיל</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {fresh.slice(0, 8).map((f) => (
                <tr key={f.slug}>
                  <td className="py-2 pl-3">
                    <Link href={`/guides/${f.slug}`} target="_blank" className="text-brand-300 hover:underline">
                      {f.title.length > 42 ? f.title.slice(0, 42) + "…" : f.title}
                    </Link>
                  </td>
                  <td className="py-2 pl-3 text-ink-300" dir="ltr">{f.updatedAt}</td>
                  <td className={`py-2 ${f.stale ? "text-amber-300" : "text-ink-300"}`}>
                    {f.ageDays} ימים{f.stale ? " ⚠" : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-ink-400">מוצגים 8 הישנים ביותר. דגל = לא עודכן מעל 180 יום.</p>
      </section>

      {/* ── IndexNow ──────────────────────────────────────────── */}
      <section className="card p-6">
        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
          <Send className="h-5 w-5 text-brand-300" />
          IndexNow — הגשה מיידית למנועים
        </h2>
        <p className="mb-4 text-sm text-ink-400">
          שולח את כל {inv.total} הכתובות ל-Bing ו-Yandex בבת אחת (חינם, מיידי). מומלץ אחרי הוספת
          דפים חדשים. Google לא תומך ב-IndexNow — עבורו השתמש ב-Search Console.
        </p>
        <IndexNowButton />
      </section>

      {/* ── Structured Data ───────────────────────────────────── */}
      <section className="card p-6">
        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
          <FileCode className="h-5 w-5 text-brand-300" />
          Structured Data — כיסוי סכמות
        </h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { name: "Organization + WebSite", scope: "פרטי הארגון, לוגו, יצירת קשר" },
            { name: "SoftwareApplication", scope: "מוצר + AggregateRating + ביקורות" },
            { name: "Service (+ LocalBusiness)", scope: "כל דפי הגאו — areaServed לפי עיר" },
            { name: "Article", scope: "כל המדריכים ודפי הנחיתה" },
            { name: "FAQPage", scope: "מדריכים + דפי מקצוע + דפי עיר" },
            { name: "HowTo", scope: "מדריך 'איך משיגים לידים מקבוצות'" },
            { name: "DefinedTermSet", scope: "מילון המונחים /guides/milon" },
            { name: "Dataset", scope: "עמוד המחקר /data" },
            { name: "ItemList + BreadcrumbList", scope: "אשכול המחירון + ניווט בכל הדפים" },
          ].map((s) => (
            <div key={s.name} className="flex items-center gap-3 rounded-xl bg-wa/5 p-3 ring-1 ring-wa/20">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-wa" />
              <div>
                <div className="text-sm font-bold text-white">{s.name}</div>
                <div className="text-xs text-ink-400">{s.scope}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-ink-400">
          לאימות חי:{" "}
          <Link
            href={`https://search.google.com/test/rich-results?url=${encodeURIComponent(SITE.url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-300 hover:underline"
          >
            Rich Results Test ↗
          </Link>
        </p>
      </section>

      {/* ── כלים חיצוניים ─────────────────────────────────────── */}
      <section className="card p-6">
        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
          <Search className="h-5 w-5 text-brand-300" />
          כלים חיצוניים
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ExternalCard title="Google Search Console" desc="נתוני אינדקס, queries, clicks" url="https://search.google.com/search-console" />
          <ExternalCard title="Bing Webmaster Tools" desc="אינדוקס + IndexNow ב-Bing" url="https://www.bing.com/webmasters" />
          <ExternalCard title="PageSpeed Insights" desc="ביצועים + המלצות" url={`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(SITE.url)}`} />
          <ExternalCard title="Rich Results Test" desc="אימות JSON-LD schemas" url={`https://search.google.com/test/rich-results?url=${encodeURIComponent(SITE.url)}`} />
          <ExternalCard title="Schema Validator" desc="בדיקת תקינות structured data" url={`https://validator.schema.org/?url=${encodeURIComponent(SITE.url)}`} />
          <ExternalCard title="site:fgmp.net" desc="בדיקת אינדוקס בגוגל" url={`https://www.google.com/search?q=site:${SITE.domain}`} />
        </div>
      </section>
    </div>
  );
}

function Kpi({ label, value, color }: { label: string; value: number; color: "wa" | "amber" | "rose" }) {
  const colors = {
    wa: "bg-wa/10 text-wa ring-wa/30",
    amber: "bg-amber-500/10 text-amber-300 ring-amber-500/30",
    rose: "bg-rose-500/10 text-rose-300 ring-rose-500/30",
  };
  return (
    <div className={`card p-4 ring-1 ${colors[color]}`}>
      <div className="text-xs text-ink-400">{label}</div>
      <div className="mt-1 font-display text-3xl font-extrabold">{value}</div>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
  tone,
}: {
  label: string;
  value: number | string;
  highlight?: boolean;
  tone?: "ok" | "warn" | "error";
}) {
  const toneColor =
    tone === "error"
      ? "text-rose-300"
      : tone === "warn"
        ? "text-amber-300"
        : tone === "ok"
          ? "text-wa"
          : highlight
            ? "text-brand-300"
            : "text-white";
  return (
    <div className="rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/5">
      <div className={`font-display text-2xl font-extrabold ${toneColor}`}>{value}</div>
      <div className="mt-1 text-xs leading-5 text-ink-400">{label}</div>
    </div>
  );
}

function GscTable({ title, rows, isPage }: { title: string; rows: GscSummary["topQueries"]; isPage?: boolean }) {
  return (
    <div className="rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/5">
      <div className="mb-3 text-sm font-bold text-white">{title}</div>
      {rows.length === 0 ? (
        <p className="text-xs text-ink-400">אין נתונים עדיין.</p>
      ) : (
        <table className="w-full text-right text-xs">
          <thead>
            <tr className="text-ink-500">
              <th className="pb-1 font-medium">{isPage ? "דף" : "שאילתה"}</th>
              <th className="pb-1 font-medium">קליקים</th>
              <th className="pb-1 font-medium">חשיפות</th>
              <th className="pb-1 font-medium">מיקום</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.slice(0, 10).map((r, i) => {
              const key = r.keys?.[0] || "";
              const label = isPage ? key.replace(SITE.url, "") || "/" : key;
              return (
                <tr key={i}>
                  <td className="max-w-[160px] truncate py-1.5 pl-2 text-ink-200" dir={isPage ? "ltr" : "rtl"} title={label}>
                    {label}
                  </td>
                  <td className="py-1.5 pl-2 text-white">{r.clicks}</td>
                  <td className="py-1.5 pl-2 text-ink-300">{r.impressions}</td>
                  <td className="py-1.5 text-ink-300">{r.position.toFixed(1)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

function PsiPanel({ label, data }: { label: string; data: PsiResult | null }) {
  if (!data?.lighthouseResult?.categories) {
    return (
      <div className="rounded-2xl bg-white/[0.03] p-5 ring-1 ring-white/5">
        <div className="mb-3 font-bold text-white">{label}</div>
        <p className="text-sm text-ink-400">לא הצלחנו לטעון נתונים מ-PageSpeed. נסה לרענן בעוד דקה.</p>
      </div>
    );
  }

  const cats = data.lighthouseResult.categories;
  const audits = data.lighthouseResult.audits || {};

  const items = [
    { key: "performance", label: "ביצועים" },
    { key: "accessibility", label: "נגישות" },
    { key: "best-practices", label: "Best Practices" },
    { key: "seo", label: "SEO" },
  ] as const;

  return (
    <div className="rounded-2xl bg-white/[0.03] p-5 ring-1 ring-white/5">
      <div className="mb-4 flex items-center gap-2 font-bold text-white">
        <Globe className="h-4 w-4 text-brand-300" />
        {label}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {items.map((it) => {
          const c = cats[it.key];
          const score = c?.score != null ? Math.round(c.score * 100) : null;
          const color =
            score === null ? "text-ink-400" : score >= 90 ? "text-wa" : score >= 50 ? "text-amber-300" : "text-rose-400";
          return (
            <div key={it.key} className="text-center">
              <div className={`font-display text-2xl font-extrabold ${color}`}>{score ?? "—"}</div>
              <div className="mt-1 text-[10px] text-ink-400">{it.label}</div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 space-y-1 border-t border-white/5 pt-3 text-xs">
        <Vital label="LCP" value={audits["largest-contentful-paint"]?.displayValue} />
        <Vital label="CLS" value={audits["cumulative-layout-shift"]?.displayValue} />
        <Vital label="TBT" value={audits["total-blocking-time"]?.displayValue} />
      </div>
    </div>
  );
}

function Vital({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-ink-400">{label}</span>
      <span className="font-mono text-ink-200" dir="ltr">{value || "—"}</span>
    </div>
  );
}

function ExternalCard({ title, desc, url }: { title: string; desc: string; url: string }) {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 rounded-xl bg-white/[0.03] p-3 ring-1 ring-white/5 transition hover:bg-white/[0.06] hover:ring-brand-500/30"
    >
      <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
      <div className="flex-1">
        <div className="text-sm font-bold text-white">{title}</div>
        <div className="text-xs text-ink-400">{desc}</div>
      </div>
    </Link>
  );
}
