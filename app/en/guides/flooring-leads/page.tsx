import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "flooring-leads";
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
  { h2: "Flooring is a big-ticket, quote-driven job" },
  {
    p: "Whether it's hardwood, LVP, tile, or carpet, flooring is a mid-to-large project where the homeowner collects a few bids and chooses on trust, quality, and a clear estimate. They're picturing the finished room, so your portfolio and the professionalism of your quote matter as much as the number. Here's how flooring installers turn more leads into booked jobs.",
  },
  { h2: "Sell with proof and clarity" },
  {
    ul: [
      "**Photos of finished floors** — different materials and rooms; help the homeowner picture the result.",
      "**Reviews** — reassure on a large, disruptive project.",
      "**A clear, itemized quote** — material, underlayment, removal/disposal, labor, timeline. See [the price quote that closes](/en/guides/price-quote-that-closes).",
    ],
  },
  { h2: "Guide the material choice" },
  {
    p: "Homeowners are often unsure between options (hardwood vs. LVP vs. tile). Being the installer who explains trade-offs clearly — durability, cost, moisture, pets — builds trust and positions you as the expert, not just a price. That guidance often wins the job over a cheaper bid that just quotes a number.",
  },
  { h2: "Where homeowners ask for flooring" },
  {
    ul: [
      "**Local Facebook groups** — 'need flooring installed', 'recommend a flooring company in [city]', 'LVP install estimate'. Warm, local, free to answer first. See [Facebook group leads](/en/guides/facebook-group-leads).",
      "**Google Business Profile & reviews** — 'flooring installer near me'. See [the GBP guide](/en/guides/google-business-profile).",
      "**Referrals** — from realtors, general contractors, and past clients.",
    ],
  },
  { h2: "Respond fast, quote sharp" },
  {
    p: "Homeowners collecting flooring bids lean toward the installer who responds quickly and sends a clear, professional estimate first. See [speed to lead](/en/guides/speed-to-lead).",
  },
  { h2: "Catch every flooring request automatically" },
  {
    p: `Flooring requests appear in local groups and get several replies fast. ${SITE.brand} scans local Facebook groups 24/7, filters for flooring requests in your area, and sends them to your WhatsApp instantly — so you're first to reply with your portfolio. See flooring lead pages for your city on the [flooring leads hub](/en/leads/flooring).`,
  },
];

const FAQ = [
  {
    q: "How do flooring installers get more leads?",
    a: "Lead with a strong photo portfolio and reviews, guide the homeowner's material choice, respond fast, and send a clear itemized estimate. Local Facebook groups, a strong Google Business Profile, and referrals from realtors and contractors are the best low-cost sources.",
  },
  {
    q: "How do flooring pros win jobs without being the cheapest?",
    a: "By being the trusted expert. Show finished-work photos, explain material trade-offs clearly, and provide a detailed quote covering removal, materials, labor, and timeline. Homeowners on a big, disruptive project value trust over the lowest bid.",
  },
  {
    q: "Where do flooring leads come from?",
    a: "Local Facebook groups where homeowners ask for flooring installation, a strong Google Business Profile, and referrals from realtors and general contractors are the highest-intent, lowest-cost sources.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["leads-for-service-businesses", "price-quote-that-closes", "carpenter-leads"]} />;
}
