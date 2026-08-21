import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "mover-leads";
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
  { h2: "Moving leads are expensive — and mostly shared" },
  {
    p: "Moving is one of the most competitive lead categories in the country. Paid moving leads regularly run $30–$100+ each, and most are shared with several companies at once — so you're racing three competitors and quoting against them before the customer has even confirmed a date. The winners in moving aren't the ones who buy the most leads; they're the ones who reach fresh, high-intent movers first, for far less. Here's how.",
  },
  { h2: "What makes a great moving lead" },
  {
    ul: [
      "**Freshness** — someone who just posted 'we're moving next month, who do you recommend?' beats a week-old shared lead every time. See [real-time leads](/en/guides/real-time-leads).",
      "**A real date and route** — a move with a timeline and origin/destination is a booking waiting to happen.",
      "**Exclusivity** — a lead you're not splitting with four other movers. See [exclusive vs. shared leads](/en/guides/exclusive-vs-shared-leads).",
      "**Local intent** — someone moving within or into your service area.",
    ],
  },
  { h2: "Where movers actually post" },
  {
    p: "Before people call a moving company, they very often ask their community first. Local Facebook groups, neighborhood groups, and city 'recommendations' groups fill up daily with 'moving this weekend, need movers', 'who's a reliable moving company in [city]?', and 'need help moving a 2-bedroom'. These are the warmest moving leads there are — public, high-intent, and free to answer if you spot them in time. See [Facebook group leads](/en/guides/facebook-group-leads) and [the best groups](/en/guides/best-facebook-groups-for-leads).",
  },
  { h2: "Speed wins the move" },
  {
    p: "Movers comparison-shop hard, and the company that responds first — with a friendly reply and a fast ballpark — usually gets the estimate booked. On shared paid leads you're one of five calls; on a group request you spotted first, you're the only reply. Either way, response time is the single biggest lever. See [speed to lead](/en/guides/speed-to-lead) and [how to write a quote that closes](/en/guides/price-quote-that-closes).",
  },
  { h2: "Build trust fast" },
  {
    ul: [
      "**Reviews** are decisive — people are handing strangers their belongings. Collect them relentlessly.",
      "**Licensing and insurance** (USDOT #, insurance) reassure nervous customers; mention them early.",
      "**A clear, itemized estimate** beats a vague low number that balloons on moving day.",
    ],
  },
  { h2: "Don't forget the seasonality" },
  {
    p: "Moving demand spikes in summer, at month-ends, and around lease turnovers — and craters in winter. Lean into peaks (respond even faster when volume is high), and in slow months work referrals and past customers harder. A steady lead source smooths the swings so your trucks aren't idle in the off-season. See [leads for service businesses](/en/guides/leads-for-service-businesses).",
  },
  { h2: "Catch every 'we're moving' post — automatically" },
  {
    p: `You can't sit in every local group refreshing for 'need movers' posts while you're on a job. ${SITE.brand} does it for you: it scans local Facebook groups 24/7, filters for real moving requests in your service area, and sends them to your WhatsApp in under a minute — so you reply first, before competitors and without paying $80 a shared lead. See mover lead pages for your city on the [moving leads hub](/en/leads/mover).`,
  },
];

const FAQ = [
  {
    q: "How much do moving leads cost?",
    a: "Paid moving leads commonly run $30–$100+ each and are usually shared with several companies, so your effective cost per booked move is much higher. Organic, high-intent leads from Facebook groups and referrals cost far less per actual job.",
  },
  {
    q: "How do moving companies get exclusive leads?",
    a: "The warmest near-exclusive leads come from people publicly asking for movers in local groups — when you're the first to reply, that lead is effectively yours. Referrals are also exclusive by nature. Both beat shared paid leads on cost per booking.",
  },
  {
    q: "What's the best way to get moving leads without overpaying?",
    a: "Combine referrals and reviews, a strong Google Business Profile, and real-time monitoring of local Facebook groups where people post that they're moving. Respond first and fast — for movers, speed and freshness decide who books the job.",
  },
];

export default function Page() {
  return (
    <GuideLayoutEn
      slug={SLUG}
      blocks={BLOCKS}
      faq={FAQ}
      related={["locksmith-leads", "leads-for-service-businesses", "speed-to-lead"]}
    />
  );
}
