import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "pest-control-leads";
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
  { h2: "Urgent problems, recurring revenue" },
  {
    p: "Pest control has a great business shape: the initial problem is urgent (nobody lives with roaches or a wasp nest), and the solution is naturally recurring (quarterly or monthly plans keep pests away). That means high-intent leads that convert fast and turn into steady, contracted revenue. The winners reach worried homeowners first and convert one-time calls into ongoing plans. Here's how.",
  },
  { h2: "Urgency drives the first call" },
  {
    p: "A homeowner who just saw a rat, roaches, bed bugs, or a wasp nest wants it gone now — and calls whoever answers first and can come soon. That makes response speed critical: the first pro to reply with a same-day or next-day slot usually wins. See [speed to lead](/en/guides/speed-to-lead).",
  },
  { h2: "Convert the one-off into a plan" },
  {
    ul: [
      "**Lead with a plan** — solve today's problem and offer ongoing protection as the default.",
      "**Recurring contracts** smooth revenue and are far cheaper than constantly finding new customers.",
      "**Seasonal upsells** — mosquitoes in summer, rodents in fall — keep plans active year-round.",
    ],
  },
  { h2: "Trust closes it" },
  {
    p: "People want a licensed, safe, effective pro handling chemicals around their family and pets. Recent reviews, licensing, and clear communication about safety win the job over a cheaper unknown. Ask every satisfied customer for a review.",
  },
  { h2: "Where homeowners ask for pest control" },
  {
    ul: [
      "**Local Facebook groups** — 'need an exterminator ASAP', 'recommend pest control in [city]', 'who do you use for ants/roaches/mice?'. Urgent, warm, local. See [Facebook group leads](/en/guides/facebook-group-leads).",
      "**Google Business Profile & reviews** — 'pest control near me'. See [the GBP guide](/en/guides/google-business-profile).",
      "**Referrals & property managers** — landlords and property managers are a steady, high-volume source.",
    ],
  },
  { h2: "Catch every 'need an exterminator' post automatically" },
  {
    p: `Pest problems are posted in local groups the moment they happen — and answered fast. ${SITE.brand} scans local Facebook groups 24/7, filters for pest-control requests in your area, and sends them to your WhatsApp instantly — so you're first to respond and can turn the urgent call into a recurring plan. See pest-control lead pages for your city on the [pest control leads hub](/en/leads/pest-control).`,
  },
];

const FAQ = [
  {
    q: "How do pest control companies get more leads?",
    a: "Win on speed (urgent problems go to the first responder), convert one-off calls into recurring plans, and build trust with reviews and licensing. Local Facebook groups, a strong Google Business Profile, and property-manager referrals are the best low-cost sources.",
  },
  {
    q: "Why are recurring plans so important in pest control?",
    a: "Because they turn a one-time urgent job into steady, predictable revenue and ongoing protection for the customer. Recurring contracts are far cheaper to keep than constantly acquiring new one-off customers, and seasonal needs keep them active.",
  },
  {
    q: "Where's the best place to find pest control leads?",
    a: "Local Facebook groups, where homeowners post urgent pest problems and ask for recommendations, are ideal — high intent and low cost. Combined with a strong Google Business Profile and property-manager relationships, they provide a steady stream.",
  },
];

export default function Page() {
  return (
    <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["leads-for-service-businesses", "speed-to-lead", "landscaping-leads"]} />
  );
}
