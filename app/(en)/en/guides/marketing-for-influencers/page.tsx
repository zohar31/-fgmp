import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "marketing-for-influencers";
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
  { h2: "An audience is only worth what you monetize" },
  {
    p: "Followers feel like success, but they don't pay the bills on their own. Turning influence into income means landing brand deals and paid partnerships — and that's a sales-and-marketing job, not just a content one. The good news: you don't need to be huge. Engaged, niche creators land deals all the time by pitching well and being findable. Here's how.",
  },
  { h2: "Know and package your value" },
  {
    ul: [
      "**Engagement over raw follower count** — brands increasingly care about real engagement and audience fit.",
      "**Define your niche and audience** — a clear 'who I reach' is what a brand is buying.",
      "**Build a simple media kit** — audience stats, niche, past collaborations, and rates. It makes you easy to work with.",
    ],
  },
  { h2: "Pitch brands proactively" },
  {
    p: "Don't just wait to be discovered. Reach out to brands that genuinely fit your audience with a specific, value-led pitch: what you'd create, why it fits their customer, and the result you'd aim for. A tailored pitch to ten relevant brands beats waiting for inbound DMs. Lead with their benefit, not your follower count.",
  },
  { h2: "Price your partnerships" },
  {
    p: "Undercharging is the most common mistake. Base your rate on engagement, niche value, and the deliverables (posts, stories, video, usage rights), not just followers. Have clear packages so negotiations start from your terms. The same principle applies as any service business — see [handling the price objection](/en/guides/price-objection).",
  },
  { h2: "Find brands and businesses looking to collaborate" },
  {
    p: "Brands and local businesses regularly post 'looking for influencers/creators to promote our product' in marketing and industry Facebook groups. These are warm, ready-to-pay leads. Being first to respond with a relevant media kit wins the collaboration. See [Facebook group leads](/en/guides/facebook-group-leads) and [marketing for content creators](/en/guides/marketing-for-content-creators).",
  },
  { h2: "Catch collaboration requests in real time" },
  {
    p: `${SITE.brand} scans Facebook groups 24/7 for brand and business requests looking for creators, filters them to your niche, and sends them to your WhatsApp instantly — so you can pitch first while the opportunity is open. It turns 'waiting to be discovered' into reaching out at the right moment. See [how to get your first customers](/en/guides/first-customers-new-business).`,
  },
];

const FAQ = [
  {
    q: "How do influencers get brand deals?",
    a: "Package your value (niche, engagement, media kit), pitch relevant brands proactively with a specific idea, and be findable where brands look for creators — including marketing-focused Facebook groups. Responding fast to 'looking for influencers' posts lands collaborations.",
  },
  {
    q: "Do I need a huge following to make money as an influencer?",
    a: "No. Brands increasingly value engagement and audience fit over raw follower counts. A smaller, engaged, niche audience is often more attractive — and more profitable — than a large, unfocused one.",
  },
  {
    q: "How should I price brand partnerships?",
    a: "Price on engagement, niche value, deliverables, and usage rights rather than follower count alone. Build clear packages so you negotiate from your own terms, and avoid the common trap of undercharging.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["marketing-for-content-creators", "marketing-for-social-media-managers", "facebook-group-leads"]} />;
}
