// בדיקות SEO on-page חיות — נמשכות מ-HTML אמיתי של דף.
// משמש גם את הפאנל (/admin/seo, דף הבית) וגם את בודק ה-URL הבודד (API).

export type CheckResult = {
  name: string;
  status: "ok" | "warn" | "error";
  detail?: string;
};

// בדיקות ברמת הדף — פועלות על כל URL.
export async function runPageChecks(url: string): Promise<CheckResult[]> {
  const checks: CheckResult[] = [];

  try {
    const res = await fetch(url, { next: { revalidate: 600 } });
    const html = await res.text();

    checks.push({
      name: "הדף עולה (HTTP 200)",
      status: res.ok ? "ok" : "error",
      detail: `סטטוס: ${res.status}`,
    });

    checks.push({
      name: "HTTPS פעיל",
      status: url.startsWith("https://") ? "ok" : "error",
    });

    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    const titleLen = titleMatch?.[1]?.length || 0;
    checks.push({
      name: "Page title",
      status: titleLen > 10 && titleLen <= 60 ? "ok" : titleLen > 60 ? "warn" : "error",
      detail: `${titleLen} תווים${titleLen > 60 ? " (ארוך, מומלץ עד 60)" : titleLen < 10 ? " (קצר מדי)" : ""}`,
    });

    const descMatch = html.match(/<meta name="description" content="([^"]+)"/i);
    const descLen = descMatch?.[1]?.length || 0;
    checks.push({
      name: "Meta description",
      status: descLen > 50 && descLen <= 160 ? "ok" : descLen > 160 ? "warn" : "error",
      detail: `${descLen} תווים${descLen > 160 ? " (ארוך, מומלץ עד 160)" : descLen < 50 ? " (קצר מדי)" : ""}`,
    });

    const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
    checks.push({
      name: "H1 יחיד",
      status: h1Count === 1 ? "ok" : h1Count === 0 ? "error" : "warn",
      detail: `${h1Count} תגי H1`,
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
      status: jsonLdCount >= 2 ? "ok" : jsonLdCount > 0 ? "warn" : "error",
      detail: `${jsonLdCount} schemas מוטמעים`,
    });

    const faviconOk =
      /<link[^>]+rel="icon"/i.test(html) || /<link[^>]+rel="shortcut icon"/i.test(html);
    checks.push({ name: "Favicon", status: faviconOk ? "ok" : "warn" });
  } catch (err) {
    console.error("[seo] page check failed:", err);
    checks.push({ name: "הדף נגיש", status: "error", detail: "שגיאה בחיבור" });
  }

  return checks;
}

// בדיקות ברמת האתר — כוללות את בדיקות הדף של דף הבית + sitemap + robots.
export async function runSiteChecks(siteUrl: string): Promise<CheckResult[]> {
  const checks = await runPageChecks(siteUrl);

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
    checks.push({ name: "Robots.txt", status: r.ok ? "ok" : "warn" });
  } catch {
    checks.push({ name: "Robots.txt", status: "error" });
  }

  return checks;
}
