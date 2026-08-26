import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "garage-door-leads";
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
  { h2: "Stuck doors are urgent — installs are the big tickets" },
  {
    p: "A garage door that won't open (or won't close) traps a car and leaves a home insecure — so repairs are urgent and the first responder usually wins. On top of that, broken-spring repairs, opener replacements, and new door installs are solid tickets. Garage door demand is a healthy mix of fast emergency calls and higher-value projects. Here's how to capture both.",
  },
  { h2: "Speed wins the repair" },
  {
    p: "A homeowner with a stuck door or a snapped spring wants it handled today and calls whoever answers first with an ETA. Response speed is the biggest lever you control. See [speed to lead](/en/guides/speed-to-lead).",
  },
  { h2: "Trust and safety close it" },
  {
    ul: [
      "**Reviews and clear pricing** win over a cheaper unknown — garage door repair has its share of upsell-heavy operators.",
      "**Emphasize safety** — springs and openers are dangerous to DIY, which is why homeowners call a pro.",
      "**Offer installs and upgrades** — new doors and smart openers are the high-margin work.",
    ],
  },
  { h2: "Where homeowners ask for garage door help" },
  {
    ul: [
      "**Local Facebook groups** — 'garage door won't open, need help', 'recommend a garage door company in [city]', 'broken spring repair'. Urgent, warm, local. See [Facebook group leads](/en/guides/facebook-group-leads).",
      "**Google Business Profile & reviews** — 'garage door repair near me'. See [the GBP guide](/en/guides/google-business-profile).",
      "**Referrals** — from realtors, builders, and past customers.",
    ],
  },
  { h2: "Catch every garage door request automatically" },
  {
    p: `Stuck-door posts hit local groups the moment they happen — and get answered fast. ${SITE.brand} scans local Facebook groups 24/7, filters for garage-door requests in your area, and sends them to your WhatsApp instantly — so you're first to reply. See garage-door lead pages for your city on the [garage door leads hub](/en/leads/garage-door).`,
  },
];

const FAQ = [
  {
    q: "How do garage door companies get more leads?",
    a: "Win urgent repairs on speed (first to reply with an ETA), and pursue higher-margin opener replacements and new-door installs. Back it with reviews, clear pricing, and monitoring of local Facebook groups for stuck-door and broken-spring posts.",
  },
  {
    q: "What's the most valuable garage door work?",
    a: "New door installs and opener upgrades are the big tickets, while spring and opener repairs provide steady urgent volume. A good mix of fast emergency response and install sales keeps the business healthy.",
  },
  {
    q: "Where do garage door leads come from?",
    a: "Local Facebook groups (urgent 'door won't open' posts), a strong Google Business Profile, and referrals from realtors and builders are the best low-cost, high-intent sources.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["leads-for-service-businesses", "speed-to-lead", "appliance-repair-leads"]} />;
}
