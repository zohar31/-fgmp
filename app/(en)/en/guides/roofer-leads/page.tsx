import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "roofer-leads";
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
  { h2: "Roofing leads are big-ticket — and brutally competitive" },
  {
    p: "A single roof replacement can be worth five figures, so roofing is one of the most valuable — and most competitive — lead categories in home services. Paid roofing leads regularly top $50–$150+ each, and most are shared. The roofers who win aren't the ones who buy the most leads; they're the ones who reach fresh, local homeowners first and win the job on trust rather than the lowest bid. Here's how.",
  },
  { h2: "The storm-and-insurance opportunity" },
  {
    p: "After a hailstorm or high winds, whole neighborhoods need roof inspections and repairs at once — and many jobs are covered by insurance. Being the roofer who's visible and responsive right after a storm captures a surge of high-intent work. Homeowners flood local Facebook groups with 'anyone good for storm damage?' and 'need a roof inspection after the hail' — catch those fast and you win the season.",
  },
  { h2: "Win on trust, not price" },
  {
    ul: [
      "**Reviews and photos** — before/after shots and recent 5-star reviews are decisive on a big-ticket job.",
      "**Licensing, insurance, and warranties** — reassure a homeowner making an expensive, high-stakes decision.",
      "**A clear, itemized estimate** beats a vague low bid that balloons. See [the price quote that closes](/en/guides/price-quote-that-closes).",
    ],
  },
  { h2: "Speed still matters" },
  {
    p: "Homeowners with a leak or storm damage contact several roofers and lean toward the one who responds fast and professionally. On a shared paid lead you're one of many calls; on a group post you spotted first, you're the trusted first reply. See [speed to lead](/en/guides/speed-to-lead).",
  },
  { h2: "Where homeowners ask for a roofer" },
  {
    ul: [
      "**Local Facebook groups** — 'need a roofer for a leak', 'recommend a roofing company', 'roof estimate in [city]'. Warm, local, free to answer first. See [Facebook group leads](/en/guides/facebook-group-leads).",
      "**Google Business Profile & reviews** — 'roofer near me' at the moment of need. See [the GBP guide](/en/guides/google-business-profile).",
      "**Referrals** — from realtors, insurance adjusters, and past customers.",
    ],
  },
  { h2: "Catch every roof request automatically" },
  {
    p: `You can't watch every local group after a storm while you're on a roof. ${SITE.brand} scans local Facebook groups 24/7, filters for roofing requests in your area, and sends them to your WhatsApp in under a minute — so you're first to respond, without paying $100+ a shared lead. See roofing lead pages for your city on the [roofing leads hub](/en/leads/roofer).`,
  },
];

const FAQ = [
  {
    q: "How much do roofing leads cost?",
    a: "Paid roofing leads are among the priciest in home services — often $50–$150+ each and usually shared. Because the tickets are large, that can still work, but organic, high-intent leads from Facebook groups and referrals deliver a far lower cost per booked job.",
  },
  {
    q: "How do roofers get storm-damage leads?",
    a: "Be visible and responsive right after storms — homeowners rush to local groups asking for inspections and repairs, many insurance-covered. Monitoring those groups and responding first captures a surge of high-intent, high-value work.",
  },
  {
    q: "How do roofers compete without being the cheapest?",
    a: "Win on trust: strong reviews, before/after photos, clear licensing, insurance, and warranties, plus a professional itemized estimate. On a big-ticket roof, homeowners fear a bad job more than a higher price.",
  },
];

export default function Page() {
  return (
    <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["plumber-leads", "hvac-leads", "leads-for-service-businesses"]} />
  );
}
