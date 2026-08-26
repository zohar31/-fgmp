import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "auto-repair-leads";
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
  { h2: "Drivers hire the mechanic they trust" },
  {
    p: "Auto repair has a trust problem: many drivers assume they'll be overcharged or sold work they don't need. That fear is your biggest opportunity — the shop that comes across as honest, fair, and competent wins customers for life. Combined with the urgency of a car that won't run, trust is what turns a one-time repair into a loyal, repeat customer. Here's how to get more of them.",
  },
  { h2: "Trust is the whole strategy" },
  {
    ul: [
      "**Reviews** — the #1 way drivers judge whether a shop is honest. Ask every satisfied customer.",
      "**Transparent estimates and explanations** — show the problem, explain the fix, no surprise add-ons.",
      "**Fair diagnostics** — a clear diagnostic policy builds confidence and filters tire-kickers.",
    ],
  },
  { h2: "Urgency drives the first call" },
  {
    p: "A car that won't start or is making a scary noise is an urgent problem — the driver calls around and goes with the shop that answers, sounds trustworthy, and can look at it soon. Being responsive and reassuring wins the job. See [speed to lead](/en/guides/speed-to-lead).",
  },
  { h2: "Where drivers ask for a mechanic" },
  {
    ul: [
      "**Local Facebook groups** — 'need an honest mechanic in [city]', 'recommend an auto shop', 'who do you trust for brakes/transmission?'. The word 'honest' comes up constantly — this is high-intent, trust-seeking demand. See [Facebook group leads](/en/guides/facebook-group-leads).",
      "**Google Business Profile & reviews** — 'mechanic near me'. See [the GBP guide](/en/guides/google-business-profile).",
      "**Referrals & repeat customers** — a trusted shop keeps customers for years and earns word of mouth.",
    ],
  },
  { h2: "Turn repairs into repeat customers" },
  {
    p: "The real value is the lifetime customer, not the one repair. Reminders for maintenance, honest advice, and a great experience bring drivers back for every future issue and send their friends. Retention and referrals are the cheapest growth an auto shop has.",
  },
  { h2: "Catch every 'need a mechanic' post automatically" },
  {
    p: `Drivers ask for a trustworthy mechanic in local groups all the time — and recommendations fly fast. ${SITE.brand} scans local Facebook groups 24/7, filters for auto-repair requests in your area, and sends them to your WhatsApp instantly — so you're first to respond and earn the trust. See auto-repair lead pages for your city on the [auto repair leads hub](/en/leads/auto-mechanic).`,
  },
];

const FAQ = [
  {
    q: "How do auto repair shops get more customers?",
    a: "Win on trust: strong reviews, transparent estimates, and honest explanations, plus fast, reassuring response to urgent problems. Local Facebook groups (drivers ask for 'honest mechanics' constantly), a strong Google Business Profile, and repeat/referral business are the best sources.",
  },
  {
    q: "Why is trust so central to auto repair marketing?",
    a: "Because drivers fear being overcharged or sold unnecessary work. The shop that clearly communicates and earns a reputation for honesty wins customers for life — which is why reviews and transparency outperform discount offers.",
  },
  {
    q: "Where do auto repair leads come from?",
    a: "Local Facebook groups where drivers ask for a trustworthy mechanic, a strong Google Business Profile with reviews, and repeat customers and referrals are the highest-intent, lowest-cost sources.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["leads-for-service-businesses", "speed-to-lead", "quality-leads"]} />;
}
