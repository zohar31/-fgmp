import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "exclusive-vs-shared-leads";
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
  { h2: "The difference in one line" },
  {
    p: "An **exclusive lead** is sold to one business — you. A **shared lead** is sold to several businesses at once, usually 3 to 5. That single difference changes everything about how the lead behaves: how fast you have to move, how much you compete on price, and how likely you are to close.",
  },
  { h2: "What shared leads really cost you" },
  {
    p: "Shared leads look cheaper per lead — but the sticker price hides the real cost. When a lead is sold to five businesses:",
  },
  {
    ul: [
      "**You're in a race the moment it lands.** The customer's phone lights up with five calls. The first to answer usually wins, so your close rate depends on being fastest — every time. See [speed to lead](/en/guides/speed-to-lead).",
      "**You compete on price.** The customer now has five quotes and uses them against each other. Margins shrink.",
      "**The customer is annoyed.** Five businesses blowing up their phone feels like spam, which sours the conversation before it starts.",
      "**Your effective cost per customer is higher.** If a $15 shared lead closes 1 in 10, and a $40 exclusive lead closes 1 in 4, the \"cheaper\" lead actually costs you more per job.",
    ],
  },
  { h2: "The real math" },
  {
    p: "Cost per lead is a distraction. The number that matters is **cost per customer**. Run it: shared lead at $15, 10% close rate = $150 per customer. Exclusive lead at $40, 25% close rate = $160 per customer — but with less price pressure and a calmer customer, so a bigger job and a better margin. Now compare both to a high-intent organic lead that costs almost nothing. See [cost per lead](/en/guides/cost-per-lead).",
  },
  { h2: "When exclusive is worth the premium" },
  {
    ul: [
      "**High-ticket jobs.** If one job is worth thousands, paying more for a lead you don't have to fight over is easy math.",
      "**You can't always answer first.** If you're on jobs all day, you'll lose most shared-lead races. An exclusive lead waits for you.",
      "**You want margin, not a bidding war.** Exclusive leads let you sell on value, not just the lowest price.",
    ],
  },
  { h2: "There's a third option most people miss" },
  {
    p: `Both exclusive and shared leads are bought from a middleman. But the warmest lead is one nobody sold you — a person publicly asking for your service in a Facebook group, right now. It's naturally exclusive if you're the one who spots and answers it first. That's what ${SITE.brand} does: it watches groups 24/7, filters with AI, and sends these high-intent leads straight to your WhatsApp — for a flat monthly fee, not per lead. See [buying leads](/en/guides/buying-leads) for the full comparison.`,
  },
];

const FAQ = [
  {
    q: "Are exclusive leads always better than shared leads?",
    a: "Not always — but usually for higher-ticket work and for businesses that can't answer instantly. Shared leads can work if your job value is low, your close process is fast, and you're genuinely first to respond every time.",
  },
  {
    q: "How do I know if a lead is exclusive?",
    a: "Ask the provider directly and get it in writing: how many businesses receive this lead? Some companies call leads 'exclusive' but resell them after a delay. If they won't answer clearly, assume it's shared.",
  },
  {
    q: "What's the cheapest way to get near-exclusive leads?",
    a: "Organic, high-intent sources like Facebook groups. When you're the one who spots someone asking for your service and replies first, you effectively have an exclusive lead — with almost no cost per lead.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["buying-leads", "cost-per-lead", "speed-to-lead"]} />;
}
