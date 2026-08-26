import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "lead-handling-mistakes";
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
  { h2: "You're probably losing leads you already paid for" },
  {
    p: "Before you spend more to get more leads, plug the leaks in how you handle the ones you have. Most businesses lose winnable jobs to a handful of avoidable mistakes — not to competitors, not to price, but to their own process. Here are the seven that quietly cost you customers, and the fix for each.",
  },
  { h2: "1. Responding too slowly" },
  {
    p: "This is the biggest one by far. A lead who hears back in 5 minutes is worth many times one who hears back in an hour — the person often hires whoever answers first. Fix: treat new leads as time-critical, and use an instant acknowledgment to hold your place. See [speed to lead](/en/guides/speed-to-lead).",
  },
  { h2: "2. Not following up" },
  {
    p: "One reply and then silence loses most deals. The customer got busy, not uninterested. Fix: follow up 3–5 times over a couple of weeks, adding value each time. See [following up with cold leads](/en/guides/follow-up-cold-leads).",
  },
  { h2: "3. A weak or generic first message" },
  {
    p: "\"Hi, how can I help?\" reads like it was sent to everyone. Fix: reference their exact request, say who you are in a line, and end with one easy question. See [the first message to a lead](/en/guides/first-message-to-lead).",
  },
  { h2: "4. Not qualifying" },
  {
    p: "Treating every lead the same means you burn time on tire-kickers and rush your real buyers. Fix: quickly check fit, intent, budget, and timeline, and prioritize accordingly. See [hot vs. cold leads](/en/guides/hot-vs-cold-leads).",
  },
  { h2: "5. Leading with price, or quoting too early" },
  {
    p: "Drop a number before you understand the job and you invite 'that's too expensive.' Fix: qualify first, then quote with context. See [handling the price objection](/en/guides/price-objection).",
  },
  { h2: "6. No clear next step" },
  {
    ul: [
      "Ending with 'let me know' puts the work on the customer, so nothing happens.",
      "Fix: always propose a specific next step — two appointment times, a booking, a clear yes/no question.",
    ],
  },
  { h2: "7. Not tracking where leads go" },
  {
    p: "If you don't know which leads closed and which slipped, you can't fix the leaks. Fix: keep even a simple list of leads and their status, so no one falls through the cracks and you can see your real close rate.",
  },
  { h2: "Fix the biggest leak automatically" },
  {
    p: `Mistakes #1 and #2 — slow response and no follow-up — cause most lost leads, and both come down to time you don't have. ${SITE.brand} attacks the first directly: it sends high-intent Facebook-group leads to your WhatsApp the moment they appear, so you can respond first instead of finding the request hours later. Fast delivery plus a follow-up habit closes far more of the leads you already get. See [lead automation](/en/guides/lead-automation).`,
  },
];

const FAQ = [
  {
    q: "What's the most common lead-handling mistake?",
    a: "Slow response. Studies consistently show that contacting a lead within a few minutes dramatically raises your odds of connecting and closing, because customers often hire whoever answers first. It's also the easiest mistake to fix.",
  },
  {
    q: "How many times should I follow up before giving up?",
    a: "About 4–5 value-adding touches over a couple of weeks, then a graceful final message. Most deals that close beyond the first contact do so on the second or third touch, so stopping after one is a costly habit.",
  },
  {
    q: "I get enough leads but don't close them — what should I fix first?",
    a: "Start with response speed and follow-up, then your first message and qualifying. Those four fixes cost nothing and usually recover more revenue than adding new lead sources on top of a leaky process.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["speed-to-lead", "follow-up-cold-leads", "first-message-to-lead"]} />;
}
