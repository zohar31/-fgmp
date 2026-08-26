import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "first-message-to-lead";
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
  { h2: "The first message decides everything" },
  {
    p: "You found a great lead — someone asking for exactly what you offer. Now one message stands between you and a conversation. Get it right and they reply; get it wrong and they ghost you or go with whoever felt more human. The good news: a strong first message follows a simple, repeatable structure.",
  },
  { h2: "The structure that gets a reply" },
  {
    ol: [
      "**Acknowledge their exact request.** Show you actually read it: \"Hi Sarah — saw you're looking for a mover this weekend.\" Not a generic \"Hi, how can I help?\"",
      "**Say who you are in one line.** Brief and relevant: \"I'm Mike, I run a moving crew here in Austin.\"",
      "**Give one reason to trust you.** A single proof point: \"We do about 15 local moves a week and we're fully insured.\" One is enough — don't dump your whole résumé.",
      "**Make the next step tiny.** Ask one easy question or propose one small action: \"Happy to send a quick quote — what's the pickup and drop-off?\" Low effort to reply = more replies.",
    ],
  },
  { h2: "A template you can copy" },
  {
    p: "\"Hi [Name] — saw your post looking for [service] in [area]. I'm [Your Name] with [Business], we handle exactly this. Happy to help — could you tell me [one qualifying question]? I'll get you a quick quote.\"",
  },
  {
    p: "Short, specific, human, and it ends with a small ask. That's the whole formula. Adapt the wording to your voice, but keep the four parts.",
  },
  { h2: "Mistakes that kill the conversation" },
  {
    ul: [
      "**A wall of text.** Long paragraphs feel like work. Keep it to a few short lines.",
      "**Leading with price or a hard pitch.** You haven't earned the ask yet. Start a conversation, then quote. See [the price quote that closes](/en/guides/cost-per-lead).",
      "**Being generic.** \"Hi, I can help with that\" could be sent to anyone. Reference their specific request.",
      "**Being slow.** The best message sent an hour late loses to a decent one sent in two minutes. See [speed to lead](/en/guides/speed-to-lead).",
      "**No clear next step.** If they have to figure out what to do, they do nothing. Always end with one small, obvious action.",
    ],
  },
  { h2: "Speed makes the message work" },
  {
    p: `Even a perfect message fails if a competitor got there first. That's why finding leads fast matters as much as wording them well. ${SITE.brand} sends matching Facebook-group leads to your WhatsApp in real time, so you can fire off a sharp first message while you're still the only one who replied. Then follow up — most deals close on the second or third touch. See [following up with cold leads](/en/guides/follow-up-cold-leads).`,
  },
];

const FAQ = [
  {
    q: "Should the first message include a price?",
    a: "Usually no. Open with acknowledgment and one qualifying question, then quote once you understand the job. Leading with price invites comparison shopping before you've built any trust or shown value.",
  },
  {
    q: "How long should the first message be?",
    a: "Short — three or four lines. Acknowledge their request, say who you are, give one trust signal, and ask one easy question. Long messages lower reply rates.",
  },
  {
    q: "WhatsApp, text, or call for the first contact?",
    a: "Match the channel they used or offered. If they posted asking for messages, a quick WhatsApp or text usually beats a cold call — it's lower pressure and they can reply on their own time, which gets more responses.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["speed-to-lead", "follow-up-cold-leads", "hot-vs-cold-leads"]} />;
}
