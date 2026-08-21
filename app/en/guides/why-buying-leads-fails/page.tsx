import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "why-buying-leads-fails";
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
  { h2: "Buying leads feels like buying customers — it isn't" },
  {
    p: "On paper, buying leads is the perfect shortcut: pay money, get customers. In practice, most small businesses that rely on bought leads end up frustrated — spending more and closing less than they expected. It's not always the lead company's fault; it's the model. Here's why buying leads fails so often, and what to do about it.",
  },
  { h2: "Reason 1: They're shared with your competitors" },
  {
    p: "Most bought leads are sold to 3–5 businesses at once. The customer's phone rings five times, everyone races to answer, and you compete on price before you've said hello. Even a good lead becomes a low-margin scramble. See [exclusive vs. shared leads](/en/guides/exclusive-vs-shared-leads).",
  },
  { h2: "Reason 2: They're cold or stale" },
  {
    p: "A lead is worth the most in the first minutes and almost nothing days later. Many purchased leads are hours or days old — or aged lists resold at a discount. By the time you call, the person has already hired someone or cooled off. See [real-time leads](/en/guides/real-time-leads).",
  },
  { h2: "Reason 3: Low or unclear intent" },
  {
    p: "Some 'leads' are just people who filled a form for a coupon or clicked an ad out of curiosity — not buyers. You pay the same for a tire-kicker as for a ready customer, and you only find out after wasting the time. See [quality leads](/en/guides/quality-leads).",
  },
  { h2: "Reason 4: The cost per customer creeps up" },
  {
    p: "A 'cheap' shared lead that closes at 8% can cost more per actual customer than a pricier exclusive one — and far more than an organic lead. Businesses fixate on cost per lead and miss the number that matters: cost per booked job. See [cost per lead](/en/guides/cost-per-lead).",
  },
  { h2: "What to do instead" },
  {
    ul: [
      "**Prioritize intent over volume** — a few warm leads beat a pile of cold ones.",
      "**Get to leads first, while they're fresh** — speed beats budget. See [speed to lead](/en/guides/speed-to-lead).",
      "**Use low-cost, high-intent channels** — referrals, Google Business Profile, and real-time Facebook group requests.",
    ],
  },
  { h2: "A better model than buying leads" },
  {
    p: `Instead of buying shared, aged contacts, catch people the moment they ask. ${SITE.brand} monitors Facebook groups 24/7 and sends you the original request — effectively exclusive, warm, and in real time — straight to your WhatsApp, for a flat monthly fee with no per-lead cost. You're first to reply, the lead is fresh, and you're not splitting it with four competitors. See [how to choose a lead company](/en/guides/lead-generation-companies).`,
  },
];

const FAQ = [
  {
    q: "Is buying leads always a bad idea?",
    a: "No — for high-ticket work, with exclusive and fresh leads and instant response, it can pay off. But for most small local businesses, shared and aged leads convert poorly, and the cost per actual customer ends up higher than organic, high-intent sources.",
  },
  {
    q: "Why do bought leads convert so poorly?",
    a: "Three reasons stack up: they're often shared with competitors, they're not fresh, and their intent is unclear. Combined, that means a low close rate — so even a cheap-looking lead can be expensive per customer.",
  },
  {
    q: "What's better than buying leads?",
    a: "High-intent, low-cost channels where people ask for your service themselves: referrals, Google Business Profile, and real-time Facebook group requests. They're warmer, cheaper per customer, and effectively exclusive when you respond first.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["buying-leads", "lead-generation-companies", "exclusive-vs-shared-leads"]} />;
}
