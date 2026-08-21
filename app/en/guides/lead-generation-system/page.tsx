import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "lead-generation-system";
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
  { h2: "What a lead generation system actually is" },
  {
    p: "A lead generation system is any repeatable setup that turns strangers into leads and leads into customers — reliably, without depending on luck. The word 'system' is the point: it's not one tactic, it's a connected process that runs the same way every time. A business with a system knows roughly how many customers next month will bring; a business without one just hopes.",
  },
  { h2: "The four parts every system needs" },
  {
    ol: [
      "**Capture** — a source of leads (people who show interest). Ads, search, referrals, or Facebook groups.",
      "**Filter** — a way to separate real buyers from noise, so you spend time on the right ones. See [filtering leads](/en/guides/filter-facebook-leads).",
      "**Deliver** — getting each lead to you instantly, where you'll actually see it (your phone, not a dashboard you check twice a day).",
      "**Respond** — a fast, consistent first reply and follow-up. See [speed to lead](/en/guides/speed-to-lead).",
    ],
  },
  {
    p: "A weak link anywhere breaks the whole thing. Great capture with slow delivery still loses leads; fast delivery with no follow-up still loses deals.",
  },
  { h2: "Types of lead generation systems" },
  {
    ul: [
      "**Paid ad systems** — Google or Facebook ads feeding a landing page and CRM. Powerful but costs money per lead and needs management.",
      "**Referral systems** — a deliberate process for asking and rewarding referrals. Cheap and warm, but harder to scale on demand.",
      "**Organic/intent systems** — capturing people already asking for your service (search, Google Business Profile, Facebook groups). High intent, low cost.",
      "**Automated group-monitoring systems** — software that watches Facebook groups for real-time requests and routes them to you. See [lead automation](/en/guides/lead-automation).",
    ],
  },
  { h2: "How to choose one" },
  {
    p: "Match the system to your reality, not the hype. Ask: What's my budget — flat fee or pay-per-lead? How fast can I respond? What's the intent level of the leads? What does it cost per actual customer, not per lead? See [cost per lead](/en/guides/cost-per-lead) and [how to choose a lead company](/en/guides/lead-generation-companies). For most local businesses, a low-cost, high-intent system beats an expensive high-volume one.",
  },
  { h2: "A system that runs itself" },
  {
    p: `${SITE.brand} is a complete lead generation system built around the highest-intent source: real-time Facebook-group requests. It captures (scans 50,000+ groups), filters (AI separates buyers from noise), delivers (straight to your WhatsApp in under a minute), and preps your response (a suggested reply for each lead) — all for a flat monthly fee, no per-lead cost. You supply the last human step: the conversation.`,
  },
];

const FAQ = [
  {
    q: "Do I need software for a lead generation system?",
    a: "Not necessarily — a system is a process, not a product. Referrals plus fast follow-up is a valid system. But software helps automate the parts that don't scale by hand, like monitoring for leads and delivering them instantly.",
  },
  {
    q: "What makes a lead generation system 'good'?",
    a: "It reliably produces paying customers at an acceptable cost per customer, and it runs without constant manual effort. High intent, fast delivery, and a response process matter more than raw lead volume.",
  },
  {
    q: "What's the cheapest type of lead generation system?",
    a: "Organic, intent-based systems — referrals, Google Business Profile, and Facebook group monitoring — have the lowest cost per lead. They trade money for method and speed, which is ideal for budget-conscious small businesses.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["lead-automation", "lead-generation-companies", "lead-sources"]} />;
}
