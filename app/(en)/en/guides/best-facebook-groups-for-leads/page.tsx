import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "best-facebook-groups-for-leads";
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
  { h2: "Not all groups are worth your time" },
  {
    p: "Facebook has millions of groups, but only some produce leads. The best ones share three traits: they're **local** (people near you who can hire you), **active** (posts every day, not a ghost town), and **allow recommendations** (members ask for and share service referrals). Find groups with all three and you've found a steady lead source.",
  },
  { h2: "The group types that produce leads" },
  {
    ol: [
      "**Local recommendation groups.** Names like '[City] Recommendations' or '[Area] Ask & Recommend.' Members post 'who do you recommend for...' all day — pure buying intent.",
      "**Neighborhood & community groups.** '[Neighborhood] Community' or '[Town] Residents.' High trust and very local; great for home services.",
      "**Local buy/sell/trade groups.** People here are used to transacting locally and often ask for services too.",
      "**Niche & hobby groups.** For specialized trades — e.g. a wedding group for photographers, a homeowners group for renovators. Fewer posts, but highly targeted.",
      "**Local business & networking groups.** Best for B2B. See [B2B lead generation](/en/guides/b2b-leads).",
    ],
  },
  { h2: "How to find the right groups" },
  {
    ul: [
      "Search Facebook for your city or neighborhood plus words like 'recommendations', 'community', 'ask', 'buy sell'.",
      "Sort by relevance and check the member count and 'posts per day' — you want active, not just large.",
      "Prioritize groups where you see recent 'looking for...' or 'can anyone recommend...' posts. That's your signal.",
      "Join a handful in your service area rather than dozens everywhere. Depth beats breadth.",
    ],
  },
  { h2: "How to use them without getting banned" },
  {
    p: "Most groups ban overt self-promotion, so don't spam your services. Instead, be the helpful reply when someone asks for your trade: answer their question, offer to help, and move the conversation to a DM. Read each group's rules, contribute genuinely, and you'll build a reputation that generates referrals on top of direct leads. See [posting etiquette and filtering](/en/guides/filter-facebook-leads).",
  },
  { h2: "The catch — and the fix" },
  {
    p: `The best groups are active, which means the 'looking for a plumber' post you needed to see scrolled past while you were on a job. You can't sit in ten groups all day. ${SITE.brand} watches your groups 24/7, filters posts with AI, and sends the high-intent leads straight to your WhatsApp in real time — so you catch every request the moment it's posted, from every group at once. See [Facebook group leads](/en/guides/facebook-group-leads).`,
  },
];

const FAQ = [
  {
    q: "How many Facebook groups should I join?",
    a: "Focus on quality over quantity — a handful of active, local, recommendation-friendly groups in your service area beats dozens of random ones. If you use automation to monitor them, you can cover more groups without the manual overhead.",
  },
  {
    q: "Can I just post my services in these groups?",
    a: "Usually no — most groups ban self-promotion and will remove or ban you. The winning approach is to be the helpful reply when someone asks for your trade, then take it to a DM. That earns leads and referrals without breaking the rules.",
  },
  {
    q: "Which groups are best for home service businesses?",
    a: "Local recommendation groups and neighborhood community groups are the strongest for home services — plumbers, electricians, cleaners, movers, and contractors. That's where homeowners ask for referrals, and the intent is high.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["facebook-group-leads", "filter-facebook-leads", "lead-sources"]} />;
}
