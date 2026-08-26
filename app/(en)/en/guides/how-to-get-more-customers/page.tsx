import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";
import { SITE_EN } from "@/lib/config-en";

const SLUG = "how-to-get-more-customers";
const g = getGuideEn(SLUG)!;
const URL = `${SITE.url}/en/guides/${SLUG}`;

export const metadata: Metadata = {
  title: g.title,
  description: g.description,
  keywords: g.keywords,
  alternates: { canonical: URL, languages: { "en-US": URL } },
  openGraph: { type: "article", locale: "en_US", title: g.title, description: g.description, url: URL },
};

const P = SITE_EN.pricing.monthlyUSD;
const R = SITE_EN.pricing.refundDays;

const BLOCKS: Block[] = [
  { h2: "More customers isn't about a bigger budget" },
  {
    p: "A small business can't outspend the big players — and doesn't need to. What you have instead: speed (you respond in minutes, not days), personality (customers talk to you, not a call center), and focus (you don't need thousands of leads, just the right ones). This guide builds more customers around those advantages, without a big ad budget.",
  },
  { h2: "The 7 fastest, lowest-cost ways to get customers" },
  {
    ol: [
      "**Facebook groups** — people in your area ask for recommendations every day. The warmest, cheapest source. [How it works](/en/guides/facebook-group-leads).",
      "**Google Business Profile** — free, and puts you on the local map. Essential. [Guide](/en/guides/google-business-profile).",
      "**Ask for referrals** — the highest-quality customers. Ask every happy customer directly.",
      "**Respond first** — [the first 5 minutes](/en/guides/speed-to-lead) win the job.",
      "**Reviews** — social proof closes customers on autopilot. Ask for a review after every job.",
      "**Simple content** — one before-and-after post or tip builds trust faster than an ad.",
      "**Repeat & win-back customers** — cheaper than finding new ones. Stay in touch.",
    ],
  },
  { h2: "Speed is your unfair advantage" },
  {
    p: "A big company responds to a lead in two days through a call center. You can respond in five minutes, personally. That's exactly what decides who wins: [whoever responds first](/en/guides/speed-to-lead), most of the time — not the biggest or cheapest, the fastest.",
  },
  { h2: "Don't spend on ads before you fix the leaks" },
  {
    p: "A business that rushes to pay for leads before it has fast response and follow-up is pouring money into a bucket with holes. First build the basics — an organic source, quick replies, and follow-up. Then add budget.",
  },
  { h2: "The simplest way to a steady stream of customers" },
  {
    p: `You don't have time to watch 20 Facebook groups — you're busy running the business. [${SITE.brand} does it for you](/en/leads): it scans 50,000+ groups and sends every relevant request in your area and trade to your WhatsApp, in under a minute, with a ready reply. $${P}/month flat, no per-lead fees, ${R}-day money-back guarantee — built for a small business that's careful with money.`,
  },
];

const FAQ = [
  {
    q: "How can I get customers with no advertising budget?",
    a: "Absolutely possible. The best channels for a small business are the cheap ones: Facebook group leads, Google Business Profile (free), and referrals. Paid ads add volume, but you can build a healthy customer stream without them.",
  },
  {
    q: "What's the fastest way to get new customers?",
    a: "Real-time Facebook-group requests plus fast response. People post asking for services daily; catching those posts and replying first is the fastest path to new customers — which is exactly what FGMP automates.",
  },
  {
    q: "How long until I see new customers?",
    a: "With fast organic channels (groups, Google Business Profile, referrals) you can see inquiries within days to weeks. The key is speed of response and being where customers are looking.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["lead-generation", "facebook-group-leads", "speed-to-lead"]} />;
}
