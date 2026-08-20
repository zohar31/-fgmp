import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";
import { SITE_EN } from "@/lib/config-en";

const SLUG = "lead-generation";
const g = getGuideEn(SLUG)!;
const URL = `${SITE.url}/en/guides/${SLUG}`;

export const metadata: Metadata = {
  title: g.title,
  description: g.description,
  keywords: g.keywords,
  alternates: { canonical: URL, languages: { "en-US": URL } },
  openGraph: { type: "article", locale: "en_US", title: g.title, description: g.description, url: URL },
};

const P = SITE_EN.pricing.monthlyUSD;
const R = SITE_EN.pricing.refundDays;

const BLOCKS: Block[] = [
  { h2: "What lead generation actually means" },
  {
    p: "Lead generation is the process of finding and attracting potential customers — people who might buy what you sell — and turning them into inquiries you can close. But not every lead is equal. The difference between a business that grows and one that struggles is usually not the *number* of leads, but their quality and how fast you respond. A business that gets 20 hot leads a month and closes 5 beats one that gets 100 cold leads and closes 2.",
  },
  { h2: "The 3 axes of every lead" },
  {
    ul: [
      "**Hot vs. cold** — a hot lead wants to buy now; a cold lead is early in research. See [hot vs. cold leads](/en/guides/hot-vs-cold-leads).",
      "**Organic vs. paid** — organic (referrals, groups, search) costs little; paid (ads) is fast but pricier. [Full comparison](/en/guides/organic-vs-paid-leads).",
      "**Inbound vs. outbound** — inbound leads reach out to you; outbound are ones you contacted first. Inbound is usually warmer and cheaper to convert.",
    ],
  },
  { h2: "10 lead sources — from priciest to cheapest" },
  {
    ol: [
      "**Google Ads (search)** — high intent, but expensive ($20–$150+ per lead).",
      "**Facebook/Instagram lead ads** — big volume at mid cost ($8–$50), variable quality.",
      "**SEO** — cheap long-term ($5–$20/lead after buildout), but needs 6–12 months.",
      "**Google Business Profile** — free, essential for local. [Guide](/en/guides/google-business-profile).",
      "**Referrals & word of mouth** — the highest quality, hard to scale.",
      "**Facebook groups** — warm organic leads at a few dollars each. [How](/en/guides/facebook-group-leads).",
      "**Outbound / cold outreach** — full control, low close rate, time-heavy.",
      "**Content & social** — builds authority and inbound leads over time.",
      "**Partnerships & referral networks** — cheap and high quality.",
      "**Bought leads** — fast but often shared and cold. [Is it worth it?](/en/guides/buying-leads)",
    ],
  },
  { h2: "What a lead costs in 2026" },
  {
    p: "Cost varies widely by trade and deal value. Paid channels run roughly $8–$150+ per lead; organic channels cost a fraction. But the metric that matters is cost per closed customer (CPA), not cost per lead — see [how much a lead costs](/en/guides/cost-per-lead) and the [CPL calculator](/en/tools/cpl-calculator).",
  },
  { h2: "How to build a steady stream — not spikes" },
  {
    ol: [
      "**Define your ideal customer** — who, where, and what matters to them.",
      "**Pick 2–3 channels** and focus, instead of eight half-used ones.",
      "**Respond fast** — [the first 5 minutes](/en/guides/speed-to-lead) decide close rate more than anything.",
      "**Follow up** — most deals close on the second or third touch.",
      "**Measure and adjust** — track cost and close rate per channel.",
    ],
  },
  { h2: "The most cost-effective channel: organic group leads" },
  {
    p: `Every day, people post in Facebook groups asking for a service like yours — "who can recommend a…", "need X urgently". These are the warmest, cheapest leads there are, but you can't watch thousands of groups by hand. [${SITE.brand} scans 50,000+ groups](/en/guides/facebook-group-leads) and sends each relevant request to your WhatsApp — a flat $${P}/month, no per-lead fees, with a ${R}-day money-back guarantee. It's the simplest way to build a steady lead stream without an ad budget or a marketing team.`,
  },
];

const FAQ = [
  {
    q: "What's the best lead source for a small business?",
    a: "It depends on your trade and budget, but for most small businesses the winning mix is organic Facebook-group leads (cheap and warm) + Google Business Profile (free, local) + referrals. Add paid ads for extra volume once you have cash flow.",
  },
  {
    q: "How many leads does a business need?",
    a: "Work backwards from your revenue goal: customers needed = goal ÷ deal size; leads = customers ÷ close rate. Try our leads-needed calculator to get an exact number.",
  },
  {
    q: "Is it better to buy leads or generate them?",
    a: "Generating leads (organic, groups, referrals) is cheaper and higher quality but takes method. Buying leads is fast but often shared and cold. The best approach: build a steady organic source and supplement with paid/bought as needed.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["how-to-get-more-customers", "facebook-group-leads", "cost-per-lead"]} />;
}
