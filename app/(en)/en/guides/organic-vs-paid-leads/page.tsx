import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";
import { SITE_EN } from "@/lib/config-en";

const SLUG = "organic-vs-paid-leads";
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
  { h2: "Two different worlds" },
  {
    p: "Paid leads come from advertising — Google Ads, Facebook/Instagram ads, or buying leads from a lead company. Organic leads come without ad spend — referrals, Facebook groups, search (SEO), and your Google Business Profile. Both work, but they behave very differently on cost, quality, and speed.",
  },
  { h2: "Paid leads — pros and cons" },
  {
    ul: [
      "**➕ Fast to turn on** — pay and the leads start.",
      "**➕ High intent (search)** — someone searching \"emergency plumber near me\" is ready.",
      "**➖ Expensive** — cost per lead runs roughly $8–$100+ depending on the trade and competition.",
      "**➖ Needs skill** — it's easy to waste budget on poorly managed campaigns.",
    ],
  },
  { h2: "Organic leads — pros and cons" },
  {
    ul: [
      "**➕ Very low cost** — no cost per click; often just time or a flat tool cost.",
      "**➕ Warm and personal** — a recommendation request beats a pushed ad.",
      "**➕ You arrive before competitors** — you catch the customer the moment they ask.",
      "**➖ Needs speed** — a hot group post closes fast with whoever replies first.",
      "**➖ Hard to do by hand** — you can't watch thousands of groups yourself.",
    ],
  },
  { h2: "The real comparison: cost per customer" },
  {
    p: "Don't compare cost per lead — compare cost per closed customer. A $40 paid lead with a 3% close rate = ~$1,300 per customer. An organic group lead at a few dollars with a 20% close rate = a fraction of that. The math is why so many small businesses shift toward organic — see [cost per lead](/en/guides/cost-per-lead).",
  },
  { h2: "The best answer: both, starting with organic" },
  {
    p: `Smart businesses don't choose — they combine. Paid ads capture people searching now; organic captures the large volume of people asking in communities. The cheapest, warmest of the two is the organic group channel. [${SITE.brand}](/en/guides/facebook-group-leads) gives you that channel automatically — leads from 50,000+ Facebook groups sent to your WhatsApp for a flat $${P}/month, no per-lead fees.`,
  },
];

const FAQ = [
  {
    q: "If I have a small budget, where should I start?",
    a: "Start with the cheap organic channels — Facebook group leads and Google Business Profile. Neither needs a big ad budget. Add paid ads for extra high-intent volume once you have cash flow.",
  },
  {
    q: "Are paid leads higher quality than organic?",
    a: "Not necessarily. Search ads have high intent, but an organic group lead (\"who can recommend a…\") comes from a warm, requested recommendation and often converts very well. Quality depends on the specific channel, not paid vs. organic.",
  },
  {
    q: "Can I cover both channels without a marketing team?",
    a: "Yes. Google Business Profile takes about an hour a week, and group leads can be automated with a monitoring system like FGMP — no ad-campaign expertise required.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["cost-per-lead", "facebook-group-leads", "hot-vs-cold-leads"]} />;
}
