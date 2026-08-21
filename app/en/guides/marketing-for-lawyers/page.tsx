import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "marketing-for-lawyers";
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
  { h2: "Legal clients hire on trust" },
  {
    p: "Marketing for a law firm isn't like selling a product. People hiring a lawyer are often stressed, and they choose based on trust and reputation more than price or clever ads. That shapes everything: your best channels are the ones that build credibility and put you in front of people at the moment they need legal help. Here's what works for solo attorneys and small firms.",
  },
  { h2: "The channels that bring legal clients" },
  {
    ol: [
      "**Referrals** — from past clients and from other professionals (accountants, realtors, other attorneys). The highest-trust, highest-value source in law.",
      "**Google Business Profile and reviews** — most legal searches are local ('family lawyer near me'), and reviews are decisive. See [the GBP guide](/en/guides/google-business-profile).",
      "**Google Search** — high-intent, and worth it for legal keywords, though competitive and costly.",
      "**Local Facebook and community groups** — people quietly ask 'can anyone recommend a good lawyer for…' more often than you'd think. See [Facebook group leads](/en/guides/facebook-group-leads).",
    ],
  },
  { h2: "Build authority, not just ads" },
  {
    p: "In law, being seen as the knowledgeable, trustworthy expert does more than any promotion. Answer common legal questions helpfully — in content, in community groups, in reviews responses. When you're the attorney people already perceive as competent and approachable, referrals and inbound inquiries follow naturally.",
  },
  { h2: "Respond fast — even lawyers lose leads to delay" },
  {
    p: "A stressed potential client who reaches out will often contact several firms and retain the first responsive, reassuring one. Firms are notorious for slow intake — so simply responding quickly and warmly is a real edge. See [speed to lead](/en/guides/speed-to-lead) and [the first message to a lead](/en/guides/first-message-to-lead).",
  },
  { h2: "Keep it ethical and compliant" },
  {
    p: "Legal marketing has rules — bar association guidelines on advertising, solicitation, and testimonials vary by state. Stick to honest, non-misleading marketing, be careful with client testimonials, and avoid anything that looks like improper solicitation. Building genuine reputation and answering real requests keeps you well inside the lines.",
  },
  { h2: "Catch the requests you're missing" },
  {
    p: `Many 'looking for a lawyer' requests happen in local Facebook groups and scroll past unseen. ${SITE.brand} monitors those groups 24/7, filters for people asking about your practice area in your region, and sends the leads to your WhatsApp in real time — so you can respond first, discreetly, while the person is still looking. See [leads for service businesses](/en/guides/leads-for-service-businesses).`,
  },
];

const FAQ = [
  {
    q: "What's the best marketing channel for a small law firm?",
    a: "Referrals and reputation lead, supported by a strong Google Business Profile with reviews and local search presence. These build the trust legal clients hire on. Add high-intent channels like local groups and search to reach people at the moment of need.",
  },
  {
    q: "Is Facebook useful for getting legal clients?",
    a: "Yes — especially local and community groups where people ask for recommendations for family, real estate, immigration, or small-business matters. Responding helpfully and promptly (within bar advertising rules) can produce quality local clients.",
  },
  {
    q: "How do lawyers market without violating advertising rules?",
    a: "Keep marketing honest and non-misleading, be cautious with client testimonials, and avoid improper solicitation. Building genuine authority — answering questions, earning reviews, responding to real requests — is both effective and compliant. Check your state bar's specific rules.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["google-business-profile", "leads-for-service-businesses", "speed-to-lead"]} />;
}
