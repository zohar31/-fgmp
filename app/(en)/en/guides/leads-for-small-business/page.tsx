import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "leads-for-small-business";
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
  { h2: "Leads are the lifeblood — and the bottleneck" },
  {
    p: "Every small business needs a steady flow of customers, but most rely on luck and word of mouth and then panic when it slows down. You don't need a big-company budget to fix that — you need the right few channels and the discipline to work them. Here's how to get leads for a small business, focused entirely on what returns money rather than what looks impressive.",
  },
  { h2: "Start with your numbers" },
  {
    p: "Before chasing tactics, get a target. Work out how many customers you need and therefore how many leads, using your average job value and close rate. See [how many leads per month](/en/guides/how-many-leads-per-month). A number turns 'get more leads' into a plan you can measure.",
  },
  { h2: "The highest-ROI channels for a tight budget" },
  {
    ol: [
      "**Referrals** — free and warm; ask every happy customer directly.",
      "**Google Business Profile** — free local visibility in Google Maps. See [the GBP guide](/en/guides/google-business-profile).",
      "**Facebook groups** — people in your area asking for your service daily, at almost no cost. See [Facebook group leads](/en/guides/facebook-group-leads).",
      "**Your existing network and past customers** — cheap, warm, and often forgotten.",
    ],
  },
  {
    p: "Pick two or three and work them consistently rather than dabbling in ten. See [the best lead sources](/en/guides/lead-sources) and [free leads](/en/guides/free-leads).",
  },
  { h2: "Speed beats spend" },
  {
    p: "A small business can't outspend big competitors — but it can out-respond them. Answering a lead in minutes instead of hours dramatically raises your close rate, and it costs nothing. This is the single biggest advantage a nimble small business has. See [speed to lead](/en/guides/speed-to-lead).",
  },
  { h2: "Close what you get" },
  {
    p: "Getting leads is only half the battle; most small businesses lose winnable jobs to slow replies, weak first messages, and no follow-up. Fixing your lead handling often adds more revenue than adding new channels. See [lead-handling mistakes](/en/guides/lead-handling-mistakes) and [following up](/en/guides/follow-up-cold-leads).",
  },
  { h2: "A steady stream without the busywork" },
  {
    p: `The best low-cost channel — local Facebook groups — eats time most small business owners don't have. ${SITE.brand} automates it: it scans groups 24/7, filters for real requests in your trade and area, and sends them to your WhatsApp in real time, for a flat monthly fee with no per-lead cost. It's a predictable stream of high-intent leads without hiring a marketer or scrolling groups all day. See [lead automation](/en/guides/lead-automation).`,
  },
];

const FAQ = [
  {
    q: "How can a small business get leads with no budget?",
    a: "Lean on free, high-intent channels: referrals, Google Business Profile, Facebook group requests, and your existing network. They cost time and consistency rather than money, and for a small business they usually beat paid ads on return.",
  },
  {
    q: "What's the fastest way for a small business to get more customers?",
    a: "Respond faster to the leads you already get and follow up consistently. Speed and follow-up cost nothing and directly raise your close rate — often adding more revenue than new lead sources. Then layer in high-intent channels like groups and referrals.",
  },
  {
    q: "How many lead channels should a small business use?",
    a: "Two or three, worked well, beats ten worked poorly. For most small businesses that's referrals, Google Business Profile, and Facebook groups — all low-cost and high-intent. Go deep before adding more.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["lead-sources", "free-leads", "how-many-leads-per-month"]} />;
}
