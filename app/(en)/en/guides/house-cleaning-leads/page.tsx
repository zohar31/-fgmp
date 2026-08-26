import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "house-cleaning-leads";
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
  { h2: "Recurring clients are the whole game" },
  {
    p: "A one-time deep clean is nice; a weekly or biweekly recurring client is a business. House cleaning lives on retention — one recurring client can be worth thousands a year and refers others like them. So the goal isn't just more leads; it's more of the right leads (people wanting regular service) and keeping them. Here's how cleaners build a full, recurring book without competing purely on price.",
  },
  { h2: "Trust wins the booking" },
  {
    p: "You're being trusted inside someone's home, often when they're not there. That makes trust the deciding factor: a steady stream of recent 5-star reviews, being insured and bonded, and a friendly, professional first response beat a cheaper unknown every time. Ask every happy client for a review and a referral.",
  },
  { h2: "Where homeowners ask for a cleaner" },
  {
    ul: [
      "**Local Facebook groups** — 'looking for a house cleaner', 'recommend a cleaning service in [city]', 'need a reliable maid service'. Warm, local, free to answer first. See [Facebook group leads](/en/guides/facebook-group-leads).",
      "**Google Business Profile & reviews** — 'house cleaning near me'. See [the GBP guide](/en/guides/google-business-profile).",
      "**Referrals** — cleaning spreads by word of mouth among neighbors, friends, and family.",
    ],
  },
  { h2: "Push for recurring, not one-off" },
  {
    ul: [
      "**Offer a recurring plan** (weekly/biweekly/monthly) as the default, with one-time cleans as the exception.",
      "**Make rebooking automatic** — schedule the next visit before you leave.",
      "**Reward loyalty and referrals** to lock in your base and grow it cheaply.",
    ],
  },
  { h2: "Respond first, book faster" },
  {
    p: "Someone asking for a cleaner is usually ready to book now. The first cleaner to reply warmly with availability tends to win. See [speed to lead](/en/guides/speed-to-lead) and [managing leads in WhatsApp](/en/guides/manage-leads-in-whatsapp).",
  },
  { h2: "A steady stream of local clients" },
  {
    p: `Cleaning requests pop up daily in local groups and get snapped up fast. ${SITE.brand} scans local Facebook groups 24/7, filters for cleaning requests in your area, and sends them to your WhatsApp instantly — so you're first to reply and can turn each into a recurring client. See house-cleaning lead pages for your city on the [house cleaning leads hub](/en/leads/house-cleaner).`,
  },
];

const FAQ = [
  {
    q: "How do house cleaners get more clients?",
    a: "Win on trust (reviews, insured/bonded, professional response), be first to reply to local requests, and default every booking toward a recurring plan. Local Facebook groups, referrals, and a strong Google Business Profile are the best low-cost sources.",
  },
  {
    q: "Why focus on recurring clients?",
    a: "Because one weekly or biweekly client can be worth thousands a year and tends to refer similar clients. Retention is far cheaper than constantly finding one-off jobs, and it smooths your income and schedule.",
  },
  {
    q: "How do cleaners compete without lowering prices?",
    a: "Lead with trust and reliability rather than price. Homeowners letting a stranger into their home value reviews, insurance, and dependability over the cheapest quote — so social proof and a professional response win the booking.",
  },
];

export default function Page() {
  return (
    <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["leads-for-service-businesses", "speed-to-lead", "marketing-for-salons"]} />
  );
}
