import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "google-business-profile";
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
  { h2: "Why every local business needs a Google Business Profile" },
  {
    p: "When someone searches \"plumber near me\" or \"electrician in Austin,\" Google shows the local **3-pack** first — the top three local businesses on Google Maps. Google Business Profile (GBP, formerly Google My Business) decides whether you're one of them. It's free, and it takes about an hour to set up right.",
  },
  { h2: "Step 1: Set up and verify" },
  {
    ol: [
      "Create a profile at google.com/business with your exact business name.",
      "Choose an accurate **primary category** ('Plumber', not 'Contractor') plus secondary categories.",
      "Set your service area (if you go to customers) or address (if you have a storefront).",
      "**Verify** the business — Google sends a code (postcard/phone/video). Without verification, you won't rank.",
    ],
  },
  { h2: "Step 2: Optimize (what moves the ranking)" },
  {
    ul: [
      "**Complete description with keywords** — naturally include your service and area.",
      "**Quality photos** — profiles with 10+ photos get far more clicks. Add work, team, logo.",
      "**Accurate hours** — including holidays.",
      "**Services & products** — fill out your full service list.",
    ],
  },
  { h2: "Step 3: Reviews — the fuel of local ranking" },
  {
    p: "Reviews are the #1 factor in local ranking. Ask every happy customer for a review (send a direct link), and reply to every review — positive and negative. A business with 30 reviews at 4.8 stars beats a competitor with 3, even if the competitor is cheaper.",
  },
  { h2: "Step 4: Posts and updates" },
  {
    p: "Post to your GBP every week or two (an offer, a new job, a tip). It signals to Google that the business is active and boosts visibility. Consistency matters more than volume.",
  },
  { h2: "GBP + organic leads = full local coverage" },
  {
    p: `GBP captures people searching Google. But a large share of customers ask in Facebook groups, not Google. To cover both, pair your profile with [Facebook-group lead monitoring](/en/guides/facebook-group-leads) — GBP for searchers, ${SITE.brand} for people asking in communities. Together they cover the whole local search map. Compare in [organic vs. paid leads](/en/guides/organic-vs-paid-leads).`,
  },
];

const FAQ = [
  {
    q: "How long until my Google Business Profile ranks?",
    a: "Verification takes days to a couple of weeks. Ranking in the 3-pack develops over weeks to months as you gain reviews, photos, and activity. A new business can enter the map within a month or two in a less-competitive area.",
  },
  {
    q: "What matters most for local ranking?",
    a: "Relevance (correct category and keywords), distance (proximity to the searcher), and prominence (reviews, activity, mentions). You have the most control over reviews and activity — focus there.",
  },
  {
    q: "Is Google Business Profile enough for leads?",
    a: "It's excellent for people searching Google, but it's one channel. Many customers ask in Facebook groups and never search Google. For full coverage, combine GBP with group-lead monitoring and other sources.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["how-to-get-more-customers", "facebook-group-leads", "lead-generation"]} />;
}
