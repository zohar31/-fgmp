import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "leads-for-service-businesses";
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
  { h2: "Service businesses run on a full schedule" },
  {
    p: "Whether you're a plumber, cleaner, mover, electrician, or landscaper, your business comes down to one thing: keeping the schedule full with good jobs. Service leads have a special quality — they're usually local and urgent. Someone needs the service now, in their area. That changes what works: proximity, speed, and trust beat clever marketing every time.",
  },
  { h2: "The best channels for service leads" },
  {
    ol: [
      "**Referrals and reviews.** Service work runs on trust; a referred customer is halfway sold. Ask every happy client.",
      "**Google Business Profile.** 'Plumber near me' searches go straight to Maps — your profile decides if they find you. See [the GBP guide](/en/guides/google-business-profile).",
      "**Facebook groups.** Local groups overflow with 'can anyone recommend a [trade]?' posts — high intent, low cost. See [Facebook group leads](/en/guides/facebook-group-leads).",
      "**Google Ads.** High intent, but competitive and pricey; add it once free channels are working.",
    ],
  },
  { h2: "Speed is your unfair advantage" },
  {
    p: "Service customers with an urgent problem contact several businesses and hire the first solid responder. Many service pros are on a job and slow to reply — so simply answering fast wins work others lose. Response speed is the single biggest lever you control. See [speed to lead](/en/guides/speed-to-lead).",
  },
  { h2: "Trust closes the job" },
  {
    ul: [
      "**Reviews** are the #1 trust signal for local services — collect them relentlessly.",
      "**Insurance, licensing, and guarantees** reassure nervous customers letting a stranger into their home.",
      "**A clear, fast quote** signals professionalism. See [the price quote that closes](/en/guides/price-quote-that-closes).",
    ],
  },
  { h2: "What service leads cost" },
  {
    p: "It varies by trade and channel: paid leads for home services can run $20–$100+ each, and buying them shared means competing on price. Organic, high-intent leads from groups, referrals, and local search cost far less per customer. Always measure cost per booked job, not cost per lead. See [cost per lead](/en/guides/cost-per-lead).",
  },
  { h2: "A steady stream of local jobs" },
  {
    p: `The best free channel for service businesses — local Facebook groups — is also the hardest to work by hand, because the request appears while you're on a job and scrolls away. ${SITE.brand} watches your local groups 24/7, filters for real requests in your trade and area, and sends them to your WhatsApp in real time. You reply first, from the field, and keep the calendar full. See [leads by trade and city](/en/leads).`,
  },
];

const FAQ = [
  {
    q: "What's the best way for a service business to get leads?",
    a: "Combine high-intent, low-cost channels: referrals and reviews, an optimized Google Business Profile, and local Facebook groups. These reach people who need your service now, in your area — which is exactly what service businesses depend on.",
  },
  {
    q: "Why is speed so important for service leads?",
    a: "Service needs are usually urgent, so customers contact several businesses and hire the first good one to respond. Many providers are slow because they're on the job — so replying fast is a genuine competitive edge that wins jobs.",
  },
  {
    q: "How much do leads cost for a service business?",
    a: "Paid home-service leads often run $20–$100+ each and are frequently shared. Organic sources — referrals, local search, and Facebook groups — cost far less per booked job. Always measure cost per customer, not cost per lead.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["facebook-group-leads", "google-business-profile", "speed-to-lead"]} />;
}
