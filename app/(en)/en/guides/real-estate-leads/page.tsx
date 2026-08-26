import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "real-estate-leads";
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
  { h2: "Real estate runs on relationships and speed" },
  {
    p: "A real estate agent's pipeline is built on two things: relationships (your sphere and referrals) and speed (getting to a new buyer or seller before the other agents do). Paid real estate leads are expensive and often cold or shared, so the agents who thrive combine a strong local presence with lightning-fast follow-up on fresh, high-intent leads. Here's how to build that.",
  },
  { h2: "Sphere and referrals first" },
  {
    p: "Your past clients and personal network are the highest-converting, lowest-cost source in real estate. Stay top of mind — check in, add value, ask for referrals — so when someone in your circle buys or sells, you're the obvious call. This is the foundation every other tactic sits on.",
  },
  { h2: "Speed to lead is decisive" },
  {
    p: "Real estate is a classic speed-to-lead business: buyers and sellers inquire with several agents, and the first to respond thoughtfully usually earns the relationship. Minutes matter. See [speed to lead](/en/guides/speed-to-lead) and [the first message to a lead](/en/guides/first-message-to-lead).",
  },
  { h2: "Where people ask for an agent" },
  {
    ul: [
      "**Local Facebook groups** — 'thinking of selling, who's a good agent in [city]?', 'looking for a realtor for first-time buyers', 'moving to [area], need an agent'. Warm, local, high-intent. See [Facebook group leads](/en/guides/facebook-group-leads).",
      "**Google Business Profile & reviews** — reputation matters on a huge financial decision. See [the GBP guide](/en/guides/google-business-profile).",
      "**Local farming & content** — being the visible local expert in your neighborhoods.",
    ],
  },
  { h2: "Buyers vs. sellers" },
  {
    p: "Seller (listing) leads are more valuable and worth prioritizing, but buyers build relationships and referrals. A healthy agent works both — and being present where people quietly ask 'who should I use to sell my house?' lets you capture listing leads before they turn into a competitor's sign in the yard.",
  },
  { h2: "Catch every 'need an agent' post automatically" },
  {
    p: `People announce moves and ask for agent recommendations in local groups all the time — and other agents pounce fast. ${SITE.brand} scans local Facebook groups 24/7, filters for real-estate requests in your area, and sends them to your WhatsApp instantly — so you can reach out first, while it's fresh. See real-estate lead pages for your city on the [real estate leads hub](/en/leads/real-estate-agent).`,
  },
];

const FAQ = [
  {
    q: "How do real estate agents get more leads?",
    a: "Build on your sphere and referrals, be the visible local expert, and respond to new inquiries within minutes. Local Facebook groups (where people ask for agent recommendations), a strong Google Business Profile, and consistent follow-up beat expensive shared portal leads.",
  },
  {
    q: "Are paid real estate leads worth it?",
    a: "Often not for the price. Portal and paid leads are frequently shared and cold, so cost per closing is high. Referrals, sphere, and high-intent local requests convert far better — especially when you're the first agent to respond.",
  },
  {
    q: "Should agents focus on buyers or sellers?",
    a: "Prioritize seller/listing leads (more valuable and scalable) while still serving buyers to build relationships and referrals. Catching 'thinking of selling' posts in local groups early is one of the best ways to win listings.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["speed-to-lead", "leads-for-service-businesses", "marketing-for-insurance-agents"]} />;
}
