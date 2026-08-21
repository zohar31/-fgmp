import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "plumber-leads";
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
  { h2: "Plumbing leads are urgent, local, and expensive" },
  {
    p: "A burst pipe or a backed-up drain isn't a someday problem — it's a right-now emergency. That urgency makes plumbing one of the highest-intent trades there is, and also one of the most expensive to advertise in: paid plumbing leads regularly run $25–$100+, and most are shared with several other plumbers. The winning plumbers aren't the ones who buy the most leads — they're the ones who reach fresh, local requests first, for far less. Here's how.",
  },
  { h2: "Speed wins the job" },
  {
    p: "For emergency plumbing, the first plumber to answer and give an ETA usually gets the call — homeowners with water on the floor hire fast. That makes response time the single biggest lever you control. On a shared paid lead you're one of five calls; on a group post you spotted first, you're the only reply. Either way, being fast beats being cheapest. See [speed to lead](/en/guides/speed-to-lead).",
  },
  { h2: "Where homeowners ask for a plumber" },
  {
    ul: [
      "**Google (Maps & search)** — 'plumber near me' at the moment of a problem. Optimize your [Google Business Profile](/en/guides/google-business-profile) and pile up reviews.",
      "**Local Facebook groups** — 'need a plumber ASAP', 'who's a good plumber in [city]?', 'recommend a plumber for a water heater' appear daily. Warm, local, free to answer first. See [Facebook group leads](/en/guides/facebook-group-leads).",
      "**Referrals** — from past customers, realtors, and property managers. Steady and exclusive.",
      "**Paid leads / pay-per-call** — available but pricey and usually shared. See [why buying leads fails](/en/guides/why-buying-leads-fails).",
    ],
  },
  { h2: "Trust and reviews close it" },
  {
    p: "People are letting a stranger into their home during a stressful moment, so trust is everything. A steady flow of recent 5-star reviews, clear licensing and insurance, and upfront pricing all reassure a homeowner and win the call over a cheaper unknown. Ask every satisfied customer for a review while the fix is fresh in their mind.",
  },
  { h2: "Don't ignore the non-emergency work" },
  {
    p: "Beyond emergencies there's steady, schedulable, higher-margin work: water heater replacements, repipes, fixture installs, remodels, and maintenance. Homeowners ask about these in local groups too ('planning a bathroom remodel, need a good plumber'). These leads are calmer, higher-value, and easier to book than 2am emergencies — a great balance to your schedule. See [leads for service businesses](/en/guides/leads-for-service-businesses).",
  },
  { h2: "Catch every 'need a plumber' post automatically" },
  {
    p: `You can't watch every local group while you're under a sink. ${SITE.brand} scans local Facebook groups 24/7, filters for plumbing requests in your service area, and pushes them to your WhatsApp in under a minute — so you're the first to reply 'I can be there today', without paying $80 a shared lead. See plumber lead pages for your city on the [plumbing leads hub](/en/leads/plumber).`,
  },
];

const FAQ = [
  {
    q: "How much do plumbing leads cost?",
    a: "Paid plumbing leads commonly run $25–$100+ each and are usually shared with several plumbers, so your effective cost per booked job is much higher. Organic, high-intent leads from Facebook groups and referrals cost far less per actual job.",
  },
  {
    q: "How do plumbers get more jobs without overpaying for leads?",
    a: "Win on speed and trust: answer fast (emergencies go to the first responder), optimize your Google Business Profile with strong reviews, and monitor local Facebook groups for 'need a plumber' posts. Referrals from realtors and property managers add a steady, exclusive stream.",
  },
  {
    q: "What's the most important factor in winning plumbing jobs?",
    a: "Response speed for emergencies — a homeowner with a leak hires whoever answers first with an ETA. Combined with reviews and clear pricing, being fast and reachable beats being the cheapest option.",
  },
];

export default function Page() {
  return (
    <GuideLayoutEn
      slug={SLUG}
      blocks={BLOCKS}
      faq={FAQ}
      related={["electrician-leads", "hvac-leads", "leads-for-service-businesses"]}
    />
  );
}
