import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "junk-removal-leads";
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
  { h2: "Junk removal is fast-turnaround and volume-driven" },
  {
    p: "People who need junk gone usually want it gone soon — after a move, a cleanout, a renovation, or a big purchase. It's a same-day, volume business where the first company to reply with a quick quote and an available slot wins. Keep the trucks full with a steady stream of local jobs and layer in recurring commercial accounts, and it's a great business. Here's how.",
  },
  { h2: "Speed and simple pricing win" },
  {
    ul: [
      "**Reply fast with an availability window** — same-day capability is a strong selling point.",
      "**Make pricing simple** — by load/volume, ideally with a quick photo-based estimate — so booking is frictionless.",
      "**Show up when you say** — reliability earns reviews and referrals in a trust-light category.",
    ],
  },
  { h2: "Chase the recurring accounts too" },
  {
    p: "One-off cleanouts pay today; property managers, realtors (turnovers and estate cleanouts), contractors (debris), and retailers (deliveries/returns) provide repeat volume. Building a few commercial relationships smooths income between residential jobs. See [B2B leads](/en/guides/b2b-leads).",
  },
  { h2: "Where people ask for junk removal" },
  {
    ul: [
      "**Local Facebook groups** — 'need junk hauled away', 'anyone do same-day junk removal in [city]?', 'cleanout after a move'. Warm, local, free to answer first. See [Facebook group leads](/en/guides/facebook-group-leads).",
      "**Google Business Profile & reviews** — 'junk removal near me'. See [the GBP guide](/en/guides/google-business-profile).",
      "**Referrals** — from realtors, property managers, and contractors.",
    ],
  },
  { h2: "Catch every cleanout request automatically" },
  {
    p: `Junk-removal requests appear in local groups all the time — and get answered fast. ${SITE.brand} scans local Facebook groups 24/7, filters for junk-removal requests in your area, and sends them to your WhatsApp instantly — so you're first to reply and book the load. See junk-removal lead pages for your city on the [junk removal leads hub](/en/leads/junk-removal).`,
  },
];

const FAQ = [
  {
    q: "How do junk removal companies get more jobs?",
    a: "Win on speed and simple pricing — reply fast with same-day availability and an easy quote. Monitor local Facebook groups for cleanout posts, keep a strong Google Business Profile, and build recurring commercial accounts with realtors, property managers, and contractors.",
  },
  {
    q: "How should junk removal be priced for easy booking?",
    a: "By load size or volume, ideally with a fast photo-based estimate so customers can book without a site visit. Simple, upfront pricing reduces friction and helps you win the fast-turnaround jobs this business depends on.",
  },
  {
    q: "Where do junk removal leads come from?",
    a: "Local Facebook groups (cleanout and haul-away posts), a strong Google Business Profile, and repeat referrals from realtors, property managers, and contractors are the best low-cost, high-intent sources.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["leads-for-service-businesses", "speed-to-lead", "pressure-washing-leads"]} />;
}
