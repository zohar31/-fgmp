export const SITE = {
  brand: "FGMP",
  legalName: "FGMP · צח אור",
  vatId: "036898054",
  domain: "fgmp.net",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://fgmp.net",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "972585222227",
  pricing: {
    monthlyILS: 299,
    trialDays: 7,
    currency: "₪",
  },
  notificationEmail: process.env.NOTIFICATIONS_TO_EMAIL || "a0545911111@gmail.com",
  description:
    "FGMP — מערכת לידים אוטומטית: AI שסורק קבוצות פייסבוק 24/7 ושולח לידים חמים ישירות לוואטסאפ או טלגרם של העסק שלך. ניסיון חינם 7 ימים.",
  // וריאציות לתיאורים — מונע duplicate content על שדות מטא שונים
  descriptions: {
    meta:
      "מערכת לידים אוטומטית מקבוצות פייסבוק לוואטסאפ. AI מזהה לקוחות שמחפשים את השירות שלך ושולח לך התראה תוך שניות. 7 ימי ניסיון חינם · 299 ₪ לחודש.",
    og:
      "אלפי פוסטים ביום בקבוצות פייסבוק של אנשים שמחפשים את השירות שלך. FGMP סורקת בזמן אמת ושולחת כל ליד רלוונטי לוואטסאפ או טלגרם — אוטומטית, 24/7.",
    organization:
      "FGMP — שירות לאיתור לידים מקבוצות פייסבוק ושליחתם בזמן אמת לוואטסאפ או טלגרם. הוקם על ידי צח אור, פעיל בישראל.",
    software:
      "תוכנת SaaS לאיתור לידים אוטומטי מקבוצות פייסבוק. סריקה רציפה של 4,670+ מילות מפתח, סינון AI, שליחה לוואטסאפ/טלגרם, אזור אישי לניהול.",
    service:
      "שירות לידים מקבוצות פייסבוק לעסקים בישראל. סריקה אוטומטית, סינון AI לפי תחום העיסוק, התראות מיידיות — בלי מאמץ ובלי עלויות פרסום.",
  },
};

export function waLink(message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${SITE.whatsapp}${text}`;
}
