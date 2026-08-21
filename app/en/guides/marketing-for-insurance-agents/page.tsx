import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "marketing-for-insurance-agents";
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
  { h2: "Insurance is a relationship and timing business" },
  {
    p: "People buy insurance at specific moments — a new home, a new car, a new baby, a rate hike, a bad experience with their current provider. Marketing for an insurance agent is about being trusted and being present at those moments. Get both right and you build a book of business that renews and refers for years. Here's how.",
  },
  { h2: "The best lead sources for agents" },
  {
    ol: [
      "**Referrals** — from happy clients and from partners who meet people at trigger moments (realtors, mortgage brokers, car dealers). The lifeblood of a strong agency.",
      "**Google Business Profile and reviews** — locals search for agents, and reviews build the trust the sale requires. See [the GBP guide](/en/guides/google-business-profile).",
      "**Local Facebook and community groups** — people ask 'who's a good insurance agent for…' more than you'd expect, especially around home and auto. See [Facebook group leads](/en/guides/facebook-group-leads).",
      "**Bought insurance leads** — available but often shared and cold; weigh the real cost carefully. See [why buying leads fails](/en/guides/why-buying-leads-fails).",
    ],
  },
  { h2: "Speed decides who wins the policy" },
  {
    p: "Insurance is famously a speed-to-lead business: when someone requests a quote, the first agent to respond very often wins, because rates are comparable and people just want it handled. Slow follow-up is the #1 way agents lose deals they already paid for. See [speed to lead](/en/guides/speed-to-lead).",
  },
  { h2: "Follow up relentlessly (but kindly)" },
  {
    p: "Many insurance shoppers don't buy on the first contact — they're comparing or waiting for a renewal date. The agent who follows up consistently, adds value, and is there when the timing is right gets the policy. Build a follow-up cadence and stick to it. See [following up with cold leads](/en/guides/follow-up-cold-leads).",
  },
  { h2: "Build trust and referrals" },
  {
    ul: [
      "**Answer questions helpfully** in community groups and content — be the agent people already trust.",
      "**Ask for reviews and referrals** after a good experience, especially post-claim done right.",
      "**Stay in touch** with existing clients — renewals and cross-sells are your cheapest business.",
    ],
  },
  { h2: "Be first when someone asks" },
  {
    p: `A lot of 'need an insurance quote' and 'recommend an agent' requests happen in local Facebook groups and vanish in the feed. ${SITE.brand} watches those groups 24/7, filters for people asking about coverage in your area, and sends the leads to your WhatsApp in real time — so you're the first agent to respond, while they're actively shopping. See [leads for service businesses](/en/guides/leads-for-service-businesses).`,
  },
];

const FAQ = [
  {
    q: "What's the best way for an insurance agent to get leads?",
    a: "Referrals and reputation first, backed by a strong Google Business Profile and local presence. Add high-intent, real-time sources — local groups and quote requests — where you can be the first agent to respond, which heavily influences who wins the policy.",
  },
  {
    q: "Are bought insurance leads worth it?",
    a: "Sometimes, but be careful. Many are shared with several agents and aged, so close rates are low and the cost per policy adds up. Compare them honestly against referrals and organic, high-intent sources before committing a budget.",
  },
  {
    q: "Why is speed so important in insurance sales?",
    a: "Because rates are comparable and shoppers just want it resolved, the first agent to respond usually wins. Fast, warm follow-up beats a lower quote that arrives late — making response time one of the biggest levers an agent controls.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["speed-to-lead", "follow-up-cold-leads", "leads-for-service-businesses"]} />;
}
