import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "quality-leads";
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
  { h2: "Why quality beats quantity" },
  {
    p: "It's easy to chase big lead numbers. But 100 cold, mismatched leads will cost you more time and close fewer jobs than 10 warm, relevant ones. A business that closes 5 of 10 good leads beats one that burns hours chasing 100 bad ones — and feels far less exhausting. The real goal was never \"more leads.\" It's **more customers**, and that comes from quality and speed, not volume.",
  },
  { h2: "The signals of a quality lead" },
  {
    ul: [
      "**Real intent.** They're actively looking to buy now — not \"just researching.\" Someone posting \"need an electrician this week\" beats someone who liked a post six months ago.",
      "**Right fit.** They need what you actually do, in the area you actually serve, at a budget that works.",
      "**Reachable.** You can contact them quickly and easily — a phone number or an open WhatsApp beats an email they'll never open.",
      "**Timely.** The lead is fresh. See [real-time leads](/en/guides/real-time-leads).",
      "**Not shared five ways.** A lead you're not fighting four competitors over. See [exclusive vs. shared leads](/en/guides/exclusive-vs-shared-leads).",
    ],
  },
  { h2: "How to score your leads" },
  {
    p: "You don't need a CRM to qualify. A simple mental checklist works: does this person have the need, the budget, the authority to decide, and a timeline? If yes to all four, it's a hot, quality lead — respond immediately. If they're missing budget or timeline, they're cooler; nurture them but don't drop your hot leads to do it. See [hot vs. cold leads](/en/guides/hot-vs-cold-leads).",
  },
  { h2: "Where the highest-quality leads come from" },
  {
    p: "Quality tracks intent, and intent is highest where people ask for a service in their own words, at the moment they need it. That's why organic, high-intent sources — referrals, Google Business Profile, and Facebook groups — consistently outrank cold purchased lists on quality. A person publicly posting \"looking for a mover this weekend\" is about as high-quality as a lead gets.",
  },
  { h2: "Getting more quality leads, automatically" },
  {
    p: `${SITE.brand} is built to surface exactly these. Instead of flooding you with volume, it uses AI to filter Facebook group posts down to the ones that match your trade and area — real people, real intent, in real time — and sends only those to your WhatsApp. You spend your time on leads worth closing, not sorting junk. See [lead automation](/en/guides/lead-automation).`,
  },
];

const FAQ = [
  {
    q: "How do I improve lead quality without spending more?",
    a: "Tighten your targeting and your source. Use precise keywords, serve a defined area, and prioritize high-intent channels (groups, referrals, GBP) over broad cold lists. Better inputs produce better leads at the same or lower cost.",
  },
  {
    q: "Is it better to have fewer, higher-quality leads?",
    a: "For most small service businesses, yes. You have limited time to work leads, so every hour spent on a junk lead is an hour not spent closing a good one. Fewer, better leads usually means more customers and less burnout.",
  },
  {
    q: "How does AI filtering improve lead quality?",
    a: "AI reads each post in context and separates genuine buying intent ('need a plumber today') from noise ('here's a plumbing tip' or someone advertising their own service). You only see the leads that actually match what you sell.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["hot-vs-cold-leads", "real-time-leads", "exclusive-vs-shared-leads"]} />;
}
