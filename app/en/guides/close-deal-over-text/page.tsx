import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "close-deal-over-text";
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
  { h2: "Texting is where deals happen now" },
  {
    p: "More customers would rather text than take a call — it's lower pressure and fits their day. That's an opportunity, but closing over text and WhatsApp is its own skill. You lose tone of voice, so clarity and speed matter more, and it's easier for a chat to fizzle into silence. Done right, though, you can take someone from 'just asking' to a booked job without a single phone call.",
  },
  { h2: "Reply fast, then keep the momentum" },
  {
    p: "The first reply should be within minutes — texts are answered fast, and a lead who's warm now may be gone in an hour. Once the conversation starts, keep it moving. Every message should end with a question or a next step so the ball is always in their court, never dropped. See [speed to lead](/en/guides/speed-to-lead).",
  },
  { h2: "Build trust in a few short lines" },
  {
    ul: [
      "**Be specific to their job** — reference exactly what they asked for. It shows you read it.",
      "**Drop one proof point** — 'we're fully insured' or 'we do this every week' — not your whole résumé.",
      "**Be human** — a friendly, plain-English tone beats formal or salesy. People buy from people.",
      "**Answer clearly** — vague answers over text read as evasive. Give the info, then guide the next step.",
    ],
  },
  { h2: "Quote clearly, then ask for the yes" },
  {
    p: "Don't let a quote just sit there. Pair the number with what's included and an immediate next step: \"For that it's [$X], includes [details]. I've got Thursday AM or Friday PM open — which works?\" Offering two specific times is one of the most effective text-closing moves there is: it turns an open question into an easy choice. See [handling the price objection](/en/guides/price-objection) if they hesitate.",
  },
  { h2: "Create honest urgency" },
  {
    p: "Urgency closes — as long as it's real. A genuinely limited slot ('I've got one opening this week'), a seasonal deadline, or a filling schedule all nudge a decision without pressure. Never fake it; customers can tell, and it costs you trust. Real scarcity, stated simply, moves people off the fence.",
  },
  { h2: "Don't leave it hanging" },
  {
    p: "The number one reason text deals die is that no one asks for the close. When the info's been shared, ask directly and simply: \"Want me to book it?\" Then, if they go quiet, follow up — see [message templates](/en/guides/message-templates-for-leads) and [following up](/en/guides/follow-up-cold-leads).",
  },
  { h2: "Start every close with a fresh lead" },
  {
    p: `Closing over text is easiest when you got there first, while the customer is still deciding. ${SITE.brand} delivers high-intent Facebook-group leads to your WhatsApp in real time, so your first message lands before competitors even see the request. Fresh lead, fast reply, clear close — that's the whole game.`,
  },
];

const FAQ = [
  {
    q: "Is it unprofessional to close a deal over text?",
    a: "Not anymore. Many customers prefer texting and will book faster over WhatsApp or SMS than by phone. What matters is being clear, fast, and human — not the channel. For a lot of service businesses, text now closes as well as or better than calls.",
  },
  {
    q: "How do I stop text conversations from going silent?",
    a: "End every message with a question or a concrete next step, and offer two specific appointment times instead of asking an open 'when works?' If they still go quiet, follow up with a short, value-adding message rather than a bare 'you there?'",
  },
  {
    q: "When should I switch from text to a call?",
    a: "When the job is complex, the customer has lots of questions, or you sense hesitation that's easier to resolve by voice. Offer, don't force: 'Happy to jump on a quick call if that's easier — or I can send everything here.'",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["message-templates-for-leads", "sales-call-script", "price-objection"]} />;
}
