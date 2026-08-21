import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "lead-kpis";
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
  { h2: "Track the numbers that change decisions" },
  {
    p: "Most businesses either track nothing or track vanity numbers like 'leads this month' that don't tell them what to do. A few well-chosen KPIs turn lead generation from guesswork into a dial you can turn. Here are the metrics that actually matter — and, just as important, how to act on each.",
  },
  { h2: "1. Cost per lead (CPL)" },
  {
    p: "What you pay, on average, to generate one lead from a channel. Useful for comparing channels — but dangerous on its own, because a cheap lead that never closes is expensive. Always read it alongside close rate. See [cost per lead](/en/guides/cost-per-lead).",
  },
  { h2: "2. Cost per acquisition (CPA)" },
  {
    p: "The real number: what it costs to win one paying customer, not one lead. CPA = channel spend ÷ customers from that channel. This is the metric that tells you whether a channel actually makes money. A channel with a high CPL but a great close rate can have a lower CPA than a 'cheap' one.",
  },
  { h2: "3. Close rate (lead-to-customer)" },
  {
    p: "The share of leads that become customers. It reveals both lead quality and how well you handle leads. If it's low, the fix is often not more leads but faster response, better qualifying, and follow-up. See [lead-handling mistakes](/en/guides/lead-handling-mistakes).",
  },
  { h2: "4. Response time" },
  {
    p: "How long between a lead arriving and your first contact. This is the most controllable, highest-leverage KPI there is — cutting it from hours to minutes can multiply your close rate. Track it and drive it down. See [speed to lead](/en/guides/speed-to-lead).",
  },
  { h2: "5. Lead source ROI" },
  {
    ul: [
      "**Track where each customer came from** — not where you assume they did.",
      "**Compare CPA and volume by source** each month.",
      "**Double down on what produces customers cheaply; cut what doesn't** after a fair test.",
    ],
  },
  { h2: "Keep it simple" },
  {
    p: "You don't need a dashboard with 40 metrics. For a small business, four numbers — CPA, close rate, response time, and customers per source — tell you almost everything. Track them monthly on a single sheet, and let them guide where your time and money go.",
  },
  { h2: "Move the metric you control most" },
  {
    p: `Response time is the KPI you can improve fastest, and it drives close rate directly. ${SITE.brand} helps by delivering high-intent Facebook-group leads to your WhatsApp the moment they appear — collapsing response time from hours to minutes. Better response time lifts your close rate, which lowers your cost per customer across every channel.`,
  },
];

const FAQ = [
  {
    q: "What's the most important lead generation KPI?",
    a: "Cost per acquisition (CPA) — what it costs to win an actual paying customer. It cuts through misleading 'cheap lead' numbers and tells you which channels really make money. Pair it with close rate and response time.",
  },
  {
    q: "What's the difference between cost per lead and cost per acquisition?",
    a: "Cost per lead is what you pay for one lead; cost per acquisition is what you pay for one customer. A channel can have a low CPL but a high CPA if those leads rarely close — which is why CPA is the number that matters.",
  },
  {
    q: "How often should I review my lead metrics?",
    a: "Monthly is enough for most small businesses. Review CPA, close rate, response time, and customers per source, then shift time and budget toward what's working. Response time is worth watching more frequently since it's so impactful.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["cost-per-lead", "speed-to-lead", "how-many-leads-per-month"]} />;
}
