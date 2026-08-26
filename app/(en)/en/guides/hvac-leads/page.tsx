import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "hvac-leads";
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
  { h2: "HVAC leads are seasonal, urgent, and pricey" },
  {
    p: "When the AC dies in a July heatwave or the furnace quits in January, it's an emergency — and homeowners will call whoever can come soonest. HVAC is one of the highest-value, highest-competition lead categories in home services, with paid leads regularly running $30–$100+ and mostly shared. The HVAC companies that win aren't the ones with the biggest ad budget — they're the ones who catch fresh, local requests first and convert them fast. Here's how.",
  },
  { h2: "Ride the seasonal spikes" },
  {
    p: "HVAC demand is famously seasonal — AC in summer, heating in winter, with brutal peaks during the first heatwave and first cold snap. During peaks, speed matters even more because everyone's phone is ringing. In shoulder seasons, lean into maintenance plans, tune-ups, and replacements to keep techs busy. A steady, low-cost lead source smooths the swings so you're not idle between seasons. See [leads for service businesses](/en/guides/leads-for-service-businesses).",
  },
  { h2: "Speed wins the no-AC emergency" },
  {
    p: "A homeowner sweating in a house with no AC hires the first company that answers and gives a same-day ETA. That makes response time the single biggest factor in winning HVAC calls. On a shared paid lead you're racing four competitors; on a group post you spotted first, you're the only reply. See [speed to lead](/en/guides/speed-to-lead).",
  },
  { h2: "Where homeowners ask for HVAC help" },
  {
    ul: [
      "**Google (Maps & search)** — 'AC repair near me', 'HVAC company [city]'. Optimize your [Google Business Profile](/en/guides/google-business-profile) and gather reviews.",
      "**Local Facebook groups** — 'AC stopped working, need HVAC help ASAP', 'recommend an HVAC company in [city]', 'furnace won't turn on'. Warm, local, free to answer first. See [Facebook group leads](/en/guides/facebook-group-leads).",
      "**Referrals & maintenance base** — past customers on service plans are your steadiest, cheapest source.",
      "**Paid leads / pay-per-call** — high intent but expensive and often shared. See [why buying leads fails](/en/guides/why-buying-leads-fails).",
    ],
  },
  { h2: "Sell the replacement, not just the repair" },
  {
    p: "The biggest HVAC tickets are system replacements and installs, not $150 repairs. Homeowners weighing a new system research heavily and ask for recommendations in local groups ('AC is 15 years old, thinking of replacing — who do you trust?'). Being the trusted, responsive company that shows up for these high-value leads is where the real margin is. Build trust with reviews, financing options, and clear estimates. See [the price quote that closes](/en/guides/price-quote-that-closes).",
  },
  { h2: "Catch every 'AC is out' post automatically" },
  {
    p: `During a heatwave, 'my AC died, who do I call?' posts flood local groups — and they're answered in minutes. You can't watch them all while on service calls. ${SITE.brand} scans local Facebook groups 24/7, filters for HVAC requests in your area, and pushes them to your WhatsApp instantly — so you're first to reply 'we can come today', without paying for shared leads. See HVAC lead pages for your city on the [HVAC leads hub](/en/leads/hvac).`,
  },
];

const FAQ = [
  {
    q: "How much do HVAC leads cost?",
    a: "Paid HVAC leads commonly run $30–$100+ each and are usually shared, so your effective cost per booked job is higher still. Organic, high-intent leads from Facebook groups, referrals, and a maintenance base cost far less per actual job.",
  },
  {
    q: "How do HVAC companies handle seasonal demand swings?",
    a: "Lean into peaks with fast response and extra capacity, and fill shoulder seasons with maintenance plans, tune-ups, and replacement sales. A steady, low-cost lead source helps keep techs busy year-round instead of feast-or-famine.",
  },
  {
    q: "What's the most valuable HVAC lead?",
    a: "System replacements and installs — far bigger tickets than repairs. Homeowners research these and ask for recommendations in local groups, so being the responsive, trusted company that reaches them first captures the highest-margin work.",
  },
];

export default function Page() {
  return (
    <GuideLayoutEn
      slug={SLUG}
      blocks={BLOCKS}
      faq={FAQ}
      related={["plumber-leads", "electrician-leads", "leads-for-service-businesses"]}
    />
  );
}
