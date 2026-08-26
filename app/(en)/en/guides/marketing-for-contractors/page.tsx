import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "marketing-for-contractors";
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
  { h2: "Contractors don't need marketing — they need a full schedule" },
  {
    p: "Most contractors aren't looking for a brand strategy; they want the phone to ring with real jobs. The good news is that construction and home-service work is driven by high-intent, local demand — people who need a job done now. Marketing for a contractor is really about being visible and fast where those people are looking. Here's what actually works.",
  },
  { h2: "The best lead sources for contractors" },
  {
    ol: [
      "**Referrals and past clients.** Home-service work runs on word of mouth. Ask every satisfied client for a referral and a review — it's your cheapest, warmest source.",
      "**Google Business Profile.** When someone searches 'remodeler near me' or 'roofer in [city]', your profile decides if they find you. Free and essential. See [the GBP guide](/en/guides/google-business-profile).",
      "**Facebook groups.** Local and neighborhood groups are full of homeowners asking for contractor recommendations daily. High intent, low cost. See [Facebook group leads](/en/guides/facebook-group-leads).",
      "**Google Ads.** High intent but competitive and pricey per click — useful once the free channels are working.",
    ],
  },
  { h2: "Get found locally" },
  {
    p: "Contractor demand is local, so local visibility is everything. Optimize your Google Business Profile, collect reviews consistently (they're the #1 trust signal for home services), and be present in your area's Facebook groups. A homeowner choosing a contractor is nervous about trust — reviews and a real local presence do more than any ad.",
  },
  { h2: "Speed wins the job" },
  {
    p: "Homeowners with a leak, a broken AC, or a renovation on their mind contact several contractors and often hire the first solid one to respond. Being fast is a genuine competitive edge — many contractors are on a job site and slow to reply, so answering quickly wins work you'd otherwise lose. See [speed to lead](/en/guides/speed-to-lead).",
  },
  { h2: "Quote like a pro" },
  {
    p: "For bigger jobs, the quote often decides it. Send it fast, spell out the scope, tie the price to what's included, and follow up. A clear, professional quote beats a lower number that comes with vague scope and no follow-up. See [the price quote that closes](/en/guides/price-quote-that-closes) and [handling the price objection](/en/guides/price-objection).",
  },
  { h2: "Fill your schedule automatically" },
  {
    p: `The hard part of the best free channel — Facebook groups — is that you're on a job site when the 'anyone know a good contractor?' post goes up, and it's gone by the time you check. ${SITE.brand} solves that: it scans local groups 24/7, filters for real contractor requests in your trade and area, and sends them to your WhatsApp in real time. You reply first, from the field, and keep your schedule full without scrolling. See [leads by trade](/en/leads).`,
  },
];

const FAQ = [
  {
    q: "What's the best way for a contractor to get leads?",
    a: "Stack the high-intent, low-cost channels: referrals and reviews, an optimized Google Business Profile, and local Facebook groups where homeowners ask for recommendations. Add Google Ads once those are producing and you have cash flow.",
  },
  {
    q: "How do contractors compete without a big ad budget?",
    a: "Speed and trust. Respond faster than other contractors (many are slow because they're on-site), collect reviews relentlessly, and be present where homeowners ask for referrals. Those beat ad spend for most local contractors.",
  },
  {
    q: "Do Facebook groups really work for contractors?",
    a: "Yes — home services are one of the strongest fits. Local and neighborhood groups have constant 'who do you recommend for [trade]?' posts. The key is spotting and answering them fast, which is exactly what automation handles.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["facebook-group-leads", "google-business-profile", "speed-to-lead"]} />;
}
