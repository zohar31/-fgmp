import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "marketing-for-social-media-managers";
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
  { h2: "The irony of the social media manager" },
  {
    p: "You can grow anyone's audience but your own client list — because managing social media and selling social media services are two different jobs. Getting clients is about positioning, proof, and being where business owners look for help. Here's how to build a steady pipeline of clients instead of feast-or-famine freelancing.",
  },
  { h2: "Niche down to stand out" },
  {
    p: "\"I do social media\" competes with everyone. \"I run Instagram and TikTok for local restaurants\" is memorable and referable. A niche makes your marketing sharper, your results more repeatable, and your pricing easier to justify. You can always broaden later — but a clear niche is how you get traction now.",
  },
  { h2: "Prove ROI, not activity" },
  {
    ul: [
      "**Show business outcomes** — followers that became customers, engagement that drove bookings, sales you influenced.",
      "**Use case studies** — 'grew this café's Instagram to X and filled slow weeknights' beats 'I post nice content'.",
      "**Collect testimonials** — client words are your strongest sales asset.",
    ],
  },
  { h2: "Package your service and price with confidence" },
  {
    p: "Turn your work into clear packages (e.g. Starter / Growth / Full Management) with defined deliverables and prices. Packages make you easy to buy, stop every deal from becoming a custom negotiation, and let you handle the price conversation calmly. See [handling the price objection](/en/guides/price-objection).",
  },
  { h2: "Find business owners who need you now" },
  {
    p: "Business owners constantly post 'we need help with our social media' or 'looking for someone to manage our Instagram' in local and industry Facebook groups. These are your warmest leads — active intent, ready to hire. Being first to reply with a relevant case study wins the client. See [Facebook group leads](/en/guides/facebook-group-leads) and [B2B leads](/en/guides/b2b-leads).",
  },
  { h2: "Never miss a 'need a social media manager' post" },
  {
    p: `${SITE.brand} monitors Facebook groups 24/7 for exactly these requests, filters them to your niche and area, and sends them to your WhatsApp in real time — so you can pitch first, while the business is actively looking, instead of finding the post two days late. See [marketing for content creators](/en/guides/marketing-for-content-creators).`,
  },
];

const FAQ = [
  {
    q: "How do social media managers get clients?",
    a: "Niche down, prove ROI with case studies and testimonials, package your service with clear pricing, and be where business owners ask for help — local and industry Facebook groups plus warm outreach. Responding first to 'need a social media manager' posts is a fast path to clients.",
  },
  {
    q: "Do I need a big following to get social media clients?",
    a: "No. Clients hire you to grow their accounts, not to admire yours. What matters is demonstrable results for other businesses, a clear niche, and proof you can deliver — case studies beat follower counts.",
  },
  {
    q: "How should I price social media management?",
    a: "Use clear packages with defined deliverables (e.g. Starter / Growth / Full Management) rather than custom-quoting every deal. Packages make you easy to buy and keep the price conversation simple and confident.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["marketing-for-content-creators", "b2b-leads", "facebook-group-leads"]} />;
}
