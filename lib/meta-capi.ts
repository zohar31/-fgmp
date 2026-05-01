// Meta Conversions API (CAPI) — server-side event tracking
//
// משלים את ה-Pixel הלקוחי. שולח אירועי המרה ישירות מהשרת ל-Meta.
// קריטי לאופטימיזציה של קמפיינים מסוג "Leads" — Meta מקבל הרבה יותר מידע
// ויכול ללמוד מי הקהל הרלוונטי.
//
// משתני סביבה:
//   META_CAPI_PIXEL_ID  — מזהה הפיקסל (לרוב זהה ל-NEXT_PUBLIC_META_PIXEL_ID)
//   META_CAPI_TOKEN     — System User Token מ-Meta Business Manager
//   META_CAPI_TEST_CODE — אופציונלי: קוד בדיקה (TEST123) במצב פיתוח/בדיקה
//
// אם משתנים חסרים — הפונקציות הופכות ל-no-op (כדי לא לחסום את הזרימה).

import { createHash } from "crypto";

const PIXEL_ID = process.env.META_CAPI_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
const TOKEN = process.env.META_CAPI_TOKEN;
const TEST_CODE = process.env.META_CAPI_TEST_CODE;

function sha256(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

function normalizePhone(phone: string): string {
  // Meta דורש פורמט E.164 ללא + או רווחים, מחושב SHA-256
  return phone.replace(/[^0-9]/g, "");
}

type LeadEventInput = {
  email?: string | null;
  phone?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  externalId?: string | null; // userId
  eventId?: string;            // לדה-דופ עם Pixel — חייב להיות זהה
  eventSourceUrl?: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
  fbp?: string;                // _fbp cookie value
  fbc?: string;                // _fbc cookie value (click ID)
  value?: number;
  currency?: string;
};

export async function sendLeadEvent(input: LeadEventInput): Promise<{ ok: boolean; error?: string }> {
  if (!PIXEL_ID || !TOKEN) {
    return { ok: false, error: "Meta CAPI not configured (missing PIXEL_ID or TOKEN)" };
  }

  const userData: Record<string, string | string[]> = {};
  if (input.email) userData.em = sha256(input.email);
  if (input.phone) userData.ph = sha256(normalizePhone(input.phone));
  if (input.firstName) userData.fn = sha256(input.firstName);
  if (input.lastName) userData.ln = sha256(input.lastName);
  if (input.externalId) userData.external_id = sha256(input.externalId);
  if (input.fbp) userData.fbp = input.fbp;
  if (input.fbc) userData.fbc = input.fbc;
  if (input.clientIpAddress) userData.client_ip_address = input.clientIpAddress;
  if (input.clientUserAgent) userData.client_user_agent = input.clientUserAgent;

  const event = {
    event_name: "Lead",
    event_time: Math.floor(Date.now() / 1000),
    action_source: "website",
    event_id: input.eventId,
    event_source_url: input.eventSourceUrl,
    user_data: userData,
    custom_data: input.value
      ? { value: input.value, currency: input.currency || "ILS" }
      : undefined,
  };

  const body: Record<string, unknown> = { data: [event] };
  if (TEST_CODE) body.test_event_code = TEST_CODE;

  try {
    const url = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${encodeURIComponent(TOKEN)}`;
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!r.ok) {
      const text = await r.text().catch(() => "");
      return { ok: false, error: `Meta CAPI ${r.status}: ${text.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

export function isConfigured(): boolean {
  return Boolean(PIXEL_ID && TOKEN);
}
