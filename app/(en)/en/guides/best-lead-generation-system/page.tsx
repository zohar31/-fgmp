import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "best-lead-generation-system";
const g = getGuideEn(SLUG)!;
const URL = `${SITE.url}/en/guides/${SLUG}`;

export const metadata: Metadata = {
  title: g.title,
  description: g.description,
  keywords: g.keywords,
  alternates: { canonical: URL, languages: { "en-US": URL } },
  openGraph: { type: "article", locale: "en_US", title: g.title, description: g.description, url: URL },
};

const BLOCKS: Block[] = [
  { h2: "There's no single 'best' — only best for you" },
  {
    p: "Search 'best lead generation system' and you'll get a hundred confident answers, each selling something. The truth is less clickable: the best system depends on your trade, budget, and how fast you can respond. A system that's perfect for a high-ticket B2B firm is wrong for a local plumber. So instead of a ranking, here's how to compare systems on the things that actually decide whether one pays off.",
  },
  { h2: "The five things that actually matter" },
  {
    ol: [
      "**Cost model** — flat fee or pay-per-lead? Per-lead pricing punishes you for success; a flat fee makes every extra lead free.",
      "**Buying intent** — are these people actively asking for your service now, or cold contacts you're interrupting? Intent drives close rate more than volume.",
      "**Speed** — how fast does a lead reach you? A system that delivers in seconds beats one you check twice a day. See [speed to lead](/en/guides/speed-to-lead).",
      "**Exclusivity** — is the lead yours, or shared with four competitors? See [exclusive vs. shared leads](/en/guides/exclusive-vs-shared-leads).",
      "**Cost per customer** — not cost per lead. The only number that tells you if it makes money. See [cost per lead](/en/guides/cost-per-lead).",
    ],
  },
  { h2: "How the main options compare" },
  {
    ul: [
      "**Paid ads (Google/Facebook)** — high volume and control, but you pay per lead, quality varies, and it needs active management.",
      "**Lead-buying companies** — instant leads, but often shared, aged, and priced per lead. Cost per customer can creep high. See [lead generation companies](/en/guides/lead-generation-companies).",
      "**Referrals** — the warmest, cheapest leads, but you can't scale them on demand.",
      "**Google Business Profile + local search** — free and high-intent, but limited to search volume in your area.",
      "**Real-time Facebook group monitoring** — high intent and effectively exclusive at a flat fee, but you need it automated to catch requests in time. See [lead automation](/en/guides/lead-automation).",
    ],
  },
  { h2: "Run your own numbers" },
  {
    p: "Don't trust a 'best' badge — trust the math for your business. Take each option and estimate cost per customer: (cost of the system) ÷ (customers it produces). Factor in your close rate, which depends heavily on intent and speed. Often a 'more expensive' flat-fee, high-intent system beats a 'cheap' pile of shared leads once you count who actually books. See [how many leads per month](/en/guides/how-many-leads-per-month) and [lead KPIs](/en/guides/lead-kpis).",
  },
  { h2: "Where FGMP fits" },
  {
    p: `${SITE.brand} is built around the criteria above: a flat monthly fee (no per-lead cost), the highest-intent source (people publicly asking for your service), real-time delivery to your WhatsApp (usually under a minute), and effectively exclusive leads (the original request, not a resold contact). It won't be the right fit for every business — but for local service businesses weighing cost, intent, speed, and exclusivity, it's a strong answer. Compare it honestly against your other options using the framework above. See [what a lead generation system is](/en/guides/lead-generation-system).`,
  },
];

const FAQ = [
  {
    q: "What is the best lead generation system?",
    a: "There isn't one universal winner — the best system depends on your trade, budget, and response speed. Compare options on cost model, buying intent, delivery speed, exclusivity, and especially cost per customer, then pick the one that produces booked jobs most profitably for you.",
  },
  {
    q: "Is paid advertising or organic better for lead generation?",
    a: "Paid ads give volume and control at a per-lead cost; organic and intent-based sources (referrals, local search, Facebook groups) are cheaper per customer and warmer. Many businesses do best leading with high-intent organic and adding paid once it's profitable.",
  },
  {
    q: "How do I compare lead generation systems fairly?",
    a: "Estimate cost per customer for each: system cost divided by the customers it actually produces, factoring in your close rate. That single number cuts through marketing claims and reveals which system pays off for your specific business.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["lead-generation-system", "lead-generation-companies", "lead-automation"]} />;
}
