import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "lead-generation-strategy";
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
  { h2: "Strategy beats tactics" },
  {
    p: "Most small businesses collect tactics — a bit of Facebook, a Google listing, some word of mouth — with no plan tying them together. That's why results feel random. A lead generation strategy isn't a fancy document; it's five decisions that make your effort compound instead of scatter. Here's the framework.",
  },
  { h2: "Step 1 — Set a real goal" },
  {
    p: "Start with a number, not a vibe. \"More customers\" isn't a goal; \"$10,000/month\" is. From there you can work backwards to exactly how many leads you need. See [how many leads per month](/en/guides/how-many-leads-per-month). Without a target, you can't tell whether a channel is working.",
  },
  { h2: "Step 2 — Know your numbers" },
  {
    ul: [
      "**Average job value** — what one customer is worth.",
      "**Close rate** — the share of leads you turn into customers.",
      "**Cost per customer** — not cost per lead; what it actually costs you to win one job. See [cost per lead](/en/guides/cost-per-lead).",
    ],
  },
  {
    p: "These three numbers turn every channel decision into simple math instead of guesswork.",
  },
  { h2: "Step 3 — Pick two or three channels and commit" },
  {
    p: "You don't need to be everywhere — you need to be effective somewhere. Pick two or three channels that fit your trade and budget, and work them consistently. For most local businesses the strongest stack is referrals + Google Business Profile + Facebook groups: all high-intent, all low-cost. See [the best lead sources](/en/guides/lead-sources). Spreading thin across ten channels beats none of them.",
  },
  { h2: "Step 4 — Respond fast and follow up" },
  {
    p: "The best strategy dies at the point of contact if you're slow. Speed of response is the single biggest lever on close rate — see [speed to lead](/en/guides/speed-to-lead) — and most deals close on the second or third touch, so build a follow-up habit. See [following up](/en/guides/follow-up-cold-leads). Getting leads is half the strategy; converting them is the other half.",
  },
  { h2: "Step 5 — Measure and adjust" },
  {
    p: "Track where your customers actually came from — not where you think they did. Every month, look at which channels produced paying customers at what cost, then put more into what works and cut what doesn't. A strategy isn't set once; it's a loop you tighten over time.",
  },
  { h2: "Make the highest-intent channel automatic" },
  {
    p: `A strategy only works if you execute it consistently — and the hardest part to keep up manually is monitoring Facebook groups for real-time requests. ${SITE.brand} handles that piece: it scans groups 24/7, filters with AI, and delivers high-intent leads to your WhatsApp, so one of your best channels runs on autopilot while you focus on closing. See [lead automation](/en/guides/lead-automation).`,
  },
];

const FAQ = [
  {
    q: "How many channels should my lead strategy use?",
    a: "Two or three, worked consistently, beats a dozen worked poorly. Pick channels that match your trade and budget — for most local businesses that's referrals, Google Business Profile, and Facebook groups — and go deep before adding more.",
  },
  {
    q: "How do I know if my lead generation strategy is working?",
    a: "Measure cost per customer and total customers per channel each month, against your goal. If a channel produces paying customers at an acceptable cost, scale it; if it doesn't after a fair test, cut it and reinvest.",
  },
  {
    q: "What's the most overlooked part of a lead strategy?",
    a: "Conversion — speed of response and follow-up. Most businesses obsess over getting more leads while quietly losing the ones they have to slow replies and no follow-up. Fixing that often beats adding new channels.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["lead-sources", "how-many-leads-per-month", "speed-to-lead"]} />;
}
