import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "carpenter-leads";
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
  { h2: "Carpentry sells on craftsmanship" },
  {
    p: "From custom built-ins and trim to decks, framing, and remodels, carpentry is judged by the quality of the work. That means your best marketing isn't an ad — it's proof of what you can build. Homeowners hire the carpenter whose past work looks like what they want and who they trust to do it cleanly. Here's how carpenters turn that into a full schedule of good jobs.",
  },
  { h2: "Let your portfolio do the pitching" },
  {
    ul: [
      "**Photos of finished work** — built-ins, trim, decks, custom pieces. Your gallery closes jobs before you say a word.",
      "**Reviews** — reassure homeowners on custom, higher-ticket work.",
      "**A clear, itemized quote** — materials, labor, timeline. See [the price quote that closes](/en/guides/price-quote-that-closes).",
    ],
  },
  { h2: "Where homeowners ask for a carpenter" },
  {
    ul: [
      "**Local Facebook groups** — 'need a carpenter for custom shelves', 'recommend someone for trim/finish work', 'deck builder in [city]'. Warm, local, free to answer first. See [Facebook group leads](/en/guides/facebook-group-leads).",
      "**Google Business Profile & reviews** — 'carpenter near me'. See [the GBP guide](/en/guides/google-business-profile).",
      "**Referrals** — from general contractors, designers, realtors, and past clients.",
    ],
  },
  { h2: "Respond fast, quote clearly" },
  {
    p: "Homeowners planning custom work contact a few carpenters and lean toward the one who replies quickly and sends a clear, professional quote. Speed plus a strong portfolio beats a lower bid that arrives late. See [speed to lead](/en/guides/speed-to-lead).",
  },
  { h2: "Catch every carpentry request automatically" },
  {
    p: `Custom-work requests appear in local groups and get several replies fast. ${SITE.brand} scans local Facebook groups 24/7, filters for carpentry requests in your area, and sends them to your WhatsApp instantly — so you're first to reply with your portfolio. See carpentry lead pages for your city on the [carpenter leads hub](/en/leads/carpenter).`,
  },
];

const FAQ = [
  {
    q: "How do carpenters get more jobs?",
    a: "Show your work: a strong photo portfolio plus reviews wins custom and finish jobs. Respond fast, send clear itemized quotes, and monitor local Facebook groups and referrals from contractors, designers, and past clients for high-intent, low-cost leads.",
  },
  {
    q: "What's the best way to win custom carpentry work?",
    a: "Proof and trust. Homeowners choose the carpenter whose past work matches what they want and who communicates clearly. Photos, reviews, and a detailed quote beat the lowest bid on higher-ticket custom jobs.",
  },
  {
    q: "Where do carpenters find leads?",
    a: "Local Facebook groups (people ask for carpenters constantly), a strong Google Business Profile, and referrals from general contractors, interior designers, and realtors are the best low-cost, high-intent sources.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["leads-for-service-businesses", "price-quote-that-closes", "marketing-for-contractors"]} />;
}
