import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "lead-funnel";
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
  { h2: "What is a lead funnel?" },
  {
    p: "A lead funnel is the path a stranger takes to become a paying customer. It's called a funnel because it's wide at the top (lots of people become aware of you) and narrow at the bottom (a few actually buy). Every business has one, whether they've mapped it or not. Understanding yours tells you exactly where you're losing customers — and where a small fix pays off the most.",
  },
  { h2: "The four stages" },
  {
    ol: [
      "**Awareness** — someone discovers you exist. They see your post, get a referral, or find you on Google.",
      "**Interest** — they engage. They message you, ask a question, or post that they need your service.",
      "**Decision** — they compare. They're weighing you against other options and deciding whom to trust.",
      "**Action** — they buy. They book the job, sign, or pay.",
    ],
  },
  { h2: "Where leads leak out" },
  {
    p: "Customers don't fall out of the funnel randomly — they leak at predictable points:",
  },
  {
    ul: [
      "**Awareness → Interest:** you're not visible where buyers are looking. Fix: be present in high-intent places like [Facebook groups](/en/guides/facebook-group-leads) and [Google Business Profile](/en/guides/google-business-profile).",
      "**Interest → Decision:** you answered too slowly and they moved on. This is the biggest leak for most small businesses. Fix: [speed to lead](/en/guides/speed-to-lead).",
      "**Decision → Action:** you didn't follow up, or lost on price. Fix: [follow up](/en/guides/follow-up-cold-leads) and [handle the price objection](/en/guides/price-objection).",
    ],
  },
  { h2: "You don't need a complicated funnel" },
  {
    p: "Marketers love to overcomplicate this with landing pages, email sequences, and automation stacks. For a local service business, the funnel is often just: *get found → respond fast → follow up → close*. Nail those four and you'll out-earn businesses with fancier systems and slower hands. Simplicity that you actually execute beats complexity that sits unused.",
  },
  { h2: "Fill the top, tighten the middle" },
  {
    p: `Two levers grow any funnel: more qualified people at the top, and fewer leaks in the middle. ${SITE.brand} helps with both — it feeds your funnel with high-intent leads (people actively asking for your service) and delivers them instantly to your WhatsApp, so the costly 'slow response' leak closes. More in, less lost, more customers out the bottom.`,
  },
];

const FAQ = [
  {
    q: "What's the difference between a lead funnel and a sales funnel?",
    a: "They're mostly the same idea and often used interchangeably. 'Lead funnel' emphasizes the earlier stages (getting and capturing leads), while 'sales funnel' emphasizes moving those leads to a close. For a small business, treat them as one path from stranger to customer.",
  },
  {
    q: "Where do most small businesses lose customers in the funnel?",
    a: "The Interest → Decision stage — usually from slow responses. A lead reaches out, doesn't hear back fast enough, and hires someone else. Responding within minutes plugs the single biggest leak for most service businesses.",
  },
  {
    q: "Do I need software to build a funnel?",
    a: "No. A functioning funnel can be as simple as a lead source, your phone, and a follow-up habit. Software helps by filling the top with better leads and removing delays, but the core funnel is a process, not a product.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["lead-generation", "speed-to-lead", "follow-up-cold-leads"]} />;
}
