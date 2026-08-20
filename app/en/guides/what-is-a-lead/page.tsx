import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "what-is-a-lead";
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
  { h2: "What is a lead, really?" },
  {
    p: "A lead is a potential customer who has shown interest in your product or service. That's it. It can be someone who filled out a form, sent a message, called, or posted in a group that they're looking for what you offer. The key word is **interest** — a lead isn't a random contact, it's someone with a reason to talk to you.",
  },
  { h2: "The main types of leads" },
  {
    ul: [
      "**Hot vs. cold** — a hot lead wants to buy now; a cold lead is early in their research. They need different handling. See [hot vs. cold leads](/en/guides/hot-vs-cold-leads).",
      "**Organic vs. paid** — organic leads come without ad spend (referrals, groups, search); paid leads come from ads. [Full comparison](/en/guides/organic-vs-paid-leads).",
      "**Inbound vs. outbound** — inbound leads reach out to you; outbound leads are ones you contacted first.",
    ],
  },
  { h2: "Where do leads come from?" },
  {
    p: "The main channels for a small business: Google Ads and search, Facebook/Instagram, Facebook groups, Google Business Profile, referrals, and content. Each has a different cost and quality — the best mix depends on your trade. A great low-cost, high-intent source most businesses miss is [Facebook groups](/en/guides/facebook-group-leads).",
  },
  { h2: "How a lead becomes a customer" },
  {
    ol: [
      "**Respond fast** — the first 5 minutes matter more than anything. [Why](/en/guides/speed-to-lead).",
      "**Qualify** — is this the right fit, with real intent and budget?",
      "**Follow up** — most deals close on the second or third touch.",
      "**Close** — make it easy to say yes with a clear next step.",
    ],
  },
  { h2: "Quality beats quantity" },
  {
    p: "100 bad leads are worth less than 10 good ones. A business that closes 5 of 10 hot, relevant leads beats one that burns time on 100 cold ones. The goal isn't \"more leads\" — it's more customers, which comes from quality and speed.",
  },
];

const FAQ = [
  {
    q: "What's the difference between a lead and a prospect?",
    a: "A lead is anyone who showed interest. A prospect is a lead you've qualified as a real potential buyer (right fit, intent, budget, and decision authority). Every prospect starts as a lead; not every lead becomes a prospect.",
  },
  {
    q: "How many leads does a small business need?",
    a: "It depends on your revenue goal, deal size, and close rate. Work backwards: customers needed = goal ÷ deal size; leads needed = customers ÷ close rate.",
  },
  {
    q: "What's the cheapest source of leads?",
    a: "Organic sources — Facebook groups, referrals, and Google Business Profile — have almost no cost per lead. They take method and speed, but for a small business they usually beat paid ads on ROI.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["hot-vs-cold-leads", "facebook-group-leads", "organic-vs-paid-leads"]} />;
}
