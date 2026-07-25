// אינטגרציית Google Search Console — משיכת נתוני חיפוש אמיתיים (queries,
// clicks, impressions, position) ישירות לפאנל האדמין.
//
// ללא תלות חיצונית: חתימת ה-JWT ל-Service Account נעשית עם crypto המובנה.
//
// הגדרה (Vercel env vars):
//   GSC_SA_KEY  = תוכן ה-JSON של ה-Service Account (או base64 שלו)
//   GSC_PROPERTY = מזהה הנכס ב-GSC. לדומיין: "sc-domain:fgmp.net".
//                  לקידומת URL: "https://www.fgmp.net/"
// ואז: להוסיף את מייל ה-Service Account כמשתמש (Full/Restricted) ב-GSC.
import crypto from "crypto";

export function isGscConfigured(): boolean {
  return Boolean(process.env.GSC_SA_KEY && process.env.GSC_PROPERTY);
}

export type GscRow = {
  keys?: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

export type GscSummary = {
  range: { start: string; end: string };
  totals: { clicks: number; impressions: number; ctr: number; position: number };
  topQueries: GscRow[];
  topPages: GscRow[];
};

function b64url(input: string | Buffer): string {
  return Buffer.from(input).toString("base64url");
}

async function getAccessToken(): Promise<string> {
  const raw = process.env.GSC_SA_KEY!.trim();
  const jsonText = raw.startsWith("{")
    ? raw
    : Buffer.from(raw, "base64").toString("utf8");
  const sa = JSON.parse(jsonText) as { client_email: string; private_key: string };

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const unsigned = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(claim))}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsigned);
  const signature = signer.sign(sa.private_key).toString("base64url");
  const assertion = `${unsigned}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  if (!res.ok) {
    throw new Error(`OAuth token failed: ${res.status} ${(await res.text()).slice(0, 200)}`);
  }
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export async function getGscData(): Promise<GscSummary> {
  const token = await getAccessToken();
  const property = process.env.GSC_PROPERTY!;
  const endpoint = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
    property
  )}/searchAnalytics/query`;

  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 28);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);

  const query = async (dimensions: string[]): Promise<GscRow[]> => {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate: fmt(start),
        endDate: fmt(end),
        dimensions,
        rowLimit: 25,
      }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`GSC query failed: ${res.status} ${(await res.text()).slice(0, 200)}`);
    }
    const data = (await res.json()) as { rows?: GscRow[] };
    return data.rows || [];
  };

  const [topQueries, topPages, totalsRows] = await Promise.all([
    query(["query"]),
    query(["page"]),
    query([]),
  ]);

  const t = totalsRows[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 };

  return {
    range: { start: fmt(start), end: fmt(end) },
    totals: { clicks: t.clicks, impressions: t.impressions, ctr: t.ctr, position: t.position },
    topQueries,
    topPages,
  };
}
