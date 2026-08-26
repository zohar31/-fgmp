import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "how-many-leads-per-month";
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
  { h2: "\"More leads\" is the wrong goal" },
  {
    p: "Most business owners say they want more leads, but few can say how many they actually need. That's a problem — without a number, you can't tell if a lead source is working, what to spend, or whether you're on track to hit your revenue goal. The good news: you can calculate your target in about two minutes with three numbers you already know.",
  },
  { h2: "The three numbers you need" },
  {
    ol: [
      "**Your revenue goal** — how much you want to earn per month.",
      "**Your average job value** — what one customer is worth on average.",
      "**Your close rate** — the share of leads you turn into paying customers.",
    ],
  },
  { h2: "The formula" },
  {
    p: "Work backwards in two steps:",
  },
  {
    ul: [
      "**Customers needed** = revenue goal ÷ average job value.",
      "**Leads needed** = customers needed ÷ close rate.",
    ],
  },
  { h2: "A worked example" },
  {
    p: "Say you want to earn $10,000 a month, your average job is worth $500, and you close 1 in 4 leads (a 25% close rate). Customers needed = $10,000 ÷ $500 = **20 customers**. Leads needed = 20 ÷ 0.25 = **80 leads a month**, or about 4 a business day. Now 'more leads' has a number — and you can plan around it.",
  },
  { h2: "Two ways to hit the number" },
  {
    p: "Once you know you need 80 leads, there are two levers, and most people only think of the first:",
  },
  {
    ol: [
      "**Get more leads** — add or scale up lead sources. See [the best lead sources](/en/guides/lead-sources).",
      "**Close more of the leads you have** — raising your close rate from 25% to 33% drops the leads you need from 80 to ~60. Speed and follow-up do most of the work here. See [speed to lead](/en/guides/speed-to-lead) and [following up](/en/guides/follow-up-cold-leads).",
    ],
  },
  { h2: "Quality changes the math" },
  {
    p: "The formula assumes your leads convert at your normal rate — but lead quality swings that rate hard. Cold, shared leads might close at 5%, blowing up the number of leads you need; warm, high-intent leads might close at 40%, shrinking it. So 'how many leads' and 'what kind of leads' are the same question. See [quality leads](/en/guides/quality-leads).",
  },
  { h2: "Hit your number with high-intent leads" },
  {
    p: `The easiest way to need fewer leads is to start with better ones. ${SITE.brand} sends you high-intent Facebook-group leads — people actively asking for your service — straight to your WhatsApp in real time. Higher intent means a higher close rate, which means you hit your revenue goal with fewer leads and less chasing. Plug a realistic close rate into the formula above and see how few good leads it really takes.`,
  },
];

const FAQ = [
  {
    q: "How do I calculate how many leads I need per month?",
    a: "Divide your monthly revenue goal by your average job value to get customers needed, then divide that by your close rate to get leads needed. Example: $10,000 goal ÷ $500 job ÷ 25% close = 80 leads a month.",
  },
  {
    q: "What if I don't know my close rate?",
    a: "Estimate from recent history: of your last 20 leads, how many became customers? Even a rough figure works to start. Track it going forward — knowing your close rate is one of the most useful numbers in your business.",
  },
  {
    q: "Is it better to get more leads or close more of them?",
    a: "Usually closing more first. Improving your close rate through faster response and consistent follow-up costs nothing and reduces how many leads you need. Once you're closing well, add lead volume to scale.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["lead-sources", "quality-leads", "speed-to-lead"]} />;
}
