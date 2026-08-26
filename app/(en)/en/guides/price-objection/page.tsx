import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "price-objection";
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
  { h2: "\"You're too expensive\" rarely means what you think" },
  {
    p: "When a customer says you're too expensive, they're usually saying one of three things: *I don't see the value yet*, *I'm comparing you to a cheaper quote*, or *I can't picture what I'm actually getting*. Almost none of those are solved by lowering your price. Drop your number too fast and you signal it was inflated to begin with — and you train the customer to push harder.",
  },
  { h2: "Step 1 — Don't flinch, get curious" },
  {
    p: "The worst response is a nervous discount. The best is a calm question: \"I hear you — can I ask what you're comparing it to?\" This does two things: it buys you a moment, and it surfaces the real objection. Maybe they got a cheaper quote for a smaller scope. Maybe they just don't understand what's included. You can't answer an objection you haven't uncovered.",
  },
  { h2: "Step 2 — Re-anchor on value and outcome" },
  {
    p: "Once you know what's behind it, connect the price to what they actually get: \"That price includes [materials], [warranty], [cleanup], and I can start Thursday. The cheaper quote — does it cover all of that?\" You're not attacking the competitor; you're helping them compare apples to apples. Most 'expensive' objections evaporate when the customer sees the full picture.",
  },
  { h2: "Scripts you can use" },
  {
    ul: [
      "**\"What were you expecting to spend?\"** — reveals whether it's a real budget gap or sticker shock.",
      "**\"Compared to what?\"** (said warmly) — exposes whether they're comparing different scopes.",
      "**\"I'm not the cheapest, and here's why that usually saves you money...\"** — reframes price as protection against a redo.",
      "**\"If price weren't the issue, is this the solution you'd want?\"** — separates a price objection from a fit objection.",
    ],
  },
  { h2: "When to hold, when to flex" },
  {
    p: "Holding your price protects your margin and your reputation. But flexing isn't always wrong — just never flex on price alone. If you move, get something back: a smaller scope, a flexible schedule, a review, or a referral. \"I can do $X if we push it to next week\" keeps your value intact. A naked discount destroys it.",
  },
  { h2: "The best objection-handling starts before the call" },
  {
    p: `You'll win more price conversations when you reach the customer first, while they're still deciding — not last, after four competitors already anchored them low. That's the edge of a fresh, high-intent lead. ${SITE.brand} sends Facebook-group leads to your WhatsApp in real time, so you're the trusted first responder setting the value bar, not the one fighting to justify it later. Pair it with a solid [sales call script](/en/guides/sales-call-script).`,
  },
];

const FAQ = [
  {
    q: "Should I ever lower my price?",
    a: "Only in exchange for something — a reduced scope, flexible timing, a review, or a referral. Lowering price for nothing tells the customer your original quote was padded and invites more pushback. Trade, don't cave.",
  },
  {
    q: "How do I compete with a much cheaper quote?",
    a: "Don't match it — expose the difference. Break down what your price includes (materials, warranty, insurance, cleanup, timeline) and ask if the cheaper quote covers the same. Often it doesn't, and the customer chooses value once they can see it.",
  },
  {
    q: "What if they genuinely can't afford it?",
    a: "Then it's a fit problem, not an objection to overcome. Offer a smaller scope or a phased approach if you can, or politely let it go. Chasing customers who can't pay costs you the time you'd spend on ones who can.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["sales-call-script", "cost-per-lead", "first-message-to-lead"]} />;
}
