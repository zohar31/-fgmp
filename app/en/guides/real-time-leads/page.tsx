import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "real-time-leads";
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
  { h2: "What is a real-time lead?" },
  {
    p: "A real-time lead reaches you within seconds or minutes of the person showing interest — while they're still actively looking. It's the opposite of an **aged lead**, which is hours, days, or weeks old by the time it lands on your desk. The difference isn't small: freshness is one of the single biggest predictors of whether a lead ever becomes a customer.",
  },
  { h2: "Why fresh leads close and aged leads don't" },
  {
    p: "When someone posts \"anyone recommend a good plumber?\", they need a plumber right then. Reach them in that moment and you're the answer to a question they're actively asking. Wait a day and one of three things has happened:",
  },
  {
    ol: [
      "**They already hired someone.** The job is gone.",
      "**They've cooled off.** The urgency passed, and now you're interrupting instead of helping.",
      "**They forgot they asked.** Your message feels random and out of context.",
    ],
  },
  {
    p: "This is why response-time studies are so dramatic: contacting a lead in the first 5 minutes versus 30 can raise your odds of connecting several times over. See [speed to lead](/en/guides/speed-to-lead) for the numbers.",
  },
  { h2: "The trap of 'aged' and recycled leads" },
  {
    p: "Some lead companies sell aged leads at a discount — leads that didn't close for someone else, weeks ago. They sound cheap. In reality you're paying to contact people who already got what they needed, or who were never a good fit. A cheap aged lead with a 1% close rate is more expensive than a fresh lead at ten times the price. Freshness is quality.",
  },
  { h2: "How to always be first" },
  {
    ul: [
      "**Cut the delay between intent and contact.** Every manual step — a dashboard you check twice a day, a spreadsheet, an email digest — adds hours. Get leads pushed to you instantly instead.",
      "**Be where intent happens live.** Facebook groups are a stream of people asking for services in real time. See [Facebook group leads](/en/guides/facebook-group-leads).",
      "**Automate the watch.** You can't refresh groups all day. Software can. See [lead automation](/en/guides/lead-automation).",
    ],
  },
  { h2: "Real-time by design" },
  {
    p: `${SITE.brand} is built around freshness. It scans Facebook groups continuously and sends a matching lead to your WhatsApp typically within a minute of the post going up — while the person is still online and looking. You're not chasing week-old leads; you're the first, timely reply to a live request. That's what turns a lead into a customer.`,
  },
];

const FAQ = [
  {
    q: "How fast is 'real-time' in practice?",
    a: "With FGMP, leads typically reach your WhatsApp within about a minute of the post appearing — fast enough that the person is usually still online and still looking.",
  },
  {
    q: "Are aged leads ever worth buying?",
    a: "Rarely. They can occasionally work for long-consideration purchases, but for most service businesses a fresh lead closes far better. If you buy aged leads, expect very low close rates and price accordingly.",
  },
  {
    q: "What if I can't respond the instant a lead arrives?",
    a: "Send a quick automated acknowledgment to hold your place, then follow up personally as soon as you can. Even a 30-second 'Hi, saw your post — I can help, give me a moment' keeps you in the running.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["speed-to-lead", "quality-leads", "facebook-group-leads"]} />;
}
