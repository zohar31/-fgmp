export const SITE = {
  brand: "FGMP",
  legalName: "FGMP · צח אור",
  vatId: "036898054",
  domain: "fgmp.net",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://fgmp.net",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "972585222227",
  pricing: {
    monthlyILS: 299,
    refundDays: 7,
    // @deprecated 2026-05-05 — replaced by money-back-guarantee model.
    // Kept as 7 for legacy guide/about pages that still read it; new code
    // should reference `refundDays`.
    trialDays: 7,
    currency: "₪",
  },
  notificationEmail: process.env.NOTIFICATIONS_TO_EMAIL || "a0545911111@gmail.com",
  description:
    "FGMP — מערכת לידים אוטומטית: AI שסורק קבוצות פייסבוק 24/7 ושולח לידים חמים ישירות לוואטסאפ או טלגרם של העסק שלך. 299₪/חודש · ערבות החזר מלא תוך 7 ימים.",
  // וריאציות לתיאורים — מונע duplicate content על שדות מטא שונים
  descriptions: {
    meta:
      "מערכת לידים אוטומטית מקבוצות פייסבוק לוואטסאפ. AI מזהה לקוחות שמחפשים את השירות שלך ושולח לך התראה תוך שניות. 299 ₪/חודש · החזר מלא תוך 7 ימים אם לא תהיה מרוצה.",
    og:
      "אלפי פוסטים ביום בקבוצות פייסבוק של אנשים שמחפשים את השירות שלך. FGMP סורקת בזמן אמת ושולחת כל ליד רלוונטי לוואטסאפ או טלגרם — אוטומטית, 24/7. ערבות החזר 7 ימים.",
    organization:
      "FGMP — שירות לאיתור לידים מקבוצות פייסבוק ושליחתם בזמן אמת לוואטסאפ או טלגרם. הוקם על ידי צח אור, פעיל בישראל.",
    software:
      "תוכנת SaaS לאיתור לידים אוטומטי מקבוצות פייסבוק. סריקה רציפה של 4,670+ מילות מפתח, סינון AI, שליחה לוואטסאפ/טלגרם, אזור אישי לניהול.",
    service:
      "שירות לידים מקבוצות פייסבוק לעסקים בישראל. סריקה אוטומטית, סינון AI לפי תחום העיסוק, התראות מיידיות — בלי מאמץ ובלי עלויות פרסום.",
  },
};

// Helper — does this subscription still qualify for a full refund?
export function isWithinRefundWindow(
  firstPaymentAt: Date | null | undefined
): boolean {
  if (!firstPaymentAt) return false;
  const ms = SITE.pricing.refundDays * 24 * 60 * 60 * 1000;
  return Date.now() - firstPaymentAt.getTime() <= ms;
}

// Days remaining in the refund window (rounded up). Returns 0 if expired.
export function refundDaysLeft(
  firstPaymentAt: Date | null | undefined
): number {
  if (!firstPaymentAt) return 0;
  const elapsedMs = Date.now() - firstPaymentAt.getTime();
  const totalMs = SITE.pricing.refundDays * 24 * 60 * 60 * 1000;
  if (elapsedMs >= totalMs) return 0;
  return Math.max(0, Math.ceil((totalMs - elapsedMs) / (24 * 60 * 60 * 1000)));
}

export function waLink(message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${SITE.whatsapp}${text}`;
}

// מנרמל את serviceAreas להצגה — מנויים ישנים שמרו רשימה מלאה של אזורים
// כש"כל הארץ" כלול → מציג "ארצי" במקום לרשום את כל הארץ
export function formatServiceAreas(raw: string | null | undefined): string {
  if (!raw) return "—";
  const s = raw.trim();
  if (!s) return "—";
  // ארצי — חדש או ישן (כש"כל הארץ" מופיע ברשימה)
  if (s === "ארצי" || /(^|,\s*)כל הארץ(,|$)/.test(s) || /(^|,\s*)ארצי(,|$)/.test(s)) {
    return "ארצי";
  }
  // מקומי חדש: "מקומי — תל אביב"
  if (s.startsWith("מקומי — ")) return s;
  // ערכים חופשיים — הצג כמו שהם
  return s;
}
