import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "tree-service-leads";
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
  { h2: "High-ticket, high-stakes work" },
  {
    p: "Tree removal and large trimming jobs are big tickets — and high-risk work near homes and power lines. Homeowners know it's dangerous, so they want a licensed, insured pro they can trust, and often they want them fast (especially after a storm drops a limb on the driveway). That combination makes tree-service leads valuable and trust-driven. Here's how to win more of them.",
  },
  { h2: "Insurance and safety win the job" },
  {
    ul: [
      "**Proof of insurance and credentials** — the first thing a homeowner checks before letting a crew fell a tree near their house.",
      "**Reviews and photos** of clean, safe removals build confidence on a scary, expensive job.",
      "**A clear scope and quote** — removal, stump grinding, cleanup, haul-away. See [the price quote that closes](/en/guides/price-quote-that-closes).",
    ],
  },
  { h2: "Storm demand is a surge" },
  {
    p: "After high winds or a storm, downed and damaged trees create a flood of urgent, often insurance-covered work all at once. Homeowners rush to local groups: 'tree down on my fence, need help ASAP'. Being visible and fast right after a storm captures a wave of high-value jobs. See [speed to lead](/en/guides/speed-to-lead).",
  },
  { h2: "Where homeowners ask for tree service" },
  {
    ul: [
      "**Local Facebook groups** — 'need a tree removed', 'recommend a tree service in [city]', 'storm knocked down a branch'. Warm, local, free to answer first. See [Facebook group leads](/en/guides/facebook-group-leads).",
      "**Google Business Profile & reviews** — 'tree service near me'. See [the GBP guide](/en/guides/google-business-profile).",
      "**Referrals** — from landscapers, realtors, and past clients.",
    ],
  },
  { h2: "Catch every tree request automatically" },
  {
    p: `Downed-tree and removal posts flood local groups after storms — and get answered fast. ${SITE.brand} scans local Facebook groups 24/7, filters for tree-service requests in your area, and sends them to your WhatsApp instantly — so you're first to respond with proof of insurance. See tree-service lead pages for your city on the [tree service leads hub](/en/leads/tree-service).`,
  },
];

const FAQ = [
  {
    q: "How do tree service companies get more leads?",
    a: "Lead with proof of insurance and credentials, strong reviews, and fast response — especially after storms when urgent, insurance-covered work surges. Local Facebook groups, a strong Google Business Profile, and landscaper/realtor referrals are the best low-cost sources.",
  },
  {
    q: "Why is insurance so important for winning tree work?",
    a: "Because the work is dangerous and near homes and power lines. Homeowners screen hard for licensed, insured crews before letting anyone remove a tree, so showing your credentials up front wins the job over a cheaper, unproven option.",
  },
  {
    q: "How do tree services capture storm demand?",
    a: "Be visible and responsive immediately after storms — homeowners rush to local groups asking for help with downed and damaged trees. Monitoring those groups and replying first captures a surge of high-value, often insurance-covered work.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["leads-for-service-businesses", "landscaping-leads", "roofer-leads"]} />;
}
