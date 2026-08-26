import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "pressure-washing-leads";
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
  { h2: "The before/after photo IS the marketing" },
  {
    p: "Pressure washing has the most satisfying results in home services — a grimy driveway or a green-streaked house turns spotless. That makes your before/after photos the single most powerful marketing asset you have. Homeowners see the transformation and immediately want it for their own place. Here's how pressure washing pros turn that visual appeal into a full schedule.",
  },
  { h2: "Show dramatic results everywhere" },
  {
    ul: [
      "**Before/after photos and short videos** — post them constantly; they sell the service on their own.",
      "**Reviews** — quick trust for a low-consideration purchase.",
      "**Clear per-service pricing** (driveway, house wash, deck, roof) makes booking easy.",
    ],
  },
  { h2: "Ride the seasonality" },
  {
    p: "Demand peaks in spring and summer (curb appeal, pre-sale, spring cleaning) and slows in winter in many regions. Lean into the warm-season surge with fast response and enough capacity, and pursue commercial accounts (storefronts, HOAs, property managers) for steadier year-round work. See [leads for service businesses](/en/guides/leads-for-service-businesses).",
  },
  { h2: "Where homeowners ask for pressure washing" },
  {
    ul: [
      "**Local Facebook groups** — 'need my driveway pressure washed', 'recommend a power washing company in [city]', 'house wash before selling'. Warm, local, free to answer first. See [Facebook group leads](/en/guides/facebook-group-leads).",
      "**Google Business Profile & reviews** — 'pressure washing near me'. See [the GBP guide](/en/guides/google-business-profile).",
      "**Referrals & neighborhood clustering** — one clean driveway sells the neighbors; ask for referrals nearby.",
    ],
  },
  { h2: "Catch every request automatically" },
  {
    p: `Pressure-washing requests fill local groups every spring — and get answered fast. ${SITE.brand} scans local Facebook groups 24/7, filters for pressure-washing requests in your area, and sends them to your WhatsApp instantly — so you're first to reply with your before/after gallery. See pressure-washing lead pages for your city on the [pressure washing leads hub](/en/leads/pressure-washing).`,
  },
];

const FAQ = [
  {
    q: "How do pressure washing companies get more leads?",
    a: "Lead with dramatic before/after photos and videos everywhere, keep clear per-service pricing, and respond fast. Local Facebook groups, a strong Google Business Profile, and neighborhood referrals are the best low-cost, high-intent sources.",
  },
  {
    q: "How do pressure washing pros handle the slow season?",
    a: "Lean into the spring/summer surge, and pursue commercial accounts — storefronts, HOAs, and property managers — for steadier year-round work when residential demand dips in colder months.",
  },
  {
    q: "Why are before/after photos so important for pressure washing?",
    a: "Because the result is dramatic and instantly understood. A grimy-to-spotless photo does the selling for you — homeowners see it and want the same for their driveway, house, or deck, making visual proof your top marketing asset.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["leads-for-service-businesses", "landscaping-leads", "junk-removal-leads"]} />;
}
