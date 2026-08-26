import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "leads-from-telegram";
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
  { h2: "Telegram is an overlooked lead source" },
  {
    p: "Everyone thinks Facebook groups for leads — but Telegram groups and channels are full of people asking for services and recommendations too, especially in certain communities and cities. Because fewer businesses monitor Telegram, competition for those leads is often lower. If your customers are active there, it can be a quiet, low-cost source of warm leads.",
  },
  { h2: "Find the right groups and channels" },
  {
    ul: [
      "**Search for local and niche groups** — city groups, community chats, buy/sell/recommend channels, and industry-specific groups.",
      "**Prioritize active, relevant ones** — a busy local group where people ask for services beats a large but silent channel.",
      "**Join where your customers already are** — not every trade has a Telegram audience, so focus where yours does.",
    ],
  },
  { h2: "Spot buying intent" },
  {
    p: "The same rules apply as anywhere: look for real requests, not chatter. 'Anyone know a good [trade] in [area]?', 'looking for someone to…', urgency words, and specific problems all signal a buyer. Filter out spam, other businesses advertising, and general questions. See [how to filter leads](/en/guides/filter-facebook-leads) and [quality leads](/en/guides/quality-leads).",
  },
  { h2: "Engage without spamming" },
  {
    p: "Telegram communities dislike self-promotion just like Facebook groups. Be the helpful reply when someone asks for your service, respect each group's rules, and move details to a direct message. Building a genuine presence earns you referrals on top of direct leads — and keeps you from getting removed. See [how to post without getting banned](/en/guides/post-in-facebook-groups-without-getting-banned).",
  },
  { h2: "Speed still wins" },
  {
    p: "As on every channel, the first helpful responder usually wins the job. Requests in active Telegram groups get answered fast, so being present and quick matters. See [speed to lead](/en/guides/speed-to-lead).",
  },
  { h2: "One inbox for all your leads" },
  {
    p: `${SITE.brand} focuses on the largest real-time lead source — Facebook groups — and delivers those leads straight to your WhatsApp, with Telegram delivery on the roadmap. The principle is the same everywhere: catch people the moment they ask, respond first, and keep every lead in one place you actually check. See [lead automation](/en/guides/lead-automation).`,
  },
];

const FAQ = [
  {
    q: "Can you really get business leads from Telegram?",
    a: "Yes, if your customers are active there. Local and niche Telegram groups and channels feature people asking for services and recommendations, and because fewer businesses monitor Telegram, competition for those leads can be lower.",
  },
  {
    q: "How do I find leads on Telegram?",
    a: "Join active local and niche groups where your customers gather, watch for genuine requests ('looking for a…', 'anyone recommend…'), and reply helpfully. Respect group rules and move details to DMs to avoid being flagged as spam.",
  },
  {
    q: "Is Telegram or Facebook better for leads?",
    a: "Facebook groups are usually larger and more active for most trades, making them the bigger lead source. Telegram can be a valuable supplement — especially in communities where your customers are active — and it often has less competition.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["facebook-group-leads", "filter-facebook-leads", "lead-automation"]} />;
}
