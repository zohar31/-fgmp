import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "painter-leads";
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
  { h2: "Painting jobs are won on trust and the quote" },
  {
    p: "Interior and exterior painting are mid-to-large tickets where the homeowner is choosing between several bids. They rarely pick purely on price — they pick the painter they trust to do clean, careful work and show up. That means your reviews, your portfolio, and the quality of your quote decide the job as much as your number. Here's how painters turn more leads into booked work.",
  },
  { h2: "Let your work sell for you" },
  {
    ul: [
      "**Before/after photos** — painting is visual; a strong gallery is your best salesperson.",
      "**Recent reviews** — reassure a homeowner inviting a crew into their home for days.",
      "**A clear, itemized quote** — surfaces, prep, coats, paint quality, timeline. See [the price quote that closes](/en/guides/price-quote-that-closes).",
    ],
  },
  { h2: "Mind the seasonality" },
  {
    p: "Exterior painting peaks in warm, dry months and slows in winter; interior work helps fill the off-season. Lean into peaks with fast response and enough crew, and keep interior and cabinet work flowing when it's cold. A steady lead source smooths the swings. See [leads for service businesses](/en/guides/leads-for-service-businesses).",
  },
  { h2: "Where homeowners ask for a painter" },
  {
    ul: [
      "**Local Facebook groups** — 'need a painter for my living room', 'recommend a painting company in [city]', 'exterior paint estimate'. Warm, local, free to answer first. See [Facebook group leads](/en/guides/facebook-group-leads).",
      "**Google Business Profile & reviews** — 'painter near me'. See [the GBP guide](/en/guides/google-business-profile).",
      "**Referrals** — from realtors (pre-sale touch-ups), designers, and past clients.",
    ],
  },
  { h2: "Respond fast, quote sharp" },
  {
    p: "Homeowners collecting painting bids lean toward the painter who responds quickly and sends a clear, professional quote first. Speed plus a strong quote beats a lower number that arrives late and vague. See [speed to lead](/en/guides/speed-to-lead).",
  },
  { h2: "Catch every painting request automatically" },
  {
    p: `Painting requests appear in local groups and get multiple replies fast. ${SITE.brand} scans local Facebook groups 24/7, filters for painting requests in your area, and sends them to your WhatsApp instantly — so you're first to reply with your portfolio and lock in the estimate. See painting lead pages for your city on the [painting leads hub](/en/leads/painter).`,
  },
];

const FAQ = [
  {
    q: "How do painters get more leads?",
    a: "Lead with visual proof (before/after photos) and reviews, respond fast, and send a clear itemized quote. Local Facebook groups, a strong Google Business Profile, and referrals from realtors and past clients are the best low-cost sources.",
  },
  {
    q: "How do painters handle the slow season?",
    a: "Shift to interior, cabinet, and trim work when exterior painting slows in cold or wet months. A steady lead source and repeat/referral business help keep crews busy year-round instead of feast-or-famine.",
  },
  {
    q: "How do painters win jobs without being the cheapest?",
    a: "Homeowners choose the painter they trust for clean, careful work. Strong photos, recent reviews, professional communication, and a detailed quote (prep, coats, paint quality, timeline) win over a vague low bid.",
  },
];

export default function Page() {
  return (
    <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["leads-for-service-businesses", "price-quote-that-closes", "marketing-for-contractors"]} />
  );
}
