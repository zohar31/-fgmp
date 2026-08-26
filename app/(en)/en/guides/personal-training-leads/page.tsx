import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "personal-training-leads";
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
  { h2: "Results sell — retention pays" },
  {
    p: "Personal training is sold on transformation and trust: a prospective client wants proof you can get them results and a coach they'll actually stick with. And because training is ongoing, the real money is in retention — a client who trains with you for a year is worth far more than ten one-session trials. Here's how trainers fill their roster and keep it full.",
  },
  { h2: "Show transformations and proof" },
  {
    ul: [
      "**Client results** — before/after (with permission), testimonials, and specific outcomes.",
      "**Your niche and approach** — 'busy parents', 'strength for over-40s', 'postpartum' — a clear specialty attracts the right clients.",
      "**Reviews** — social proof that you're effective and easy to work with.",
    ],
  },
  { h2: "Online widens the pool" },
  {
    p: "In-person training is local; online coaching removes the geography limit and scales better. Many trainers do both — in-person for local premium clients, online programs for reach. Decide your mix, because it changes where you look for leads and how you price.",
  },
  { h2: "Where people ask for a trainer" },
  {
    ul: [
      "**Local Facebook groups** — 'looking for a personal trainer in [city]', 'recommend a trainer for weight loss', 'anyone do postpartum fitness?'. Warm, local, high-intent. See [Facebook group leads](/en/guides/facebook-group-leads).",
      "**Google Business Profile & reviews** — 'personal trainer near me'. See [the GBP guide](/en/guides/google-business-profile).",
      "**Referrals** — happy clients (and their friends who see the results) are your best source.",
    ],
  },
  { h2: "Convert and keep" },
  {
    p: "Respond fast to inquiries, offer a low-friction first step (consult or trial), then focus relentlessly on retention: results, accountability, and a plan keep clients paying. See [speed to lead](/en/guides/speed-to-lead) and [following up](/en/guides/follow-up-cold-leads).",
  },
  { h2: "Catch every 'need a trainer' post automatically" },
  {
    p: `People ask for trainers in local and community groups constantly — especially in January and before summer. ${SITE.brand} scans local Facebook groups 24/7, filters for personal-training requests in your area, and sends them to your WhatsApp instantly — so you reach out first. See personal-training lead pages for your city on the [personal trainer leads hub](/en/leads/personal-trainer).`,
  },
];

const FAQ = [
  {
    q: "How do personal trainers get more clients?",
    a: "Show results and testimonials, pick a clear niche, respond fast to inquiries, and offer a low-friction first step. Local Facebook groups (people ask for trainers constantly), a strong Google Business Profile, and client referrals are the best high-intent sources.",
  },
  {
    q: "Should I train in person or online?",
    a: "Many trainers do both — in-person for premium local clients and online programs for reach and scale. Your choice shapes where you find leads and how you price; online removes the geographic limit but is more competitive.",
  },
  {
    q: "What matters most for a training business?",
    a: "Retention. Getting clients matters, but keeping them through results, accountability, and a clear plan is where the money is — a long-term client is worth far more than a stream of one-off trials.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["leads-for-service-businesses", "follow-up-cold-leads", "marketing-for-content-creators"]} />;
}
