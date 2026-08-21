import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "first-customers-new-business";
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
  { h2: "The hardest customers are the first ones" },
  {
    p: "A new business has no reviews, no reputation, and usually no budget — the three things that normally bring customers in. So the first few can't come from paid ads or a polished brand; they have to come from **hustle, your network, and high-intent channels where trust isn't required yet.** The goal isn't to build a marketing machine on day one. It's to land the first jobs, do them brilliantly, and turn them into proof.",
  },
  { h2: "Start with the people who already trust you" },
  {
    p: "Your first customers are often one message away. Tell everyone you know exactly what you do and who you help — not a vague 'I started a business,' but 'I'm doing [service] for [who], if you or anyone you know needs it.' Personal asks convert far better than a public post. A handful of friends, former colleagues, and past clients can become your first jobs and your first referrers.",
  },
  { h2: "Go where people are actively asking" },
  {
    p: "With no reputation, the fastest wins come from people who need your service right now — because urgency beats brand. That's the power of high-intent channels:",
  },
  {
    ul: [
      "**Facebook groups** — people posting 'looking for [your service]' don't care that you're new; they care that you can help now. See [Facebook group leads](/en/guides/facebook-group-leads).",
      "**Google Business Profile** — free, and it gets you into local search from day one. See [the GBP guide](/en/guides/google-business-profile).",
      "**Local recommendation groups** — warm, local, and full of buying intent. See [the best groups](/en/guides/best-facebook-groups-for-leads).",
    ],
  },
  { h2: "Be fast and be generous early" },
  {
    p: "Two things win first customers: speed and value. Respond faster than anyone else — a new business can out-hustle established ones on response time. See [speed to lead](/en/guides/speed-to-lead). And consider a fair, honest first-customer offer (not desperate discounting) in exchange for a review or referral. Early reviews are worth more than the margin you give up.",
  },
  { h2: "Turn the first jobs into more" },
  {
    ol: [
      "**Over-deliver** on the first few jobs — they're your portfolio and your reputation.",
      "**Ask for a review** while you're fresh in their mind. Reviews are the reputation you didn't have yesterday.",
      "**Ask for a referral** directly: 'Know anyone else who needs [service]?'",
      "**Follow up** and stay in touch — repeat and referred business is the cheapest you'll ever get. See [following up](/en/guides/follow-up-cold-leads).",
    ],
  },
  { h2: "A steady stream, from day one" },
  {
    p: `The scary part of a new business is the silence — waiting for the phone to ring. High-intent lead sources fix that by connecting you with people who need you today. ${SITE.brand} scans Facebook groups 24/7 and sends matching leads straight to your WhatsApp in real time, so even without a reputation you get a steady flow of real requests to respond to. Land them, wow them, and let the reviews and referrals compound.`,
  },
];

const FAQ = [
  {
    q: "How do I get customers with no reviews or reputation?",
    a: "Start with your network (personal asks convert best) and high-intent channels where people need your service now — Facebook groups, Google Business Profile, local recommendation groups. Urgency beats brand: someone who needs a plumber today cares that you can help, not that you're new.",
  },
  {
    q: "Should I discount to get my first customers?",
    a: "Be careful. A fair first-customer offer in exchange for an honest review or referral can be smart, but desperate discounting trains customers to undervalue you and attracts price-shoppers. Compete on speed and service first; use small, purposeful offers, not deep cuts.",
  },
  {
    q: "How fast can a new business start getting leads?",
    a: "Almost immediately from high-intent, free channels. Personal outreach and Facebook group requests can produce leads the same week, and a Google Business Profile starts showing in local search within days. Paid and content channels take longer to pay off.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["lead-generation", "facebook-group-leads", "speed-to-lead"]} />;
}
