import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";
import { SITE_EN } from "@/lib/config-en";

const SLUG = "facebook-lead-ads-vs-groups";
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
  { h2: "Two ways to get leads from Facebook" },
  {
    p: "Both live on Facebook, but they're completely different. **Lead Ads** are paid ads that collect a person's details inside Facebook with one tap. **Group leads** are organic — real posts where someone asks a group for a recommendation. One you pay for by the lead; the other you catch in real time.",
  },
  { h2: "Facebook Lead Ads — pros and cons" },
  {
    ul: [
      "**➕ Volume, fast** — turn it on and leads flow.",
      "**➕ Easy for the user** — one tap, no typing.",
      "**➖ Variable quality** — easy taps mean many low-intent or forgotten form-fills.",
      "**➖ Cost per lead** — $8–$50, plus you need ad-management skill or a fee.",
    ],
  },
  { h2: "Group leads — pros and cons" },
  {
    ul: [
      "**➕ High intent** — the person typed the request themselves.",
      "**➕ Very low cost** — no cost per click.",
      "**➕ You arrive first** — you catch them the moment they ask.",
      "**➖ Needs speed** — a hot post closes fast with whoever replies first.",
      "**➖ Hard to do by hand** — you can't watch thousands of groups.",
    ],
  },
  { h2: "The deciding factor: cost per customer" },
  {
    p: "Compare cost per closed customer, not cost per lead. A $30 Lead Ads lead with a 3% close rate ≈ $1,000 per customer. A group lead at a few dollars with a 20% close rate = a fraction of that. See [cost per lead](/en/guides/cost-per-lead) and [organic vs. paid](/en/guides/organic-vs-paid-leads).",
  },
  { h2: "The verdict — use both, but don't skip groups" },
  {
    p: `Lead Ads add volume; group leads add warm, low-cost, high-intent customers most businesses never tap. [${SITE.brand} gives you the group channel automatically](/en/guides/facebook-group-leads) — every relevant request sent to your WhatsApp for a flat $${P}/month, no per-lead fees. Run it alongside your ads and you cover both sides of Facebook.`,
  },
];

const FAQ = [
  {
    q: "Are Facebook Lead Ads worth it?",
    a: "They can be, for fast volume — but quality varies and cost per lead adds up. Compare them on cost per closed customer, and pair them with organic group leads, which are warmer and cheaper.",
  },
  {
    q: "Which is better quality, Lead Ads or group leads?",
    a: "Group leads usually have higher intent — the person typed \"looking for a…\" themselves, versus a one-tap ad form. That said, the two complement each other: ads for volume, groups for warm intent.",
  },
  {
    q: "Can I get group leads without watching Facebook all day?",
    a: "Yes. A monitoring system like FGMP scans the groups for you and pushes each relevant request to your WhatsApp in real time — no ad-management skill and no manual scrolling required.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["facebook-group-leads", "organic-vs-paid-leads", "buying-leads"]} />;
}
