import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "b2b-leads";
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
  { h2: "B2B lead generation, minus the jargon" },
  {
    p: "B2B lead generation just means finding other businesses that need what you sell and getting them into a conversation. The enterprise playbook — SDR teams, six-figure ad budgets, complex CRM stacks — doesn't fit a small company. The good news: you don't need it. What you need is the right channels, real buying intent, and a fast, human follow-up.",
  },
  { h2: "Inbound vs. outbound" },
  {
    ul: [
      "**Inbound** — businesses come to you (they search, get referred, or post that they need a service). Higher intent, warmer, easier to close. Slower to scale but far more efficient.",
      "**Outbound** — you reach out first (cold email, LinkedIn, calls). Scalable and predictable, but colder and more work per deal.",
      "**The winning mix for small companies:** lead with inbound and high-intent sources, and layer light outbound on top only once inbound is humming.",
    ],
  },
  { h2: "The best B2B channels for a small company" },
  {
    ol: [
      "**Referrals and word of mouth.** Still the highest-converting B2B channel. Ask happy clients directly.",
      "**Google search and Business Profile.** Businesses searching for a supplier have strong intent. See [Google Business Profile](/en/guides/google-business-profile).",
      "**Facebook groups.** Local business owners and industry groups constantly ask for suppliers and services. High intent, low cost. See [Facebook group leads](/en/guides/facebook-group-leads).",
      "**LinkedIn outreach.** Useful for targeted outbound to specific roles — but slower and more manual.",
    ],
  },
  { h2: "Intent beats volume in B2B" },
  {
    p: "A list of 10,000 cold companies is worth less than 10 that are actively looking right now. B2B sales cycles are longer and decisions involve more people, so starting with genuine intent saves you months of nurturing. Chase the business that just asked 'can anyone recommend a supplier for X?' before you build a giant cold list. See [quality leads](/en/guides/quality-leads).",
  },
  { h2: "Speed and follow-up still decide it" },
  {
    p: "B2B buyers are busy and comparison-shop. The vendor who replies first often controls the conversation, and most B2B deals close on the third to fifth touch — so a steady follow-up system is non-negotiable. See [speed to lead](/en/guides/speed-to-lead) and [following up](/en/guides/follow-up-cold-leads).",
  },
  { h2: "Find businesses that are asking — automatically" },
  {
    p: `${SITE.brand} works for B2B too. Set keywords for the businesses you serve, and it scans Facebook groups for companies and owners actively asking for what you offer — then sends those leads to your WhatsApp in real time. You skip the cold list and start with intent.`,
  },
];

const FAQ = [
  {
    q: "Is Facebook really useful for B2B leads?",
    a: "Yes — especially local and small-business B2B. Countless industry and local business groups are full of owners asking for suppliers, contractors, and services. The intent is real and the cost is far lower than ads or paid B2B databases.",
  },
  {
    q: "How long is a typical B2B sales cycle?",
    a: "Longer than B2C — often weeks to months, with several people involved in the decision. That's why starting with high-intent leads and following up consistently matters so much; it shortens the cycle and keeps you top of mind.",
  },
  {
    q: "Should a small company do cold outreach?",
    a: "A little, targeted, and only after inbound is working. Cold email or LinkedIn to a tight list of ideal clients can supplement your pipeline, but broad cold blasting burns time and reputation. Lead with intent-based channels first.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["lead-generation", "quality-leads", "facebook-group-leads"]} />;
}
