import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "marketing-for-content-creators";
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
  { h2: "Making content ≠ getting paid for it" },
  {
    p: "Plenty of talented content creators struggle to earn, not because their work is weak, but because they treat 'get better at content' as the whole job. The other half is marketing yourself: landing paying clients and brand deals. That's a different skill — positioning, outreach, and being where businesses look for content help. Here's how to turn skill into income.",
  },
  { h2: "Position a clear, sellable offer" },
  {
    p: "\"I make content\" is hard to buy. \"I produce short-form video that grows local businesses' Instagram\" is easy to buy. Pick a niche and a specific outcome, and package it as a clear service with a price. A sharp, specific offer gets far more clients than being a generalist for hire. See [what makes a quality lead](/en/guides/quality-leads) — the same clarity helps you attract the right clients.",
  },
  { h2: "Let your portfolio do the pitching" },
  {
    ul: [
      "**Show results, not just reels** — views, growth, engagement, sales you helped drive.",
      "**Make it easy to see and share** — a simple portfolio link you can drop into any conversation.",
      "**Use testimonials** — a happy client's words sell better than your own.",
    ],
  },
  { h2: "Find businesses that are actively looking" },
  {
    p: "The fastest clients are the ones already searching for content help. Business owners post 'looking for someone to run our social / make videos / shoot content' in local and industry Facebook groups constantly. Being the one who replies first, with a relevant portfolio, wins the gig. See [Facebook group leads](/en/guides/facebook-group-leads) and [B2B lead generation](/en/guides/b2b-leads).",
  },
  { h2: "Outreach and referrals" },
  {
    p: "Beyond inbound, warm outreach works: message local businesses whose content you could obviously improve, lead with a specific idea, not a generic pitch. And ask happy clients for referrals — creative work spreads by word of mouth. Consistency beats blasting: a few thoughtful pitches a day compounds.",
  },
  { h2: "Be first when a business asks for content help" },
  {
    p: `${SITE.brand} scans Facebook groups 24/7 for exactly these requests — 'need a videographer', 'looking for someone to run our socials', 'want a content creator for our brand' — filters them to your niche and area, and sends them to your WhatsApp in real time. You reach out first, portfolio in hand, while the business is still looking. See [how to get your first customers](/en/guides/first-customers-new-business).`,
  },
];

const FAQ = [
  {
    q: "How do content creators find paying clients?",
    a: "Position a clear, niche offer; show a results-focused portfolio; and be where businesses look for content help — local and industry Facebook groups, plus warm outreach. Responding first to 'looking for a content creator' requests is one of the fastest ways to land gigs.",
  },
  {
    q: "How do I get brand deals as a smaller creator?",
    a: "You don't need millions of followers — you need a clear niche and demonstrable results. Pitch brands that fit your audience with a specific idea and proof of engagement. Local businesses are often the most accessible first partners.",
  },
  {
    q: "What's the biggest mistake content creators make with marketing?",
    a: "Focusing only on making content and neglecting the business side — positioning, a clear offer, outreach, and follow-up. Great content that no client can find or easily buy doesn't pay the bills.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["marketing-for-social-media-managers", "facebook-group-leads", "first-customers-new-business"]} />;
}
