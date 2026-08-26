import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "manage-leads-in-whatsapp";
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
  { h2: "WhatsApp is a lead inbox — treat it like one" },
  {
    p: "For a lot of small businesses, WhatsApp has quietly become the main place leads land. That's great — it's fast and personal — but a busy chat list is also where leads get buried and forgotten. The fix isn't a fancy CRM; it's using WhatsApp Business's built-in tools plus a couple of simple habits so every lead stays visible and moving.",
  },
  { h2: "Use labels to track status" },
  {
    p: "WhatsApp Business lets you tag chats with colored labels. Create a simple pipeline: New Lead, Quoted, Follow Up, Won, Lost. A glance at your chat list then tells you exactly who needs attention. This one feature turns a chaotic inbox into a lightweight lead tracker for free.",
  },
  { h2: "Set up quick replies" },
  {
    ul: [
      "**Save your common messages** — first reply, quote request, availability, directions — as quick replies you insert with a shortcut.",
      "**Personalize before sending** — add their name and their specific request so it never feels canned. See [message templates](/en/guides/message-templates-for-leads).",
      "**Speed matters** — quick replies help you answer in seconds, which wins jobs. See [speed to lead](/en/guides/speed-to-lead).",
    ],
  },
  { h2: "Never let a lead go cold" },
  {
    p: "The biggest risk in WhatsApp is a lead you replied to once, then forgot. Build a daily habit: scan your 'Follow Up' label every morning and touch anyone who's gone quiet. Most deals close on the second or third message, so this five-minute routine directly makes you money. See [following up with cold leads](/en/guides/follow-up-cold-leads).",
  },
  { h2: "Greeting and away messages" },
  {
    p: "Set an automatic greeting for first-time messagers and an away message for after hours. Even a simple 'Thanks for reaching out — I'll reply within the hour' holds a lead's attention and buys you time when you can't answer instantly. It's the difference between a lead waiting and a lead moving on.",
  },
  { h2: "Get every lead into one place first" },
  {
    p: `Managing leads in WhatsApp only works if the leads actually reach your WhatsApp. ${SITE.brand} sends high-intent Facebook-group leads straight there in real time, so instead of hunting across groups and platforms, every relevant lead lands in the one inbox you already manage — ready to label, reply to, and follow up. See [lead automation](/en/guides/lead-automation).`,
  },
];

const FAQ = [
  {
    q: "Can I really manage leads in WhatsApp without a CRM?",
    a: "Yes, for most small businesses. WhatsApp Business labels, quick replies, and greeting/away messages cover the essentials — status tracking, fast replies, and never going silent. Add a CRM only when volume or a team outgrows this.",
  },
  {
    q: "What labels should I use for leads in WhatsApp?",
    a: "A simple pipeline works best: New Lead, Quoted, Follow Up, Won, Lost. Color-code them so a glance at your chat list shows who needs attention next, especially anyone in 'Follow Up'.",
  },
  {
    q: "How do I stop forgetting to follow up on WhatsApp?",
    a: "Make a daily habit of checking your 'Follow Up' label and messaging anyone who's gone quiet. Since most deals close on the second or third touch, this short routine directly increases how many leads you win.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["whatsapp-business-setup", "follow-up-cold-leads", "message-templates-for-leads"]} />;
}
