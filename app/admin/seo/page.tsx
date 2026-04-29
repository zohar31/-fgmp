import Link from "next/link";
import { SITE } from "@/lib/config";
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
} from "lucide-react";

type CheckResult = {
  name: string;
  status: "ok" | "warn" | "error";
  detail?: string;
};

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

async function runLiveChecks(siteUrl: string): Promise<CheckResult[]> {
  const checks: CheckResult[] = [];

  try {
    const homeRes = await fetch(siteUrl, { next: { revalidate: 600 } });
    const html = await homeRes.text();

    checks.push({
      name: "אתר עולה (HTTP 200)",
      status: homeRes.ok ? "ok" : "error",
      detail: `סטטוס: ${homeRes.status}`,
    });

    checks.push({
      name: "HTTPS פעיל",
      status: siteUrl.startsWith("https://") ? "ok" : "error",
    });

    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    const titleLen = titleMatch?.[1]?.length || 0;
    checks.push({
      name: "Page title",
      status: titleLen > 10 && titleLen <= 60 ? "ok" : titleLen > 60 ? "warn" : "error",
      detail: `${titleLen} תווים${titleLen > 60 ? " (ארוך מדי, מומלץ עד 60)" : titleLen < 10 ? " (קצר מדי)" : ""}`,
    });

    const descMatch = html.match(/<meta name="description" content="([^"]+)"/i);
    const descLen = descMatch?.[1]?.length || 0;
    checks.push({
      name: "Meta description",
      status: descLen > 50 && descLen <= 160 ? "ok" : descLen > 160 ? "warn" : "error",
      detail: `${descLen} תווים${descLen > 160 ? " (ארוך, מומלץ עד 160)" : descLen < 50 ? " (קצר מדי)" : ""}`,
    });

    checks.push({
      name: "Open Graph image",
      status: /<meta property="og:image"/i.test(html) ? "ok" : "error",
    });
    checks.push({
      name: "Open Graph title + description",
      status:
        /<meta property="og:title"/i.test(html) && /<meta property="og:description"/i.test(html)
          ? "ok"
          : "warn",
    });
    checks.push({
      name: "Twitter Card",
      status: /<meta name="twitter:card"/i.test(html) ? "ok" : "warn",
    });
    checks.push({
      name: "Canonical URL",
      status: /<link rel="canonical"/i.test(html) ? "ok" : "warn",
    });
    checks.push({
      name: "Hebrew language declared",
      status: /<html[^>]+lang="he"/i.test(html) ? "ok" : "error",
    });
    checks.push({
      name: "RTL direction",
      status: /<html[^>]+dir="rtl"/i.test(html) ? "ok" : "error",
    });

    const jsonLdCount = (html.match(/<script[^>]+application\/ld\+json/gi) || []).length;
    checks.push({
      name: "Structured Data (JSON-LD)",
      status: jsonLdCount >= 3 ? "ok" : jsonLdCount > 0 ? "warn" : "error",
      detail: `${jsonLdCount} schemas מוטמעים`,
    });

    const faviconOk = /<link[^>]+rel="icon"/i.test(html) || /<link[^>]+rel="shortcut icon"/i.test(html);
    checks.push({
      name: "Favicon",
      status: faviconOk ? "ok" : "warn",
    });
  } catch (err) {
    console.error("[seo] live check failed:", err);
    checks.push({ name: "אתר נגיש", status: "error", detail: "שגיאה בחיבור" });
  }

  try {
    const sm = await fetch(`${siteUrl}/sitemap.xml`, { next: { revalidate: 3600 } });
    const smText = await sm.text();
    const urlCount = (smText.match(/<url>/g) || []).length;
    checks.push({
      name: "Sitemap.xml",
      status: sm.ok && urlCount > 0 ? "ok" : "warn",
      detail: sm.ok ? `${urlCount} דפים` : `סטטוס ${sm.status}`,
    });
  } catch {
    checks.push({ name: "Sitemap.xml", status: "error" });
  }

  try {
    const r = await fetch(`${siteUrl}/robots.txt`, { next: { revalidate: 3600 } });
    checks.push({
      name: "Robots.txt",
      status: r.ok ? "ok" : "warn",
    });
  } catch {
    checks.push({ name: "Robots.txt", status: "error" });
  }

  return checks;
}

export default async function SeoPage() {
  const [mobile, desktop, checks] = await Promise.all([
    fetchPSI(SITE.url, "mobile"),
    fetchPSI(SITE.url, "desktop"),
    runLiveChecks(SITE.url),
  ]);

  const okCount = checks.filter((c) => c.status === "ok").length;
  const warnCount = checks.filter((c) => c.status === "warn").length;
  const errCount = checks.filter((c) => c.status === "error").length;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-white">SEO ובריאות האתר</h1>
          <p className="mt-2 text-ink-300">
            ציוני PageSpeed, בדיקות on-page, סטטוס אינדקס, וקישורים לכלי SEO חיצוניים.
          </p>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <Kpi label="✓ עובר" value={okCount} color="wa" />
        <Kpi label="⚠ אזהרה" value={warnCount} color="amber" />
        <Kpi label="✗ נכשל" value={errCount} color="rose" />
      </div>

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

      <section className="card p-6">
        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
          <ShieldCheck className="h-5 w-5 text-brand-300" />
          On-Page SEO Checks
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

      <section className="card p-6">
        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
          <FileCode className="h-5 w-5 text-brand-300" />
          Structured Data Schemas
        </h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { name: "Organization", scope: "פרטי הארגון, יצירת קשר, לוגו" },
            { name: "WebSite", scope: "מטא על האתר עצמו" },
            { name: "Service", scope: "תיאור השירות + מחיר 299₪/חודש" },
            { name: "FAQPage", scope: "9 שאלות נפוצות (rich result)" },
            { name: "BreadcrumbList", scope: "ניווט בעמודי /terms ו-/privacy" },
          ].map((s) => (
            <div
              key={s.name}
              className="flex items-center gap-3 rounded-xl bg-wa/5 p-3 ring-1 ring-wa/20"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-wa" />
              <div>
                <div className="text-sm font-bold text-white">{s.name}</div>
                <div className="text-xs text-ink-400">{s.scope}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-ink-400">
          לאימות חי של ה-schemas:{" "}
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

      <section className="card p-6">
        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
          <Search className="h-5 w-5 text-brand-300" />
          כלים חיצוניים
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ExternalCard
            title="Google Search Console"
            desc="נתוני אינדקס, queries, impressions, clicks"
            url="https://search.google.com/search-console"
          />
          <ExternalCard
            title="PageSpeed Insights"
            desc="בדיקה מעמיקה של ביצועים + המלצות לשיפור"
            url={`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(SITE.url)}`}
          />
          <ExternalCard
            title="Rich Results Test"
            desc="אימות JSON-LD schemas"
            url={`https://search.google.com/test/rich-results?url=${encodeURIComponent(SITE.url)}`}
          />
          <ExternalCard
            title="Schema Markup Validator"
            desc="בדיקת תקינות structured data"
            url={`https://validator.schema.org/?url=${encodeURIComponent(SITE.url)}`}
          />
          <ExternalCard
            title="Google site:fgmp.net"
            desc="בדיקה אם האתר באינדקס"
            url={`https://www.google.com/search?q=site:${SITE.domain}`}
          />
          <ExternalCard
            title="Microsoft Clarity (חינם)"
            desc="Heatmaps + Session replay"
            url="https://clarity.microsoft.com/"
          />
        </div>
      </section>
    </div>
  );
}

function Kpi({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "wa" | "amber" | "rose";
}) {
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
            score === null
              ? "text-ink-400"
              : score >= 90
                ? "text-wa"
                : score >= 50
                  ? "text-amber-300"
                  : "text-rose-400";
          return (
            <div key={it.key} className="text-center">
              <div className={`font-display text-2xl font-extrabold ${color}`}>
                {score ?? "—"}
              </div>
              <div className="mt-1 text-[10px] text-ink-400">{it.label}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 space-y-1 border-t border-white/5 pt-3 text-xs">
        <Vital label="LCP" value={audits["largest-contentful-paint"]?.displayValue} />
        <Vital label="CLS" value={audits["cumulative-layout-shift"]?.displayValue} />
        <Vital label="INP/TBT" value={audits["total-blocking-time"]?.displayValue} />
      </div>
    </div>
  );
}

function Vital({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-ink-400">{label}</span>
      <span className="font-mono text-ink-200" dir="ltr">
        {value || "—"}
      </span>
    </div>
  );
}

function ExternalCard({
  title,
  desc,
  url,
}: {
  title: string;
  desc: string;
  url: string;
}) {
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
