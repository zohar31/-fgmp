import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";
import { SITE_EN } from "@/lib/config-en";

const SLUG = "buying-leads";
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
  { h2: "The appeal of buying leads — and why it misleads" },
  {
    p: "\"I don't have time to market, I'll just buy leads.\" It sounds like the perfect shortcut: pay, get a list, start calling. But a month in, most businesses hit the hard truth — the budget's gone, the close rate is poor, and the leads never really wanted them. Here's why that happens, and what works instead.",
  },
  { h2: "How lead companies price leads" },
  {
    ul: [
      "**Per-lead** — you pay for each lead ($20–$100+ in the US). Common, but the lead is usually shared and cost grows as you scale.",
      "**Retainer** — a flat monthly fee for a promised volume, often exclusive.",
      "**Success fee** — a percentage of the deal, only when it closes. Common in real estate.",
    ],
  },
  { h2: "5 reasons bought leads burn budget" },
  {
    ol: [
      "**Shared leads.** Most lead companies sell the same lead to 3–5 businesses. You call, and they've already had 4 calls. [The math](/en/guides/hot-vs-cold-leads).",
      "**Cold data.** Many \"leads\" are lists of people who filled a form weeks ago — or entered a giveaway.",
      "**No real intent.** A form-fill isn't the same as someone who typed \"need a plumber today.\"",
      "**High unit cost.** $20–$100 per lead, growing linearly as you scale.",
      "**Low close rate.** Bought leads convert at 2–5% vs. 15–25% for a hot organic lead — so cost per customer skyrockets.",
    ],
  },
  { h2: "The math: what a bought lead really costs" },
  {
    p: "Say a bought lead costs $40 with a 3% close rate (typical for shared leads). To close one customer you need ~33 leads = $1,320 per customer. An organic group lead at a few dollars with a 20% close rate = a fraction of that. Run your own numbers in the [CPL](/en/tools/cpl-calculator) and [ROI](/en/tools/roi-calculator) calculators.",
  },
  { h2: "When buying leads does make sense" },
  {
    p: "It's not all black and white. Buying leads can supplement when you need fast volume in a specific trade, or when the model is exclusive and high quality. But it shouldn't be your only or first source — the base should be a steady organic source, with buying as a controlled add-on.",
  },
  { h2: "The better alternative — organic, exclusive, warm" },
  {
    p: `Instead of buying shared data, catch people the moment they ask. [${SITE.brand} scans 50,000+ Facebook groups](/en/leads) and sends you the original request — exclusive, warm, and in real time — for a flat $${P}/month, no per-lead fees, with a ${R}-day money-back guarantee. You get the lead while it's hot, and you're the first to reply.`,
  },
];

const FAQ = [
  {
    q: "Should a small business buy leads?",
    a: "Usually not as a main source. Bought leads tend to be shared, cold, and expensive per closed customer. It's better to build a steady organic source (groups, referrals, Google Business Profile) and consider buying only as a controlled supplement.",
  },
  {
    q: "Why do bought leads convert so poorly?",
    a: "Because they're often shared with several competitors (the customer is overwhelmed), cold (old data), or low-intent (a random form fill). An organic lead comes from someone who typed the request themselves — and converts far better.",
  },
  {
    q: "What's the difference between buying leads and organic leads?",
    a: "Buying = paying a company for data/leads it generated (often shared). Organic = requests from people actively looking for you in groups or search, which you catch first. Organic leads are warmer, cheaper, and effectively exclusive.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["facebook-lead-ads-vs-groups", "cost-per-lead", "organic-vs-paid-leads"]} />;
}
