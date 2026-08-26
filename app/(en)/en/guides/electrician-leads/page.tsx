import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "electrician-leads";
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
  { h2: "Electrical work is trust-heavy and local" },
  {
    p: "Homeowners don't gamble on electrical work — a bad job is a fire hazard. They want a licensed, insured, trustworthy pro, and often they want them fast. That combination makes electrician leads high-intent and valuable, and it means the electricians who win aren't the cheapest — they're the ones who look legitimate, respond quickly, and are easy to find when someone needs them. Here's how to get more of that work.",
  },
  { h2: "Lead with licensing and trust" },
  {
    ul: [
      "**Show your license and insurance** early — it's the first thing a nervous homeowner checks.",
      "**Reviews are decisive** — a steady stream of recent 5-star reviews beats a lower quote from an unknown. Ask every customer.",
      "**Clear, professional communication** signals a pro who won't cut corners on safety.",
    ],
  },
  { h2: "Speed wins emergencies (and a lot of the rest)" },
  {
    p: "Power outages, sparking outlets, and dead panels are urgent — the first electrician to respond with an ETA usually gets the job. Even for non-emergency work, homeowners contact several electricians and lean toward the one who replies fast and professionally. Response time is the biggest lever you fully control. See [speed to lead](/en/guides/speed-to-lead).",
  },
  { h2: "Where homeowners ask for an electrician" },
  {
    ul: [
      "**Google (Maps & search)** — 'electrician near me', 'panel upgrade [city]'. Optimize your [Google Business Profile](/en/guides/google-business-profile).",
      "**Local Facebook groups** — 'need a licensed electrician', 'who's good for a panel upgrade in [city]?', 'recommend an electrician for EV charger install'. Warm, local, free to answer first. See [Facebook group leads](/en/guides/facebook-group-leads).",
      "**Referrals** — from general contractors, realtors, and past clients. Steady and exclusive.",
      "**Paid leads** — available but expensive and often shared. See [why buying leads fails](/en/guides/why-buying-leads-fails).",
    ],
  },
  { h2: "The high-value work is scheduled, not urgent" },
  {
    p: "Panel upgrades, rewires, EV charger installs, generator hookups, lighting, and remodels are higher-margin and schedulable — and demand is growing (especially EV chargers and home electrification). Homeowners research these in local groups before hiring ('adding an EV charger, need a good electrician'). These calmer, higher-value leads balance out emergency calls nicely. See [leads for service businesses](/en/guides/leads-for-service-businesses).",
  },
  { h2: "Never miss an electrician request" },
  {
    p: `You can't monitor every local group while you're on a job. ${SITE.brand} scans local Facebook groups 24/7, filters for electrician requests in your area, and sends them to your WhatsApp instantly — so you're the first licensed pro to reply, while the homeowner is still looking. See electrician lead pages for your city on the [electrician leads hub](/en/leads/electrician).`,
  },
];

const FAQ = [
  {
    q: "How do electricians get more leads?",
    a: "Lead with trust (license, insurance, reviews) and win on speed. Optimize your Google Business Profile, collect reviews relentlessly, respond fast to emergencies, and monitor local Facebook groups for 'need an electrician' posts. Referrals from contractors and realtors add a steady, exclusive stream.",
  },
  {
    q: "Why do homeowners care so much about licensing for electrical work?",
    a: "Because bad electrical work is a safety and fire risk. Homeowners screen for licensed, insured pros before anything else, which is why showing your credentials and reviews early wins the job over a cheaper unlicensed option.",
  },
  {
    q: "What electrical work is most worth chasing?",
    a: "Higher-margin, schedulable jobs — panel upgrades, rewires, EV charger installs, generator hookups, and remodels. Demand for home electrification and EV chargers is growing, and homeowners often ask for recommendations in local groups before hiring.",
  },
];

export default function Page() {
  return (
    <GuideLayoutEn
      slug={SLUG}
      blocks={BLOCKS}
      faq={FAQ}
      related={["plumber-leads", "hvac-leads", "leads-for-service-businesses"]}
    />
  );
}
