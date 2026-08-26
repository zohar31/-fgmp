import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "appliance-repair-leads";
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
  { h2: "A dead appliance is an emergency" },
  {
    p: "When a fridge stops cooling, a washer floods, or an oven quits before a dinner, the homeowner wants it fixed today — and calls whoever answers first and can come soon. Appliance repair is high-intent and fast-moving, which means speed and availability win more jobs than any clever marketing. Here's how appliance repair techs stay booked.",
  },
  { h2: "Speed and same-day availability win" },
  {
    p: "The first tech to reply with a same-day or next-day slot usually gets the job. Because many shops are slow to answer, simply being fast and reachable is a real edge. See [speed to lead](/en/guides/speed-to-lead).",
  },
  { h2: "Build trust and set expectations" },
  {
    ul: [
      "**Reviews** — reassure a homeowner letting a stranger fix an expensive appliance.",
      "**A clear diagnostic fee and upfront estimates** — avoid friction and build trust.",
      "**Brand/type specialization** ('we service LG, Samsung, Sub-Zero') helps you stand out and win the right jobs.",
    ],
  },
  { h2: "Where homeowners ask for appliance repair" },
  {
    ul: [
      "**Local Facebook groups** — 'fridge stopped cooling, need repair ASAP', 'recommend an appliance repair tech in [city]', 'washer won't drain'. Urgent, warm, local. See [Facebook group leads](/en/guides/facebook-group-leads).",
      "**Google Business Profile & reviews** — 'appliance repair near me'. See [the GBP guide](/en/guides/google-business-profile).",
      "**Referrals & property managers** — landlords and property managers need reliable repair techs on call.",
    ],
  },
  { h2: "Catch every repair request automatically" },
  {
    p: `Appliance breakdowns get posted in local groups the moment they happen — and answered fast. ${SITE.brand} scans local Facebook groups 24/7, filters for appliance-repair requests in your area, and sends them to your WhatsApp instantly — so you're first to reply. See appliance-repair lead pages for your city on the [appliance repair leads hub](/en/leads/appliance-repair).`,
  },
];

const FAQ = [
  {
    q: "How do appliance repair techs get more calls?",
    a: "Win on speed and availability — the first to offer a same-day or next-day slot usually gets the job. Back it with strong reviews, clear diagnostic pricing, and monitoring of local Facebook groups where broken-appliance posts appear.",
  },
  {
    q: "Should I charge a diagnostic fee?",
    a: "A clear, upfront diagnostic fee is standard and filters out non-serious callers, but communicate it plainly to build trust. Many techs credit it toward the repair, which reassures customers and improves conversion.",
  },
  {
    q: "Where's the best place to find appliance repair leads?",
    a: "Local Facebook groups (urgent breakdown posts), a strong Google Business Profile, and relationships with property managers and landlords who need reliable techs on call are the best low-cost, high-intent sources.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["leads-for-service-businesses", "speed-to-lead", "garage-door-leads"]} />;
}
