import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "solar-leads";
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
  { h2: "Solar leads are expensive, competitive, and mostly shared" },
  {
    p: "Solar is one of the highest-ticket sales in home services, so lead prices are brutal — bought solar leads routinely run $50–$250+, and most are resold to several installers. By the time you call, the homeowner has already heard three pitches. The installers that win aren't the ones spending the most on shared leads; they're the ones who reach a homeowner's request first, exclusively, while intent is hot. Here's how.",
  },
  { h2: "Where homeowners actually ask about going solar" },
  {
    ul: [
      "**Local Facebook groups** — 'thinking about solar, who did you use?', 'are solar panels worth it in [city]?', 'getting quotes for solar — recommendations?'. Warm, local, and free to answer first. See [Facebook group leads](/en/guides/facebook-group-leads).",
      "**Referrals** — a happy solar customer with a low electric bill is your best salesperson; ask for introductions.",
      "**Paid leads / lead aggregators** — high intent but expensive and almost always shared. See [why buying leads fails](/en/guides/why-buying-leads-fails).",
    ],
  },
  { h2: "Trust and ROI close the deal — speed gets you in the door" },
  {
    p: "A solar system is a five-figure decision, so homeowners research heavily and buy on trust. But trust starts with being first and responsive: the installer who replies within minutes — with a clear answer on savings and payback — controls the conversation before competitors show up. Lead with ROI (bill offset, payback period, incentives), not just price, and back it with reviews and financing options. See [the price quote that closes](/en/guides/price-quote-that-closes).",
  },
  { h2: "Catch every 'is solar worth it?' post automatically" },
  {
    p: `Solar-interest posts appear across local groups every day and get answered fast by other installers. You can't monitor them all while you're on site or on the phone. ${SITE.brand} scans local Facebook groups 24/7, filters for solar-related requests in your service area, and pushes each one to your WhatsApp instantly — so you're first to reply, exclusively, without paying for shared aggregator leads. See solar lead pages for your city on the [solar leads hub](/en/leads/solar-installer).`,
  },
];

const FAQ = [
  {
    q: "How much do solar leads cost?",
    a: "Bought solar leads commonly run $50–$250+ each and are usually shared with multiple installers, so your real cost per closed install is much higher. Exclusive, high-intent requests from local Facebook groups and referrals cost far less per actual sale.",
  },
  {
    q: "Are shared solar leads worth it?",
    a: "Rarely. Shared leads mean you're competing on price against several installers who all called the same homeowner, which crushes close rates and margins. An exclusive request you answer first converts far better.",
  },
  {
    q: "What's the best way to get exclusive solar leads?",
    a: "Reach homeowners at the moment they ask — in local Facebook groups — before the lead is sold to anyone. Being first to reply with a clear ROI answer wins the exclusive conversation instead of joining a bidding war.",
  },
];

export default function Page() {
  return (
    <GuideLayoutEn
      slug={SLUG}
      blocks={BLOCKS}
      faq={FAQ}
      related={["why-buying-leads-fails", "speed-to-lead", "leads-for-service-businesses"]}
    />
  );
}
