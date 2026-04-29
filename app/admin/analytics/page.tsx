import Link from "next/link";
import { db, schema } from "@/lib/db";
import { gte, sql, and, isNotNull, ne } from "drizzle-orm";
import {
  Users,
  Eye,
  TrendingUp,
  Globe,
  ExternalLink,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";
import { TimeRangeSelect } from "./TimeRangeSelect";

const RANGES = {
  "1d": { days: 1, label: "24 שעות" },
  "7d": { days: 7, label: "7 ימים" },
  "30d": { days: 30, label: "30 ימים" },
  "90d": { days: 90, label: "90 ימים" },
} as const;

type RangeKey = keyof typeof RANGES;

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const { range: rangeParam } = await searchParams;
  const range: RangeKey =
    rangeParam && rangeParam in RANGES ? (rangeParam as RangeKey) : "7d";
  const days = RANGES[range].days;
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const prevSince = new Date(since.getTime() - days * 24 * 60 * 60 * 1000);

  const [
    totalViews,
    uniqueVisitors,
    prevTotalViews,
    prevUnique,
    topPaths,
    topReferrers,
    topUtmSources,
    deviceBreakdown,
    countryBreakdown,
    dailySeries,
    funnel,
  ] = await Promise.all([
    db
      .select({ c: sql<number>`count(*)::int` })
      .from(schema.pageViews)
      .where(gte(schema.pageViews.createdAt, since))
      .then((r) => r[0]?.c ?? 0),
    db
      .select({ c: sql<number>`count(distinct ${schema.pageViews.fingerprint})::int` })
      .from(schema.pageViews)
      .where(gte(schema.pageViews.createdAt, since))
      .then((r) => r[0]?.c ?? 0),
    db
      .select({ c: sql<number>`count(*)::int` })
      .from(schema.pageViews)
      .where(and(gte(schema.pageViews.createdAt, prevSince), sql`${schema.pageViews.createdAt} < ${since}`))
      .then((r) => r[0]?.c ?? 0),
    db
      .select({ c: sql<number>`count(distinct ${schema.pageViews.fingerprint})::int` })
      .from(schema.pageViews)
      .where(and(gte(schema.pageViews.createdAt, prevSince), sql`${schema.pageViews.createdAt} < ${since}`))
      .then((r) => r[0]?.c ?? 0),
    db
      .select({
        path: schema.pageViews.path,
        views: sql<number>`count(*)::int`,
      })
      .from(schema.pageViews)
      .where(gte(schema.pageViews.createdAt, since))
      .groupBy(schema.pageViews.path)
      .orderBy(sql`count(*) desc`)
      .limit(10),
    db
      .select({
        domain: schema.pageViews.referrerDomain,
        views: sql<number>`count(*)::int`,
      })
      .from(schema.pageViews)
      .where(
        and(
          gte(schema.pageViews.createdAt, since),
          isNotNull(schema.pageViews.referrerDomain),
          ne(schema.pageViews.referrerDomain, "fgmp.net"),
          ne(schema.pageViews.referrerDomain, "www.fgmp.net")
        )
      )
      .groupBy(schema.pageViews.referrerDomain)
      .orderBy(sql`count(*) desc`)
      .limit(10),
    db
      .select({
        source: schema.pageViews.utmSource,
        medium: schema.pageViews.utmMedium,
        campaign: schema.pageViews.utmCampaign,
        views: sql<number>`count(*)::int`,
      })
      .from(schema.pageViews)
      .where(and(gte(schema.pageViews.createdAt, since), isNotNull(schema.pageViews.utmSource)))
      .groupBy(schema.pageViews.utmSource, schema.pageViews.utmMedium, schema.pageViews.utmCampaign)
      .orderBy(sql`count(*) desc`)
      .limit(10),
    db
      .select({
        device: schema.pageViews.device,
        views: sql<number>`count(*)::int`,
      })
      .from(schema.pageViews)
      .where(gte(schema.pageViews.createdAt, since))
      .groupBy(schema.pageViews.device)
      .orderBy(sql`count(*) desc`),
    db
      .select({
        country: schema.pageViews.country,
        views: sql<number>`count(*)::int`,
      })
      .from(schema.pageViews)
      .where(and(gte(schema.pageViews.createdAt, since), isNotNull(schema.pageViews.country)))
      .groupBy(schema.pageViews.country)
      .orderBy(sql`count(*) desc`)
      .limit(10),
    db
      .select({
        day: sql<string>`to_char(date_trunc('day', ${schema.pageViews.createdAt}), 'YYYY-MM-DD')`,
        views: sql<number>`count(*)::int`,
        unique: sql<number>`count(distinct ${schema.pageViews.fingerprint})::int`,
      })
      .from(schema.pageViews)
      .where(gte(schema.pageViews.createdAt, since))
      .groupBy(sql`date_trunc('day', ${schema.pageViews.createdAt})`)
      .orderBy(sql`date_trunc('day', ${schema.pageViews.createdAt})`),
    Promise.all([
      db.select({ c: sql<number>`count(*)::int` }).from(schema.users).then((r) => r[0]?.c ?? 0),
      db
        .select({ c: sql<number>`count(*)::int` })
        .from(schema.subscriptions)
        .where(sql`${schema.subscriptions.status} != 'pending_setup'`)
        .then((r) => r[0]?.c ?? 0),
      db
        .select({ c: sql<number>`count(*)::int` })
        .from(schema.subscriptions)
        .where(sql`${schema.subscriptions.status} IN ('trial_active', 'active')`)
        .then((r) => r[0]?.c ?? 0),
      db
        .select({ c: sql<number>`count(*)::int` })
        .from(schema.subscriptions)
        .where(sql`${schema.subscriptions.status} = 'active'`)
        .then((r) => r[0]?.c ?? 0),
    ]),
  ]);

  const [funnelSignups, funnelSetup, funnelActive, funnelPaying] = funnel;

  const trendPct = (curr: number, prev: number) => {
    if (prev === 0) return curr > 0 ? 100 : 0;
    return Math.round(((curr - prev) / prev) * 100);
  };

  const viewsTrend = trendPct(totalViews, prevTotalViews);
  const visitorsTrend = trendPct(uniqueVisitors, prevUnique);
  const conversionRate = totalViews > 0 ? ((funnelSignups / totalViews) * 100).toFixed(1) : "0.0";

  const series = fillMissingDays(dailySeries, days);
  const totalDevice = deviceBreakdown.reduce((a, b) => a + b.views, 0);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-white">סטטיסטיקה</h1>
          <p className="mt-2 text-ink-300">
            תנועה, מקורות, התנהגות, ומשפך המרה ב-{RANGES[range].label} האחרונים.
          </p>
        </div>
        <TimeRangeSelect current={range} />
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi
          label="צפיות בדף"
          value={totalViews.toLocaleString("he-IL")}
          trend={viewsTrend}
          icon={Eye}
          color="brand"
        />
        <Kpi
          label="מבקרים ייחודיים"
          value={uniqueVisitors.toLocaleString("he-IL")}
          trend={visitorsTrend}
          icon={Users}
          color="wa"
        />
        <Kpi
          label="צפיות לכל מבקר"
          value={uniqueVisitors > 0 ? (totalViews / uniqueVisitors).toFixed(1) : "0.0"}
          icon={TrendingUp}
          color="brand"
        />
        <Kpi
          label="שיעור המרה"
          value={`${conversionRate}%`}
          hint="ביקור → הרשמה"
          icon={Globe}
          color="wa"
        />
      </div>

      <section className="card p-6">
        <h2 className="mb-4 font-display text-lg font-bold text-white">תנועה לאורך זמן</h2>
        <DailyChart series={series} />
      </section>

      <section className="card p-6">
        <h2 className="mb-1 font-display text-lg font-bold text-white">משפך המרה</h2>
        <p className="mb-5 text-xs text-ink-400">מסך הראשון עד מנוי משלם — ספירה כוללת (לא בטווח הזמן)</p>
        <FunnelChart
          steps={[
            { label: "צפיות בדף", value: totalViews, accent: "brand" },
            { label: "נרשמו (Google)", value: funnelSignups, accent: "brand" },
            { label: "מילאו הגדרות", value: funnelSetup, accent: "brand" },
            { label: "WhatsApp פעיל", value: funnelActive, accent: "wa" },
            { label: "מנוי משלם", value: funnelPaying, accent: "wa" },
          ]}
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <RankList
          title="דפים מובילים"
          icon={Eye}
          items={topPaths.map((p) => ({ label: p.path, value: p.views }))}
          emptyMsg="אין נתונים עדיין"
        />
        <RankList
          title="מקורות הפניה"
          icon={ExternalLink}
          items={topReferrers.map((r) => ({ label: r.domain || "—", value: r.views }))}
          emptyMsg="אין הפניות חיצוניות"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RankList
          title="מקורות UTM"
          icon={Globe}
          items={topUtmSources.map((u) => ({
            label: [u.source, u.medium, u.campaign].filter(Boolean).join(" · "),
            value: u.views,
          }))}
          emptyMsg="אין קמפיינים עם UTM"
        />
        <section className="card p-6">
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
            <Smartphone className="h-5 w-5 text-brand-300" />
            התקנים
          </h2>
          {totalDevice === 0 ? (
            <p className="text-sm text-ink-400">אין נתונים עדיין</p>
          ) : (
            <div className="space-y-3">
              {deviceBreakdown.map((d) => {
                const pct = totalDevice > 0 ? (d.views / totalDevice) * 100 : 0;
                const Icon = d.device === "mobile" ? Smartphone : d.device === "tablet" ? Tablet : Monitor;
                return (
                  <div key={d.device}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-ink-200">
                        <Icon className="h-4 w-4" />
                        {d.device === "mobile" ? "מובייל" : d.device === "tablet" ? "טאבלט" : "דסקטופ"}
                      </span>
                      <span className="text-white">
                        {d.views} ({pct.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-l from-brand-400 to-wa"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      <RankList
        title="מדינות"
        icon={Globe}
        items={countryBreakdown.map((c) => ({ label: c.country || "—", value: c.views }))}
        emptyMsg="אין נתוני מיקום"
      />

      <div className="card border-l-4 border-brand-500 p-5">
        <p className="text-sm leading-7 text-ink-200">
          <strong className="text-white">לעוד נתונים:</strong> Vercel Analytics ו-Speed Insights פעילים ברקע.
          לדוחות מתקדמים יותר (heatmaps, session replay, A/B) — ראה{" "}
          <Link href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-brand-300 hover:underline">
            Vercel Dashboard
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

function Kpi({
  label,
  value,
  trend,
  hint,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  trend?: number;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: "brand" | "wa";
}) {
  const colorMap = {
    brand: "from-brand-500/20 to-brand-500/5 ring-brand-500/30 text-brand-300",
    wa: "from-wa/20 to-wa/5 ring-wa/30 text-wa",
  };
  return (
    <div className={`card relative overflow-hidden p-5`}>
      <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${colorMap[color].split(" ").slice(0, 2).join(" ")} opacity-50`} />
      <div className="flex items-center justify-between">
        <div className="text-xs text-ink-400">{label}</div>
        <Icon className={`h-4 w-4 ${colorMap[color].split(" ").pop()}`} />
      </div>
      <div className="mt-2 font-display text-3xl font-extrabold text-white">{value}</div>
      {trend !== undefined && (
        <div
          className={`mt-1 text-xs font-semibold ${
            trend > 0 ? "text-wa" : trend < 0 ? "text-rose-400" : "text-ink-400"
          }`}
        >
          {trend > 0 ? "▲" : trend < 0 ? "▼" : "—"} {Math.abs(trend)}% מהתקופה הקודמת
        </div>
      )}
      {hint && <div className="mt-1 text-[10px] text-ink-500">{hint}</div>}
    </div>
  );
}

function DailyChart({ series }: { series: { day: string; views: number; unique: number }[] }) {
  const max = Math.max(1, ...series.map((s) => s.views));
  return (
    <div className="space-y-3">
      <div className="flex h-44 items-end gap-1">
        {series.map((s) => {
          const h = (s.views / max) * 100;
          return (
            <div key={s.day} className="group flex-1">
              <div
                className="relative w-full rounded-t bg-gradient-to-t from-brand-500 to-wa transition-all hover:opacity-80"
                style={{ height: `${Math.max(h, 2)}%` }}
              >
                <div className="pointer-events-none absolute -top-12 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-bg-soft px-2 py-1 text-[10px] text-white ring-1 ring-white/10 group-hover:block">
                  <div className="font-bold">{s.views}</div>
                  <div className="text-ink-400">{s.day}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-[10px] text-ink-500">
        <span dir="ltr">{series[0]?.day}</span>
        <span dir="ltr">{series[series.length - 1]?.day}</span>
      </div>
    </div>
  );
}

function FunnelChart({
  steps,
}: {
  steps: { label: string; value: number; accent: "brand" | "wa" }[];
}) {
  const max = Math.max(1, ...steps.map((s) => s.value));
  return (
    <div className="space-y-3">
      {steps.map((s, i) => {
        const w = Math.max(4, (s.value / max) * 100);
        const fromPrev = i === 0 ? null : steps[i - 1].value;
        const conversion =
          fromPrev !== null && fromPrev > 0 ? ((s.value / fromPrev) * 100).toFixed(1) : null;
        return (
          <div key={s.label}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-ink-200">{s.label}</span>
              <span className="font-bold text-white">
                {s.value.toLocaleString("he-IL")}
                {conversion && (
                  <span className="ms-2 text-xs text-ink-400">({conversion}%)</span>
                )}
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/5">
              <div
                className={`h-full rounded-full bg-gradient-to-l ${
                  s.accent === "brand" ? "from-brand-500 to-brand-400" : "from-wa to-wa-dark"
                }`}
                style={{ width: `${w}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RankList({
  title,
  icon: Icon,
  items,
  emptyMsg,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: { label: string; value: number }[];
  emptyMsg: string;
}) {
  const max = Math.max(1, ...items.map((i) => i.value));
  return (
    <section className="card p-6">
      <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
        <Icon className="h-5 w-5 text-brand-300" />
        {title}
      </h2>
      {items.length === 0 ? (
        <p className="text-sm text-ink-400">{emptyMsg}</p>
      ) : (
        <ol className="space-y-2">
          {items.map((it) => (
            <li key={it.label} className="group">
              <div className="mb-1 flex items-center justify-between gap-2 text-sm">
                <span className="truncate text-ink-200" dir="auto">
                  {it.label}
                </span>
                <span className="shrink-0 font-bold text-white">{it.value}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-l from-brand-400 to-wa"
                  style={{ width: `${(it.value / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

function fillMissingDays(
  data: { day: string; views: number; unique: number }[],
  days: number
): { day: string; views: number; unique: number }[] {
  const map = new Map(data.map((d) => [d.day, d]));
  const result: { day: string; views: number; unique: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const key = d.toISOString().slice(0, 10);
    result.push(map.get(key) || { day: key, views: 0, unique: 0 });
  }
  return result;
}
