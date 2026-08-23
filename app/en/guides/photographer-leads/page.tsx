import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "photographer-leads";
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
  { h2: "Booked on your portfolio and your vibe" },
  {
    p: "Photography is chosen emotionally: a client looks at your work, imagines their wedding, family, or brand in that style, and books the photographer whose portfolio they love and who feels easy to work with. That means your images and your responsiveness matter more than any ad. Here's how photographers turn more inquiries into booked shoots.",
  },
  { h2: "Let the work sell — and make it easy to book" },
  {
    ul: [
      "**A tight, style-consistent portfolio** in your niche (weddings, portraits, events, products) — quality over quantity.",
      "**Reviews and testimonials** — reassure clients booking an irreplaceable moment.",
      "**A fast, warm reply and simple booking** — inquiries go cold quickly, and dates are exclusive.",
    ],
  },
  { h2: "Speed matters — dates are exclusive" },
  {
    p: "Unlike most services, a photographer can only book one wedding per date. Couples and clients inquire with several photographers, and the one who replies quickly and warmly — before the date is taken elsewhere — often wins. See [speed to lead](/en/guides/speed-to-lead) and [the first message to a lead](/en/guides/first-message-to-lead).",
  },
  { h2: "Where people ask for a photographer" },
  {
    ul: [
      "**Local Facebook groups** — 'looking for a wedding photographer in [city]', 'recommend a family photographer', 'need product photos for my shop'. Warm, local, high-intent. See [Facebook group leads](/en/guides/facebook-group-leads).",
      "**Google Business Profile & reviews** — 'photographer near me'. See [the GBP guide](/en/guides/google-business-profile).",
      "**Referrals & vendors** — venues, planners, and past clients are a steady source for event work.",
    ],
  },
  { h2: "Catch every 'need a photographer' post automatically" },
  {
    p: `Requests for photographers fill local and community groups constantly — and popular dates get claimed fast. ${SITE.brand} scans local Facebook groups 24/7, filters for photography requests in your area and niche, and sends them to your WhatsApp instantly — so you can reply first with your portfolio before the date's booked. See photography lead pages for your city on the [photographer leads hub](/en/leads/photographer).`,
  },
];

const FAQ = [
  {
    q: "How do photographers get more clients?",
    a: "Show a tight, niche portfolio and strong reviews, respond fast and warmly, and make booking easy. Local Facebook groups (people ask for photographers constantly), a strong Google Business Profile, and vendor/venue referrals are the best high-intent sources.",
  },
  {
    q: "Why is fast response so important for photographers?",
    a: "Because dates are exclusive — you can only shoot one wedding or event per slot. Clients inquire with several photographers, so replying first and warmly, before the date is booked elsewhere, is often what wins the client.",
  },
  {
    q: "Where do photographers find leads?",
    a: "Local and community Facebook groups where people ask for wedding, family, event, and product photographers, plus a strong Google Business Profile and referrals from venues, planners, and past clients.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["marketing-for-content-creators", "first-message-to-lead", "leads-for-service-businesses"]} />;
}
