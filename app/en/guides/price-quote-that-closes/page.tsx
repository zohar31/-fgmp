import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "price-quote-that-closes";
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
  { h2: "A quote is a sales pitch, not a receipt" },
  {
    p: "Most quotes are just a number and a total — and then the business wonders why the customer ghosted. A quote is the last thing a prospect reads before deciding, which makes it your closing pitch in writing. Treat it that way and your close rate climbs without changing your prices at all.",
  },
  { h2: "Send it fast" },
  {
    p: "A quote's power fades by the hour. Send it while the conversation is warm — ideally same day, ideally within a couple of hours. A good quote sent tomorrow loses to a decent one sent now, because the customer has already called three competitors. See [speed to lead](/en/guides/speed-to-lead).",
  },
  { h2: "What a closing quote includes" },
  {
    ol: [
      "**A clear scope.** Spell out exactly what they get — materials, labor, timeline. Vague scope invites 'why so much?'",
      "**The price, tied to value.** Don't just state a number; connect it to the outcome and what's included.",
      "**What sets you apart.** One or two trust signals — insured, warrantied, reviews, availability.",
      "**A clear next step.** End with the action: 'Reply yes and I'll book you for Thursday.' Never leave it open.",
      "**A gentle time element.** If real, note limited availability so it doesn't sit forever.",
    ],
  },
  { h2: "Anchor the price" },
  {
    p: "Numbers feel big or small only in comparison. Anchor yours: show what's included so the price maps to real value, or offer tiers (good / better / best) so the customer chooses a level instead of debating whether to buy at all. A single naked number invites the response 'that's a lot'; a number with context invites 'what's included?'.",
  },
  { h2: "Don't let it sit — follow up" },
  {
    p: "The quote isn't the end of the conversation; it's the middle. Most quotes need a nudge: \"Hi [Name], did you get a chance to look at the quote? Happy to answer any questions.\" A large share of jobs are won by the business that followed up on the quote, not the one with the lowest number. See [following up with cold leads](/en/guides/follow-up-cold-leads) and [handling the price objection](/en/guides/price-objection).",
  },
  { h2: "Quote first, win more" },
  {
    p: `The biggest edge in quoting is being the first credible quote a customer sees — before competitors anchor them low. That comes from reaching the lead early. ${SITE.brand} sends high-intent Facebook-group leads to your WhatsApp in real time, so you can qualify and quote while you're still the only one in the conversation. Pair speed with a well-built quote and you close on value, not the lowest price.`,
  },
];

const FAQ = [
  {
    q: "How fast should I send a quote?",
    a: "As fast as you reasonably can — ideally the same day, within a couple of hours if possible. Quote value decays quickly because customers are usually collecting several. First credible quote often sets the anchor and wins.",
  },
  {
    q: "Should I offer one price or several options?",
    a: "Tiered options (good/better/best) often close better than a single number. They shift the customer from 'should I buy?' to 'which one?', and the middle tier tends to feel like the sensible choice.",
  },
  {
    q: "What do I do when a customer doesn't respond to my quote?",
    a: "Follow up — most quotes need it. Send a short, friendly nudge offering to answer questions, then a second touch with a soft deadline. Many jobs are won purely because you followed up and the competitor didn't.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["price-objection", "sales-call-script", "follow-up-cold-leads"]} />;
}
