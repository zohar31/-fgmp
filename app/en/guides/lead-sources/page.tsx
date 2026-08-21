import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "lead-sources";
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
  { h2: "How to judge a lead source" },
  {
    p: "Every lead source trades off three things: **cost** (what you pay per lead), **intent** (how ready the person is to buy), and **effort** (how much work to set up and maintain). The best sources are high-intent and low-cost; the worst are expensive and cold. Here are the ten that matter most for a small business, roughly in order of ROI for local services.",
  },
  { h2: "1. Referrals & word of mouth" },
  {
    p: "The highest-converting source there is: free, warm, and pre-trusted. The catch is you can't turn it on at will. Ask happy customers directly, and make it easy for them to send people your way.",
  },
  { h2: "2. Facebook groups" },
  {
    p: "People publicly asking for your service — search-level intent at almost no cost. The effort is monitoring, which is why automation helps. See [Facebook group leads](/en/guides/facebook-group-leads) and [the best groups](/en/guides/best-facebook-groups-for-leads).",
  },
  { h2: "3. Google Business Profile" },
  {
    p: "Free, and it puts you in the Google Maps results when locals search. Essential for any local business. See [the GBP guide](/en/guides/google-business-profile).",
  },
  { h2: "4. Google Search / Ads" },
  {
    p: "The highest intent of any paid channel — people searching for exactly what you do. Effective but competitive and pricey. See [Google vs. Facebook](/en/guides/google-vs-facebook-leads).",
  },
  { h2: "5–7. The reliable middle" },
  {
    ul: [
      "**Facebook & Instagram Ads** — good for awareness and retargeting; lower intent, needs creative and budget. See [organic vs. paid](/en/guides/organic-vs-paid-leads).",
      "**Repeat & past customers** — cheap and warm; a simple check-in or reminder revives business you already earned.",
      "**Local partnerships** — team up with businesses that serve the same customer (a realtor and a mover, a plumber and an electrician) and swap referrals.",
    ],
  },
  { h2: "8–10. Situational sources" },
  {
    ul: [
      "**Content & SEO** — a blog or YouTube builds intent over time; slow to start, compounding later.",
      "**Lead-buying / marketplaces** — instant volume, but shared, cold, and pricey per customer. See [buying leads](/en/guides/buying-leads).",
      "**Cold outreach** — scalable for B2B, but cold and labor-intensive. See [B2B leads](/en/guides/b2b-leads).",
    ],
  },
  { h2: "Don't spread thin — stack the best" },
  {
    p: `You don't need all ten. Pick two or three high-intent sources and work them well. For most local businesses that's referrals + Google Business Profile + Facebook groups — all low-cost and high-intent. ${SITE.brand} automates the group piece, sending high-intent leads to your WhatsApp in real time so your best low-cost source runs on autopilot.`,
  },
];

const FAQ = [
  {
    q: "What's the best lead source for a small local business?",
    a: "A stack of three: referrals, Google Business Profile, and Facebook groups. All are low-cost and high-intent. Referrals convert best but can't be scaled on demand, so pair them with GBP and groups for a steady, controllable flow.",
  },
  {
    q: "What's the cheapest source of leads?",
    a: "Organic sources — referrals, Google Business Profile, and Facebook groups — have almost no cost per lead. They require method and speed rather than money, which makes them ideal for businesses on a tight budget.",
  },
  {
    q: "Should I use paid or free lead sources?",
    a: "Start with free, high-intent sources and add paid once you have cash flow and a proven close process. Paid channels scale volume but cost more per customer; free organic channels usually deliver better ROI for small businesses.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["lead-generation", "best-facebook-groups-for-leads", "organic-vs-paid-leads"]} />;
}
