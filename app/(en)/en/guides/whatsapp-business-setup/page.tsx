import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "whatsapp-business-setup";
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
  { h2: "Why WhatsApp Business is worth 20 minutes" },
  {
    p: "WhatsApp Business is a free app built specifically for turning conversations into customers. It looks like regular WhatsApp but adds a business profile, automated messages, quick replies, and labels. Setting it up properly makes you look professional, respond faster, and lose fewer leads. Here's how to do it right, step by step.",
  },
  { h2: "1. Build a complete business profile" },
  {
    ul: [
      "**Business name, category, and a clear photo or logo.**",
      "**Description** — what you do and who you help, in a line.",
      "**Hours, address (if relevant), email, and website.**",
      "A complete profile reassures a stranger that you're a real, trustworthy business.",
    ],
  },
  { h2: "2. Set greeting and away messages" },
  {
    p: "Turn on an automatic greeting so first-time messagers get an instant 'Thanks for reaching out — how can I help?' And set an away message for after hours: 'Got your message, I'll reply first thing tomorrow.' These keep leads warm when you can't answer live, and instant acknowledgment is a proven way to hold attention. See [speed to lead](/en/guides/speed-to-lead).",
  },
  { h2: "3. Create quick replies" },
  {
    p: "Save your most common messages — first reply, quote request, directions, availability — as quick replies triggered by a shortcut (like /quote). You'll respond in seconds instead of retyping, which matters because fast replies win jobs. Just personalize each before sending. See [message templates](/en/guides/message-templates-for-leads).",
  },
  { h2: "4. Set up labels to track leads" },
  {
    p: "Use labels to tag chats by status — New Lead, Quoted, Follow Up, Won, Lost — so your chat list doubles as a simple lead tracker. This is the backbone of managing leads without a CRM. See [managing leads in WhatsApp](/en/guides/manage-leads-in-whatsapp).",
  },
  { h2: "5. Consider the catalog" },
  {
    p: "If you sell defined services or products, the catalog lets you show them with prices right inside the chat. It's optional, but for some businesses it speeds up quoting and looks polished. Skip it if your work is custom-quoted every time.",
  },
  { h2: "Now fill it with leads" },
  {
    p: `A great WhatsApp Business setup is a machine with nothing to process until leads arrive. ${SITE.brand} feeds it: it scans Facebook groups 24/7 and sends high-intent leads straight to your WhatsApp in real time, so the profile, quick replies, and labels you just set up go to work on real customers — automatically. See [lead automation](/en/guides/lead-automation).`,
  },
];

const FAQ = [
  {
    q: "Is WhatsApp Business free?",
    a: "Yes. The WhatsApp Business app is free to download and use, with profile, automated messages, quick replies, labels, and catalog features. It's separate from the paid WhatsApp Business API, which larger companies use for automation at scale.",
  },
  {
    q: "What's the difference between WhatsApp and WhatsApp Business?",
    a: "WhatsApp Business adds tools built for winning customers: a business profile, greeting and away messages, quick replies, labels for tracking leads, and a product catalog. For any business handling leads over chat, it's the better choice.",
  },
  {
    q: "Can I use the same number for WhatsApp and WhatsApp Business?",
    a: "Not simultaneously on one phone with one number — each number is tied to one app. Many owners use a dedicated business number for WhatsApp Business, keeping personal and business chats cleanly separated.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["manage-leads-in-whatsapp", "message-templates-for-leads", "speed-to-lead"]} />;
}
