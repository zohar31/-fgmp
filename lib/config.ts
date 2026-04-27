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
    "מערכת AI שסורקת קבוצות פייסבוק 24/7 ושולחת לידים רלוונטיים ישירות לוואטסאפ של העסק שלך — בזמן אמת.",
};

export function waLink(message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${SITE.whatsapp}${text}`;
}
