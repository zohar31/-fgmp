import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "sales-call-script";
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
  { h2: "Why you need a script (even if you hate scripts)" },
  {
    p: "A script isn't about sounding robotic — it's about never fumbling the moment that matters. When a hot lead picks up, you don't want to improvise your way through price and next steps. A simple structure keeps you calm, covers what matters, and closes more jobs. You'll say it in your own voice; the script just makes sure you hit every beat.",
  },
  { h2: "The 5-part call structure" },
  {
    ol: [
      "**Open — 10 seconds.** Confirm who you're talking to and why: \"Hi Sarah, it's Mike returning your message about the kitchen leak — is now a good time?\"",
      "**Qualify — ask, don't pitch.** Understand the job before you talk price: \"Tell me what's going on?\" Then dig: how long, how urgent, what have they tried. People buy more when they feel heard.",
      "**Present — tie the price to the outcome.** \"For a job like this it's usually around $X, and here's exactly what that includes...\" Anchor to value, not just a number.",
      "**Handle objections — expect them.** Price, timing, or 'I need to think.' Don't panic or discount. See [handling the price objection](/en/guides/price-objection).",
      "**Close — ask for the next step.** Never end vague. \"I've got Thursday morning or Friday afternoon — which works?\" Offer a choice, not a yes/no.",
    ],
  },
  { h2: "The exact opening lines" },
  {
    p: "\"Hi [Name], this is [Your Name] from [Business] — you reached out about [their exact need]. Did I catch you at an okay time?\" This does three things: it's fast, it references their request (so it's not a cold call), and it gets a small yes that starts the conversation.",
  },
  { h2: "Qualifying questions that work" },
  {
    ul: [
      "\"Walk me through what you're dealing with.\" — lets them talk; you listen.",
      "\"How soon are you looking to get this done?\" — reveals urgency (and buying intent). See [hot vs. cold leads](/en/guides/hot-vs-cold-leads).",
      "\"Have you had anyone look at it yet?\" — tells you if you're competing and where they are in the process.",
      "\"What's most important to you — speed, price, or getting it done right?\" — tells you how to present.",
    ],
  },
  { h2: "Mistakes that lose the job on the phone" },
  {
    ul: [
      "**Talking too much.** The customer should talk more than you, especially early.",
      "**Quoting before you understand the job.** A number with no context invites 'that's too expensive.'",
      "**Ending without a next step.** 'I'll send you a quote' with no date = a lead that drifts away. Book something.",
      "**Being slow to call back.** The script only works if you're first. See [speed to lead](/en/guides/speed-to-lead).",
    ],
  },
  { h2: "The script only works if the phone rings" },
  {
    p: `A great call script is useless without leads to call. ${SITE.brand} keeps your pipeline full by sending high-intent Facebook-group leads straight to your WhatsApp in real time — so you're calling people who just asked for your service, while they're still looking. Fresh lead + fast callback + a solid script = booked jobs.`,
  },
];

const FAQ = [
  {
    q: "How do I not sound like I'm reading a script?",
    a: "Learn the structure, not the exact words. Know your five beats — open, qualify, present, handle objections, close — and say each in your own natural voice. Practice out loud a few times and it stops sounding scripted.",
  },
  {
    q: "Should I give a price on the first call?",
    a: "Yes, if you understand the job — but only after qualifying. Ask questions first so your number lands with context. If you truly can't price it without seeing it, book the visit as your close instead.",
  },
  {
    q: "What if they say they need to think about it?",
    a: "Ask a gentle question: 'Totally fair — is it the price, the timing, or something else?' That surfaces the real objection so you can address it, instead of letting a soft 'maybe' quietly become a no.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["price-objection", "first-message-to-lead", "speed-to-lead"]} />;
}
