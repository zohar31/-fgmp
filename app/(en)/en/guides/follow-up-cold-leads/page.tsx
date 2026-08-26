import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "follow-up-cold-leads";
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
  { h2: "Most deals are lost in the follow-up" },
  {
    p: "A lead replies once, then goes quiet. Most business owners take that silence as a no and move on. But a huge share of sales happen after the first contact — on the second, third, or fourth touch. The person didn't reject you; they got busy, distracted, or weren't quite ready. Follow-up is where those deals are won, and it's the step most people skip.",
  },
  { h2: "How many times should you follow up?" },
  {
    p: "More than you think, and fewer than feels spammy. A practical rule for service businesses: **up to 4–5 touches** across a couple of weeks, then stop and let it rest. Each touch should add something — a reminder, a helpful detail, a gentle deadline — not just \"just checking in again.\"",
  },
  { h2: "A simple, non-annoying cadence" },
  {
    ol: [
      "**Touch 1 — same day.** Your first reply, fast. See [the first message to a lead](/en/guides/first-message-to-lead).",
      "**Touch 2 — next day.** \"Hi [Name], still happy to help with [job] — want me to send that quote?\" Short and specific.",
      "**Touch 3 — 3–4 days later.** Add value: a quick tip, availability, or a small incentive. \"I've got an opening Thursday if that helps.\"",
      "**Touch 4 — about a week later.** A soft deadline or takeaway: \"Wrapping up my schedule for next week — want me to hold a slot?\"",
      "**Touch 5 — the graceful close.** \"No worries if the timing's off — I'll leave it here. Reach out anytime and I'll take care of you.\" This one often gets a reply precisely because it removes pressure.",
    ],
  },
  { h2: "What to say each time (without nagging)" },
  {
    ul: [
      "**Always add something.** New info, a tip, availability, or an offer — never a bare \"following up.\"",
      "**Keep it short.** One or two lines. Easy to read, easy to answer.",
      "**Stay friendly, not needy.** You're a professional offering help, not chasing. Tone matters more than frequency.",
      "**Make replying effortless.** End with one simple yes/no question.",
    ],
  },
  { h2: "Reviving old leads that went silent" },
  {
    p: "Leads from months ago aren't dead — they're dormant. A light re-engagement often works: \"Hi [Name], circling back — are you still looking for [service]? Happy to help if the timing's better now.\" Low pressure, easy out. A small percentage will say yes, and those cost you nothing to win back.",
  },
  { h2: "Automate the reminders, personalize the message" },
  {
    p: `The reason follow-up gets skipped is memory and time — you're on a job when touch 3 was due. Automate the reminder, not the relationship: let software prompt you (or send a light nudge) so no lead falls through, then send a real, human message. ${SITE.brand} keeps you fast on new leads by delivering them to WhatsApp in real time; pair that speed with a steady follow-up habit and your close rate climbs without more leads. See [lead automation](/en/guides/lead-automation).`,
  },
];

const FAQ = [
  {
    q: "How long should I wait between follow-ups?",
    a: "Start close together, then space out: same day, next day, then every few days, then about a week. Front-loading matters because leads cool fast, but widening the gaps later keeps you from feeling pushy.",
  },
  {
    q: "When should I stop following up?",
    a: "After 4–5 value-adding touches with no response, send a graceful final message and stop. Leaving the door open ('reach out anytime') often earns a reply later and protects the relationship for referrals.",
  },
  {
    q: "Is it worth reviving leads from months ago?",
    a: "Yes — it's nearly free. A short, low-pressure re-engagement message to old leads will win back a small but real percentage, especially for services people need repeatedly or seasonally.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["first-message-to-lead", "speed-to-lead", "lead-automation"]} />;
}
