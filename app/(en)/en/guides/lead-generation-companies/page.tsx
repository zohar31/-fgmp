import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "lead-generation-companies";
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
  { h2: "What lead generation companies actually sell" },
  {
    p: "A lead generation company finds people who might want a service and sells you their contact details — sometimes as a live transfer, sometimes as a form fill, sometimes as an aged list. You're not buying customers; you're buying the chance to contact someone. Whether that's worth it depends entirely on how fresh, exclusive, and high-intent those contacts are — and that varies wildly between companies.",
  },
  { h2: "How they charge" },
  {
    ul: [
      "**Per lead** — a flat fee for each contact, from a few dollars to $100+ in competitive trades.",
      "**Shared vs. exclusive** — shared leads are sold to several businesses at once (cheaper, but you compete); exclusive leads go only to you (pricier). See [exclusive vs. shared leads](/en/guides/exclusive-vs-shared-leads).",
      "**Subscriptions** — a monthly fee for a volume of leads or access to a platform.",
      "**Pay-per-call** — you pay for phone calls routed to you, usually the priciest and highest-intent.",
    ],
  },
  { h2: "Red flags to watch for" },
  {
    ul: [
      "**They won't say how many businesses get each lead.** If they dodge this, assume it's shared widely.",
      "**No refunds for junk leads.** Wrong numbers and fake form fills happen; a fair company credits them.",
      "**Aged or recycled leads sold as fresh.** Freshness drives close rate — old leads rarely convert. See [real-time leads](/en/guides/real-time-leads).",
      "**Long contracts with high minimums.** Be wary of locking in before you've tested lead quality.",
    ],
  },
  { h2: "The math that matters" },
  {
    p: "Ignore cost per lead; calculate cost per customer. A $15 shared lead that closes at 8% costs ~$190 per job; a $50 exclusive lead that closes at 25% costs ~$200 but with less price pressure. Then compare both to a high-intent organic lead that costs almost nothing. See [cost per lead](/en/guides/cost-per-lead) and [why buying leads fails](/en/guides/why-buying-leads-fails).",
  },
  { h2: "When to skip the lead company entirely" },
  {
    p: `If your trade has active local Facebook groups, you can often get warmer leads than a lead company sells — for a flat fee instead of per lead. ${SITE.brand} monitors those groups 24/7 and sends you the original request (effectively exclusive, since you're first to reply) straight to your WhatsApp. No per-lead pricing, no shared contacts, no aged lists. For many local businesses it replaces the lead company outright.`,
  },
];

const FAQ = [
  {
    q: "Are lead generation companies worth it?",
    a: "Sometimes — for high-ticket work, or when you can respond instantly and the leads are exclusive and fresh. For many small local businesses, though, shared and aged leads convert poorly, and a flat-rate organic source delivers better ROI.",
  },
  {
    q: "What should I ask a lead company before buying?",
    a: "How many businesses receive each lead, how fresh the leads are, whether they credit junk leads, and what the real close rate looks like for your trade. Vague answers to these are red flags.",
  },
  {
    q: "What's the alternative to buying leads from a company?",
    a: "High-intent organic sources: referrals, Google Business Profile, and real-time Facebook group requests. These reach people actively asking for your service, usually at a fraction of the cost per customer.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["buying-leads", "exclusive-vs-shared-leads", "why-buying-leads-fails"]} />;
}
