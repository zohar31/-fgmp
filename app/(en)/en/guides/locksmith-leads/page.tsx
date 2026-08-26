import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "locksmith-leads";
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
  { h2: "Locksmith leads are urgent, local, and pricey" },
  {
    p: "Few trades are as speed-driven as locksmithing. Someone locked out of their car or home needs help right now — they're not comparing five quotes, they're calling whoever answers first and can come fast. That urgency is why locksmith leads are among the most expensive in paid advertising, and why the real edge isn't a bigger ad budget — it's being the first, closest, trustworthy answer. Here's how locksmiths get more calls without overpaying.",
  },
  { h2: "Why speed beats everything for locksmiths" },
  {
    p: "For a lockout, the first locksmith to respond and give an ETA usually wins the job — full stop. A brilliant marketing plan means nothing if you answer 20 minutes late. That makes response time the single most important thing you control. Whether the lead comes from a call, an ad, or a group post, answering instantly with 'I can be there in 20 minutes' closes it. See [speed to lead](/en/guides/speed-to-lead).",
  },
  { h2: "Where locksmith leads come from" },
  {
    ul: [
      "**Google (Maps and search)** — 'locksmith near me' at the moment of a lockout. High intent; optimize your [Google Business Profile](/en/guides/google-business-profile) and get reviews.",
      "**Local Facebook groups** — 'locked out, anyone know a good locksmith in [city]?' and 'need my locks rekeyed' appear constantly. Warm, local, and free to answer first. See [Facebook group leads](/en/guides/facebook-group-leads).",
      "**Referrals** — property managers, realtors, and repeat customers are a steady, exclusive source.",
      "**Paid leads / pay-per-call** — available but expensive and often shared. See [why buying leads fails](/en/guides/why-buying-leads-fails).",
    ],
  },
  { h2: "Trust matters more than most trades" },
  {
    p: "People are letting a stranger open their home or car, so trust is everything. A steady stream of recent 5-star reviews, clear licensing, upfront pricing, and a professional response all reassure a stressed customer. Locksmithing also has a reputation problem from scam operators — being visibly legitimate and locally reviewed sets you apart and wins the call.",
  },
  { h2: "Not all locksmith work is emergencies" },
  {
    p: "Beyond lockouts, there's steady non-emergency demand: rekeys after a move or breakup, new locks and smart locks, business master-key systems, and lost-key replacements. People ask about these in local groups too ('just moved in, need my locks rekeyed — recommendations?'). These leads are less frantic, higher-value, and easier to schedule — a great complement to emergency calls. See [leads for service businesses](/en/guides/leads-for-service-businesses).",
  },
  { h2: "Catch every lockout post the second it's posted" },
  {
    p: `A 'locked out, need a locksmith NOW' post in a local group is a hot lead — but it's answered in minutes and gone. You can't watch every group all day. ${SITE.brand} scans local Facebook groups 24/7, filters for locksmith requests in your area, and pushes them to your WhatsApp instantly — so you're the first to reply 'on my way' while competitors are still scrolling. See locksmith lead pages for your city on the [locksmith leads hub](/en/leads/locksmith).`,
  },
];

const FAQ = [
  {
    q: "How do locksmiths get more leads?",
    a: "Win on speed and trust: optimize your Google Business Profile with strong reviews, answer instantly (the first responder usually wins a lockout), and monitor local Facebook groups for 'need a locksmith' posts. Referrals from property managers and realtors add a steady, exclusive stream.",
  },
  {
    q: "Why are locksmith leads so expensive to buy?",
    a: "Because the work is urgent and high-intent, paid locksmith leads and pay-per-call are among the priciest in home services — and often shared. That's why organic, high-intent sources like local groups and referrals, answered fast, deliver better cost per job.",
  },
  {
    q: "What's the most important factor in winning locksmith jobs?",
    a: "Response speed. A locked-out customer hires whoever answers first with a quick ETA. Being fast and reachable beats any amount of marketing polish, which is why real-time lead delivery matters so much for locksmiths.",
  },
];

export default function Page() {
  return (
    <GuideLayoutEn
      slug={SLUG}
      blocks={BLOCKS}
      faq={FAQ}
      related={["mover-leads", "speed-to-lead", "leads-for-service-businesses"]}
    />
  );
}
