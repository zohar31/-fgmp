import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "landscaping-leads";
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
  { h2: "Recurring maintenance is the real prize" },
  {
    p: "One-off cleanups and installs pay the bills this week; recurring maintenance accounts build a business. In lawn care and landscaping, a single weekly or biweekly maintenance client is worth far more over a season than a one-time job — and they refer their neighbors. So the goal is to land clients and convert them into recurring routes. Here's how to fill your schedule with the right work.",
  },
  { h2: "Ride the seasons" },
  {
    p: "Demand swings hard: spring cleanups, summer mowing and maintenance, fall leaf removal, and — in many regions — winter snow removal. Lean into each seasonal surge with fast response, and use design/install projects and maintenance contracts to smooth the year. A steady lead source keeps crews busy across the swings. See [leads for service businesses](/en/guides/leads-for-service-businesses).",
  },
  { h2: "Where homeowners ask for lawn & landscaping help" },
  {
    ul: [
      "**Local Facebook groups** — 'need a lawn care service', 'recommend a landscaper in [city]', 'anyone do weekly mowing?', 'need fall cleanup'. Constant, warm, local. See [Facebook group leads](/en/guides/facebook-group-leads).",
      "**Google Business Profile & reviews** — 'landscaper / lawn care near me'. See [the GBP guide](/en/guides/google-business-profile).",
      "**Referrals & route density** — neighbors on the same street mean efficient routes; ask happy clients to refer nearby.",
    ],
  },
  { h2: "Sell the plan, not just the mow" },
  {
    ul: [
      "**Default to a maintenance plan** rather than one-off visits.",
      "**Build route density** — clustering clients by neighborhood boosts margin; target leads by area.",
      "**Upsell projects** — mulch, planting, hardscaping, and cleanups to maintenance clients who already trust you.",
    ],
  },
  { h2: "Respond first to win the account" },
  {
    p: "A homeowner asking for lawn care is ready to hire — the first pro to reply with availability usually gets the recurring account. See [speed to lead](/en/guides/speed-to-lead).",
  },
  { h2: "Catch every lawn-care request automatically" },
  {
    p: `Lawn and landscaping requests flood local groups every spring and fall — and get answered fast. ${SITE.brand} scans local Facebook groups 24/7, filters for landscaping and lawn-care requests in your area, and sends them to your WhatsApp instantly — so you're first to reply and can lock in recurring routes. See landscaping lead pages for your city on the [landscaping leads hub](/en/leads/landscaper).`,
  },
];

const FAQ = [
  {
    q: "How do landscapers and lawn-care pros get clients?",
    a: "Be first to reply to local requests, default every booking toward a recurring maintenance plan, and build route density by targeting nearby clients. Local Facebook groups, referrals, and a strong Google Business Profile are the best low-cost sources.",
  },
  {
    q: "Why focus on recurring maintenance accounts?",
    a: "A weekly or biweekly client is worth far more over a season than a one-off job and tends to refer neighbors. Recurring accounts also make routes efficient and income predictable across the seasons.",
  },
  {
    q: "How do landscapers handle seasonality?",
    a: "Lean into each surge — spring cleanups, summer mowing, fall leaf removal, winter snow removal in some regions — and smooth the year with maintenance contracts and design/install projects. A steady lead source keeps crews busy between peaks.",
  },
];

export default function Page() {
  return (
    <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["leads-for-service-businesses", "speed-to-lead", "handyman-leads"]} />
  );
}
