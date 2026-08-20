import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "speed-to-lead";
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
  { h2: "Whoever answers first wins" },
  {
    p: "Not the cheapest. Not the most experienced. The fastest. Study after study shows the same thing: response time is the single biggest factor you control in whether a lead closes. A lead is a product with an expiration date — a request that's an hour old is worth a fraction of one that's five minutes old.",
  },
  { h2: "The numbers: how time kills a lead" },
  {
    ul: [
      "**Within 5 minutes** — peak chance to connect and close. The lead is still actively looking.",
      "**After 30 minutes** — odds drop sharply; they've likely talked to a competitor.",
      "**After an hour** — close rate falls several times over. The lead has cooled.",
      "**After a day** — in most trades, they've already hired someone else.",
    ],
  },
  { h2: "Why speed beats everything else" },
  {
    p: "A business that gets 10 leads and responds instantly will out-close one that gets 50 leads and responds a day later. Being first often means being the only one who replied while the lead was hot. And it's the one variable you fully control — you can't control the market, but you can control how fast you answer.",
  },
  { h2: "3 ways to respond faster" },
  {
    ol: [
      "**Get notified instantly** — you need to know about a lead the moment it appears, not hours later.",
      "**Have the lead come to you** — alerts should reach you (WhatsApp/phone), not require you to check a dashboard.",
      "**Have a ready first message** — a short, personal opener you can send in seconds. See [hot vs. cold leads](/en/guides/hot-vs-cold-leads).",
    ],
  },
  { h2: "The challenge — you can't be online 24/7" },
  {
    p: `Leads don't wait for convenient hours. A post appears while you're on a job, in a meeting, or asleep. Watching Facebook groups by hand to catch them in time is impossible. ${SITE.brand} solves this: it monitors 50,000+ groups around the clock and sends each relevant post to your WhatsApp in under a minute — so you can respond first, [automatically](/en/guides/facebook-group-leads).`,
  },
];

const FAQ = [
  {
    q: "How fast should I respond to a lead?",
    a: "Within 5 minutes when possible. That's when the lead is still actively looking and your odds of connecting and closing are highest. After an hour, close rates fall several times over.",
  },
  {
    q: "How can I respond fast without watching my phone all day?",
    a: "You need a system that monitors continuously and pushes an alert to you (WhatsApp/Telegram) the moment a real lead appears — so you only act when there's an actual opportunity. That's exactly what FGMP does.",
  },
  {
    q: "Does a fast but short reply beat a slow detailed one?",
    a: "Usually yes. A quick, personal first message that starts the conversation beats a perfect reply that arrives an hour late. Speed opens the door; you can add detail once they respond.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["hot-vs-cold-leads", "facebook-group-leads", "what-is-a-lead"]} />;
}
