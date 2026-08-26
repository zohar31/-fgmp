import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";
import { SITE_EN } from "@/lib/config-en";

const SLUG = "facebook-group-leads";
const g = getGuideEn(SLUG)!;
const URL = `${SITE.url}/en/guides/${SLUG}`;

export const metadata: Metadata = {
  title: g.title,
  description: g.description,
  keywords: g.keywords,
  alternates: { canonical: URL, languages: { "en-US": URL } },
  openGraph: { type: "article", locale: "en_US", title: g.title, description: g.description, url: URL },
};

const P = SITE_EN.pricing.monthlyUSD;
const R = SITE_EN.pricing.refundDays;

const BLOCKS: Block[] = [
  { h2: "Why Facebook groups are the most underused lead source" },
  {
    p: "Every single day, people post in local Facebook groups asking for exactly what you sell: \"Can anyone recommend a good plumber?\", \"Looking for a photographer for a wedding in July\", \"Need a mover this weekend.\" These are the hottest leads there are — someone actively raised their hand — and most businesses miss them entirely, because you can't watch thousands of groups by hand.",
  },
  { h2: "Why these leads convert better than ads" },
  {
    ul: [
      "**Real buying intent** — they wrote the request themselves, in their own words. That's very different from someone who clicked a random ad.",
      "**Low cost** — no cost-per-click, no ad budget. See [organic vs. paid leads](/en/guides/organic-vs-paid-leads).",
      "**You arrive first** — respond within minutes and you're often the only one who did. [Speed to lead](/en/guides/speed-to-lead) is everything.",
      "**Local and relevant** — group members are usually in your area and your niche.",
    ],
  },
  { h2: "The 4 steps to turn groups into a lead stream" },
  {
    ol: [
      "**Find the right groups** — local/neighborhood groups, recommendation groups, and niche groups where your customers ask for help.",
      "**Monitor for intent** — watch for posts with words like \"looking for\", \"recommend\", \"need\", \"anyone know a…\".",
      "**Respond fast and human** — a short, personal first message beats a copy-paste pitch. See [hot vs. cold leads](/en/guides/hot-vs-cold-leads).",
      "**Follow up** — most deals close on the second or third touch, not the first.",
    ],
  },
  { h2: "The problem: you can't watch groups all day" },
  {
    p: "Even if you find 20 great groups, you can't refresh them 24/7. The hottest posts (the \"urgent\" ones) close within minutes with whoever replied first — and you usually miss them because you're busy doing the actual work.",
  },
  { h2: "How FGMP automates it" },
  {
    p: `${SITE.brand} scans 50,000+ active Facebook groups on our side — you don't need to be a member of any of them. The moment someone posts asking for your service, our AI detects it in under a minute, writes a suggested reply tailored to that exact post, and sends it straight to your WhatsApp. You just review and send — first. It's $${P}/month flat, unlimited leads, no per-lead fees, with a ${R}-day money-back guarantee.`,
  },
];

const FAQ = [
  {
    q: "Do I have to be a member of the Facebook groups?",
    a: "No. With FGMP the scanning happens on our side across public group content. You don't grant Facebook permissions and we never operate on your account.",
  },
  {
    q: "Which businesses does this work for?",
    a: "Any local service business people search for in Facebook groups — contractors, plumbers, electricians, movers, cleaners, photographers, real estate and insurance agents, lawyers, beauticians, and more.",
  },
  {
    q: "Is it legal?",
    a: "Yes. The system analyzes public group content that's visible to any group member. There's no access to accounts and no Facebook terms violation.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["speed-to-lead", "organic-vs-paid-leads", "hot-vs-cold-leads"]} />;
}
