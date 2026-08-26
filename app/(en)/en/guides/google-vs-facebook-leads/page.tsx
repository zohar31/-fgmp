import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "google-vs-facebook-leads";
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
  { h2: "Two different kinds of customer" },
  {
    p: "Google and Facebook both generate leads, but they catch people in completely different mindsets. On Google, someone is **actively searching** — 'emergency plumber near me' means they need one now. On Facebook, someone is **scrolling** — you interrupt them, or you catch them asking a group for a recommendation. Understanding this difference is the whole game: it drives cost, intent, and how you should respond.",
  },
  { h2: "Buying intent" },
  {
    ul: [
      "**Google search — highest intent.** People search when they already want the thing. A search lead is often ready to buy today.",
      "**Facebook Ads — created demand.** You interrupt someone with an offer. Intent is lower; you're generating interest, not catching it.",
      "**Facebook groups — high intent, hidden.** When someone posts 'anyone recommend a good electrician?', that's search-level intent happening inside social — often missed because it scrolls by. See [Facebook group leads](/en/guides/facebook-group-leads).",
    ],
  },
  { h2: "Cost per lead" },
  {
    p: "Google Ads for high-intent local keywords are effective but pricey — competitive trades can pay $20–80+ per click, and not every click converts. Facebook Ads are usually cheaper per lead but lower intent, so you sift more. Facebook group leads sit in a sweet spot: search-level intent at almost no cost per lead, since you're not paying for ads at all. See [cost per lead](/en/guides/cost-per-lead) and [organic vs. paid](/en/guides/organic-vs-paid-leads).",
  },
  { h2: "Speed and competition" },
  {
    p: "On Google, a customer often contacts several businesses from the results, so you're in a race — see [speed to lead](/en/guides/speed-to-lead). In Facebook groups, whoever spots the post and replies first with a helpful message usually wins, and there's less head-to-head bidding. The common thread: fast response beats everything on both platforms.",
  },
  { h2: "So which one wins?" },
  {
    p: "For pure buying intent, Google is hard to beat — but it's expensive and competitive. Facebook Ads win for building awareness and retargeting. Facebook groups win on cost-efficiency and warmth for local services. The honest answer for most local businesses: **you don't pick one.** Use Google to catch active searchers, and groups to catch the high-intent requests that never reach a search bar.",
  },
  { h2: "Capture the Facebook side automatically" },
  {
    p: `The catch with Facebook groups is that the leads scroll past in seconds and you can't watch dozens of groups all day. ${SITE.brand} solves that: it scans groups 24/7, filters posts with AI, and sends the high-intent ones to your WhatsApp in real time. You get search-level intent at group-level cost — without the manual scrolling.`,
  },
];

const FAQ = [
  {
    q: "Is Google or Facebook better for local service businesses?",
    a: "Google has the highest buying intent but costs more and is very competitive. Facebook groups offer high intent at low cost for local services. Most successful local businesses use both — Google for active searchers, groups for the requests that happen socially.",
  },
  {
    q: "Why are Facebook group leads cheaper than Google leads?",
    a: "Because you're not paying per click or per lead — the person is publicly asking for a service and you respond. There's no ad auction. The main 'cost' is spotting the post fast, which automation handles for you.",
  },
  {
    q: "Do I need a big budget to get leads from either?",
    a: "Google Ads generally require a real budget to compete. Facebook groups need almost no ad spend — just presence and speed. If budget is tight, start with high-intent organic sources and add paid search once you have cash flow.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["organic-vs-paid-leads", "cost-per-lead", "facebook-group-leads"]} />;
}
