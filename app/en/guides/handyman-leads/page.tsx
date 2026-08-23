import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "handyman-leads";
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
  { h2: "Handyman work is high-volume and local" },
  {
    p: "Handyman jobs are smaller and more frequent than most trades — a mounted TV here, a leaky faucet there, a fence repair, a furniture assembly. That means the game is volume and reliability: keep a steady stream of local jobs, show up when you say you will, and turn one-off calls into a repeat customer base. Here's how handymen keep the calendar full without overspending on leads.",
  },
  { h2: "Speed and reliability win" },
  {
    p: "Homeowners want small jobs handled quickly by someone dependable. The handyman who replies fast and can come soon usually gets the job — and because so many no-show or reply slowly, simply being responsive and reliable sets you apart. See [speed to lead](/en/guides/speed-to-lead).",
  },
  { h2: "Where homeowners ask for a handyman" },
  {
    ul: [
      "**Local Facebook groups** — 'need a reliable handyman', 'who do you use for small repairs?', 'handyman for a few odd jobs in [city]'. Constant, warm, and free to answer first. See [Facebook group leads](/en/guides/facebook-group-leads).",
      "**Google Business Profile & reviews** — 'handyman near me'. See [the GBP guide](/en/guides/google-business-profile).",
      "**Referrals & repeat customers** — the backbone of a handyman business; one happy client calls again and again.",
    ],
  },
  { h2: "Make small jobs profitable" },
  {
    ul: [
      "**Bundle jobs** — a minimum visit fee or grouping several tasks per trip keeps small jobs worthwhile.",
      "**Turn one-offs into regulars** — leave a card, follow up, and become their go-to. Retention beats constant new-lead hunting.",
      "**Be clear on pricing** upfront to avoid friction on small tickets. See [handling the price objection](/en/guides/price-objection).",
    ],
  },
  { h2: "Fill the calendar automatically" },
  {
    p: `Handyman requests appear all day in local groups — and get answered fast. You can't watch them all while on a job. ${SITE.brand} scans local Facebook groups 24/7, filters for handyman requests in your area, and sends them to your WhatsApp instantly — so you're the reliable first reply. See handyman lead pages for your city on the [handyman leads hub](/en/leads/handyman).`,
  },
];

const FAQ = [
  {
    q: "How do handymen get more jobs?",
    a: "Win on speed and reliability, and build a repeat base. Respond fast to local requests, keep a strong Google Business Profile with reviews, monitor local Facebook groups for handyman posts, and turn one-off customers into regulars who call you again.",
  },
  {
    q: "How do I make small handyman jobs worth it?",
    a: "Use a minimum visit fee, bundle several tasks into one trip, and be upfront about pricing. Then focus on retention — a repeat customer who calls monthly is far more profitable than constantly chasing new one-off leads.",
  },
  {
    q: "Where's the best place to find handyman leads?",
    a: "Local Facebook groups and neighborhood groups are ideal — homeowners constantly ask for a reliable handyman there. Combined with referrals and a good Google Business Profile, they provide a steady, low-cost stream of local jobs.",
  },
];

export default function Page() {
  return (
    <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["leads-for-service-businesses", "speed-to-lead", "marketing-for-contractors"]} />
  );
}
