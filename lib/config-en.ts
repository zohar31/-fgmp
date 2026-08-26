import { SITE } from "./config";

// English / US-market site config. Mirrors `SITE` but with USD display pricing
// and English copy. NOTE: billing still runs through Tranzila and is charged in
// ILS behind the scenes — the USD figure is a display/marketing price only.
//
export const SITE_EN = {
  brand: SITE.brand, // "FGMP" — same brand worldwide
  legalName: "FGMP",
  domain: SITE.domain,
  url: SITE.url,
  whatsapp: SITE.whatsapp,
  pricing: {
    monthlyUSD: 99, // = 299 ILS (corrected 2026-08-20; billed via Tranzila in ILS)
    refundDays: SITE.pricing.refundDays, // 3
    currency: "$",
    // Actual charge is processed via Tranzila in ILS; USD is a display price.
    billedVia: "Tranzila (charged in ILS at the current exchange rate)",
  },
  notificationEmail: SITE.notificationEmail,
  descriptions: {
    meta:
      "Automated lead generation from Facebook groups to your WhatsApp. FGMP's AI scans public group posts 24/7 and sends you people looking for your service.",
    og:
      "Every day, thousands of people post in Facebook groups looking for a service like yours. FGMP finds them in real time and sends each relevant lead to your WhatsApp — automatically, 24/7.",
    organization:
      "FGMP — an AI service that finds leads from public Facebook group posts and delivers them in real time to a business owner's WhatsApp or Telegram.",
    software:
      "SaaS for automated lead discovery from Facebook groups: continuous scanning, AI filtering by industry, instant WhatsApp/Telegram delivery, and a self-service dashboard.",
    service:
      "Facebook-group lead generation for local service businesses. Automated scanning, AI filtering by trade, and instant alerts — no ad spend, no manual work.",
  },
};

export type SiteEn = typeof SITE_EN;
