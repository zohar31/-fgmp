import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "marketing-for-salons";
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
  { h2: "In beauty, a full book is the whole game" },
  {
    p: "Salons, stylists, barbers, nail techs, and estheticians all live by one number: how full the appointment book is. Beauty marketing is local, visual, and built on trust and social proof — people want to see your work and hear that others love it before they book. Here's how to fill your chair and keep it full, without spending a fortune on ads.",
  },
  { h2: "Reviews and social proof do the selling" },
  {
    p: "Before booking a new stylist, people check reviews and photos. Two things matter most: a steady stream of recent 5-star reviews, and real before/after photos of your work. Ask every happy client for a review while they're glowing in the chair, and make photos part of your routine. This is the highest-ROI 'marketing' in beauty — and it's free.",
  },
  { h2: "Get found locally" },
  {
    ul: [
      "**Google Business Profile** — 'salon near me' and 'balayage near me' go straight to Maps. Optimize it and load it with photos. See [the GBP guide](/en/guides/google-business-profile).",
      "**Instagram and social** — your feed is your portfolio; post your best work consistently.",
      "**Local Facebook groups** — people constantly ask 'can anyone recommend a good hairdresser/nail tech in [area]?' See [Facebook group leads](/en/guides/facebook-group-leads).",
    ],
  },
  { h2: "Rebooking is cheaper than new clients" },
  {
    p: "The cheapest customer is the one already in your chair. Rebook every client before they leave, send a friendly reminder when they're due, and reward loyalty. A steady base of regulars smooths out the slow weeks and cuts how many brand-new clients you need to chase. Retention is marketing.",
  },
  { h2: "Respond fast to new inquiries" },
  {
    p: "When someone messages asking about availability or prices, the first salon to reply warmly usually gets the booking — beauty clients are ready to book now. Slow replies send them to the next name on the list. See [speed to lead](/en/guides/speed-to-lead) and [managing leads in WhatsApp](/en/guides/manage-leads-in-whatsapp).",
  },
  { h2: "Catch every 'can anyone recommend' post" },
  {
    p: `Local groups are full of people asking for beauty recommendations — but those posts scroll away while you're with a client. ${SITE.brand} watches your local groups 24/7, filters for people asking about your services in your area, and sends the leads to your WhatsApp in real time, so you can reply first and book them in. See [leads for service businesses](/en/guides/leads-for-service-businesses).`,
  },
];

const FAQ = [
  {
    q: "What's the best marketing for a salon or beauty business?",
    a: "Reviews, photos of your work, and a strong local presence (Google Business Profile, Instagram, local groups). Beauty is visual and trust-based, so social proof plus being easy to find and quick to reply beats paid ads for most salons.",
  },
  {
    q: "How do salons get new clients without paid ads?",
    a: "Collect reviews relentlessly, post real before/after photos, optimize your Google Business Profile, and respond fast to recommendation requests in local Facebook groups. Rebooking existing clients also reduces how many new ones you need.",
  },
  {
    q: "How important are online reviews for beauty pros?",
    a: "Critical. New clients almost always check reviews and photos before booking a stylist or salon. A steady flow of recent, positive reviews is one of the most powerful and cost-free marketing assets a beauty business has.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["google-business-profile", "leads-for-service-businesses", "speed-to-lead"]} />;
}
