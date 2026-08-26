import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "lead-automation";
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
  { h2: "What is lead automation?" },
  {
    p: "Lead automation means using software to handle the repetitive parts of getting and reacting to leads — so they happen instantly, every time, without you doing them by hand. It's not about replacing you; it's about removing the steps where a human is just copying, watching, or waiting. The goal is simple: **no lead slips through, and every lead gets a fast response** — even when you're on a job, asleep, or slammed.",
  },
  { h2: "The lead process — and what you can automate" },
  {
    p: "Getting a customer isn't one action, it's a chain. Each link can be automated:",
  },
  {
    ol: [
      "**Capture** — finding and collecting leads. Instead of scrolling Facebook groups or refreshing your inbox, software watches for people asking for your service and grabs them the moment they post.",
      "**Routing** — getting the lead to the right place instantly. A new lead lands in your WhatsApp or phone the second it appears, not in a dashboard you check twice a day.",
      "**Response** — the first reply. An instant acknowledgment (\"Hi, saw your post — I can help, when works for a quick call?\") buys you time and beats slower competitors. See [speed to lead](/en/guides/speed-to-lead).",
      "**Follow-up** — the reminders. Automated nudges so a quiet lead gets a second and third touch instead of being forgotten. See [following up with cold leads](/en/guides/follow-up-cold-leads).",
    ],
  },
  { h2: "Why automation beats hustle" },
  {
    p: "A person can watch a few Facebook groups for an hour a day. Software can watch thousands, 24/7, and never miss a post at 11pm on a Sunday. The two biggest reasons leads are lost — **you didn't see it** and **you replied too late** — are exactly the two things automation removes. That's why an automated, high-intent source often outperforms manual effort and even paid ads on return.",
  },
  { h2: "What you should NOT fully automate" },
  {
    ul: [
      "**The actual conversation.** Automate the first touch and the reminders — but a real human should close. People buy from people.",
      "**Judgment on price and scope.** Let a human quote. Automation gets you to the conversation faster; it shouldn't negotiate for you.",
      "**Relationships.** Referrals and repeat customers come from care, not scripts.",
    ],
  },
  { h2: "How FGMP automates lead capture" },
  {
    p: `${SITE.brand} handles the hardest link in the chain — capture and routing. It scans Facebook groups around the clock, uses AI to filter out the noise, and sends only the relevant, high-intent leads straight to your WhatsApp in real time. You skip the scrolling and the missed posts, and jump straight to the conversation. From there, you close. It's the automation that matters most, without automating away the human part that actually wins the deal.`,
  },
];

const FAQ = [
  {
    q: "Do I need technical skills to automate lead generation?",
    a: "No. Modern tools are built for business owners, not developers. With a service like FGMP you set your trade, area, and keywords once, and leads start arriving in WhatsApp — no code, no setup beyond a short form.",
  },
  {
    q: "Will automated leads feel impersonal to customers?",
    a: "Only if you let a bot do the talking. The right approach automates the finding and the first acknowledgment, then a real person takes over the conversation. The customer just experiences a fast, human response.",
  },
  {
    q: "Is lead automation expensive?",
    a: "It's usually cheaper than paid ads and far cheaper than the leads you lose to slow response. FGMP, for example, is a flat $99/month with a 3-day money-back guarantee — no per-lead fees.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["speed-to-lead", "facebook-group-leads", "follow-up-cold-leads"]} />;
}
