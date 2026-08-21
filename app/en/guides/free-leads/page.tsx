import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "free-leads";
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
  { h2: "\"Free\" means time, not money" },
  {
    p: "Free leads are real — but they're not effortless. Instead of paying for attention with ad dollars, you earn it with method, consistency, and speed. For a small business watching every dollar, that trade is usually a bargain: the free channels below often out-convert paid ads because they're built on intent and trust, not interruption.",
  },
  { h2: "1. Referrals — the best free leads there are" },
  {
    p: "A referred lead arrives pre-trusted and closes at a higher rate than any paid lead. The mistake is being passive about them. Ask every happy customer directly: \"If you know anyone who needs this, I'd really appreciate the intro.\" Make it easy and specific, and referrals become a channel, not an accident.",
  },
  { h2: "2. Google Business Profile — free local visibility" },
  {
    p: "A complete, optimized Google Business Profile puts you in the Google Maps results when locals search — at zero cost. Verify it, fill everything out, add photos, and collect reviews. For a local business this is the single highest-ROI free thing you can do. See [the full GBP guide](/en/guides/google-business-profile).",
  },
  { h2: "3. Facebook groups — free, high-intent requests" },
  {
    p: "Every day, people post in local Facebook groups asking for services like yours. Responding to those requests is free and high-intent — you're answering someone who's actively looking. The only cost is spotting the posts in time. See [Facebook group leads](/en/guides/facebook-group-leads) and [the best groups](/en/guides/best-facebook-groups-for-leads).",
  },
  { h2: "4. Content and your existing network" },
  {
    ul: [
      "**Content** — helpful posts, videos, or answers build intent and trust over time. Slow to start, compounding later.",
      "**Your network** — past customers, colleagues, and local partners are warm and free. A simple check-in revives business you already earned.",
      "**Local partnerships** — swap referrals with businesses that serve the same customer (a realtor and a mover, an electrician and a plumber).",
    ],
  },
  { h2: "The catch with free leads — and the fix" },
  {
    p: `Free channels reward speed and presence, which is exactly what a busy owner runs out of. You can't watch groups all day or respond to every request in minutes by hand. ${SITE.brand} automates the highest-intent free channel — it scans Facebook groups 24/7 and sends matching requests straight to your WhatsApp in real time. It's not free, but at a flat monthly fee with no per-lead cost, it turns a free-but-time-consuming channel into a hands-off one. See [lead automation](/en/guides/lead-automation).`,
  },
];

const FAQ = [
  {
    q: "What's the best free source of leads?",
    a: "Referrals convert best, but you can't turn them on at will. Pair them with two controllable free channels — a well-optimized Google Business Profile and Facebook group requests — for a steady, low-cost flow.",
  },
  {
    q: "Are free leads lower quality than paid leads?",
    a: "Usually the opposite. Free, intent-based leads (referrals, group requests, local search) often close better than cold paid leads because they come from people who already want the service or already trust you.",
  },
  {
    q: "How long until free lead channels produce results?",
    a: "Referrals and Facebook group requests can produce leads within days. Google Business Profile takes a few days to weeks to gain traction. Content and SEO are the slowest but compound over months.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["lead-sources", "facebook-group-leads", "google-business-profile"]} />;
}
