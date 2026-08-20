import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";
import { SITE_EN } from "@/lib/config-en";

const SLUG = "cost-per-lead";
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

const BLOCKS: Block[] = [
  { h2: "What a lead actually costs in 2026" },
  {
    p: "Cost per lead (CPL) varies wildly by trade, channel, and competition. Rough US ranges by channel: Facebook/Instagram lead ads $8–$50; Google Ads $20–$150+ (higher for legal, insurance, and home services); bought leads from a lead company $20–$100+, often shared with several competitors. Organic channels — referrals, Google Business Profile, and Facebook groups — cost a fraction of that.",
  },
  { h2: "Typical cost per lead by trade (paid channels)" },
  {
    ul: [
      "**Home services (plumbing, HVAC, electrical)** — $25–$100+, higher for emergencies.",
      "**Legal** — $50–$300+ (one of the most expensive).",
      "**Insurance & financial** — $20–$100, verified/exclusive leads much more.",
      "**Real estate** — $20–$80.",
      "**Cleaning, moving, handyman** — $10–$50.",
    ],
  },
  { h2: "The hidden cost: quality" },
  {
    p: "The number on the invoice isn't the real cost. Bought leads are often shared with 3–5 competitors and include dead phone numbers or people who don't remember inquiring. Once you factor in the leads that never convert, the true cost of an actual qualified lead can be double the sticker price.",
  },
  { h2: "The number that matters: cost per acquisition" },
  {
    p: "A cheap lead that never closes is expensive. The real metric is cost per acquisition (CPA) = cost per lead ÷ close rate. A $40 lead with a 3% close rate = ~$1,300 per customer. An organic group lead at a few dollars with a 20% close rate = a fraction of that. Always compare channels on CPA, never CPL. More: [organic vs. paid leads](/en/guides/organic-vs-paid-leads).",
  },
  { h2: "How to lower your cost per lead" },
  {
    ol: [
      "**Don't rely only on paid ads** — add low-cost organic channels.",
      "**Improve close rate** — a higher close rate lowers cost per customer directly. [Respond faster](/en/guides/speed-to-lead).",
      "**Use a flat-cost channel** — paid CPL rises as you scale; a flat monthly source gets cheaper per lead as volume grows.",
    ],
  },
  {
    p: `That last point is exactly the ${SITE.brand} model: a flat $${P}/month for unlimited leads from 50,000+ Facebook groups. The more leads you get, the lower your effective cost per lead — often just a few dollars. [How it works](/en/guides/facebook-group-leads).`,
  },
];

const FAQ = [
  {
    q: "What's a good cost per lead?",
    a: "There's no universal number — it depends on your deal size. A rule of thumb: cost per closed customer (CPA) shouldn't exceed ~10% of your average profit per deal. Work back from that to your allowed cost per lead.",
  },
  {
    q: "Why are bought leads often disappointing?",
    a: "They're frequently shared with multiple competitors, cold (old data), or low-intent (a random form fill). That drives the close rate down and the true cost per customer up.",
  },
  {
    q: "How do I calculate cost per lead?",
    a: "Total spend on a channel ÷ number of leads it produced — including ad budget, management fees, and tools, not just the ad cost. Then divide by close rate to get cost per customer, the number that actually matters.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["organic-vs-paid-leads", "facebook-group-leads", "speed-to-lead"]} />;
}
