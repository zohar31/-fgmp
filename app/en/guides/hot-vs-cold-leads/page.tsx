import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "hot-vs-cold-leads";
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
  { h2: "Not every lead is worth the same" },
  {
    p: "The single biggest mistake in lead handling is treating every lead the same. A hot lead wants to buy now; a cold lead is still browsing. Give a hot lead a slow, generic response and you lose them to a faster competitor. Chase a cold lead too hard and you scare them off. Knowing which is which changes how you spend your time — and your close rate.",
  },
  { h2: "What is a hot lead?" },
  {
    p: "A hot lead has high, immediate buying intent. Signs: they use urgent language (\"need this today\", \"ASAP\"), they ask about price or availability, and the request is fresh (posted minutes ago). Hot leads close at a much higher rate — but only if you [respond fast](/en/guides/speed-to-lead).",
  },
  { h2: "What is a cold lead?" },
  {
    p: "A cold lead is someone who showed some interest but isn't ready to buy yet, or whose inquiry is old. They downloaded a guide, joined a list, or asked a vague question. Cold leads aren't worthless — they need nurturing (helpful follow-up over time) until they're ready.",
  },
  { h2: "How to spot buying intent — 4 signals" },
  {
    ul: [
      "**Urgency** — \"today\", \"this week\", \"urgent\" = hot.",
      "**Specificity** — a detailed, specific request beats a vague one.",
      "**Price/availability questions** — asking about cost or scheduling means they're close.",
      "**Freshness** — a lead that's an hour old is worth far more than one that's two weeks old.",
    ],
  },
  { h2: "Handle each type differently" },
  {
    ol: [
      "**Hot** — respond within minutes, personally. This is where speed wins deals.",
      "**Warm** — good fit but not ready. Structured follow-up.",
      "**Cold** — low fit or old. Short reply, don't over-invest.",
    ],
  },
  {
    p: `The hottest leads of all come from people posting requests in Facebook groups in real time. [${SITE.brand}](/en/guides/facebook-group-leads) finds those posts and sends them to your WhatsApp within a minute — while the lead is still hot.`,
  },
];

const FAQ = [
  {
    q: "Are more leads or hotter leads better?",
    a: "Hotter, almost always. A business that closes 5 of 10 hot leads beats one that burns time on 100 cold ones. Focus your energy on high-intent leads and respond to them fast.",
  },
  {
    q: "How do I warm up a cold lead?",
    a: "With value over time: helpful follow-up, relevant tips, a similar case study, and a gentle check-in — not pressure. Most cold leads convert later if you stay in touch without being pushy.",
  },
  {
    q: "Where do hot leads come from?",
    a: "From people expressing a need right now — Google searches with buying intent, and real-time requests in Facebook groups (\"looking for X urgently\"). Speed of response is the deciding factor in closing them.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["speed-to-lead", "facebook-group-leads", "what-is-a-lead"]} />;
}
