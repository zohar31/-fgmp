import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "filter-facebook-leads";
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
  { h2: "The real problem isn't too few leads" },
  {
    p: "Facebook groups are overflowing with posts — but most of them aren't buyers. They're other businesses advertising, spam, general chatter, tire-kickers, and people asking questions with no intent to hire. If you try to read everything, you burn hours and miss the few posts that matter. The skill isn't finding more posts; it's **filtering down to the people ready to buy**.",
  },
  { h2: "Start with the right keywords" },
  {
    p: "Good positive keywords catch buying intent, not just your industry. 'Plumber' appears in a thousand irrelevant posts; 'need a plumber', 'looking for a plumber', 'plumber recommendation', and 'burst pipe' catch actual requests. Think in the exact phrases a customer types when they need you — not the words your industry uses internally.",
  },
  { h2: "Use negative keywords to kill the noise" },
  {
    ul: [
      "**Filter out other businesses:** 'hiring', 'now hiring', 'job opening', 'DM to promote', 'my services', 'available for work'.",
      "**Filter out non-buyers:** 'free', 'DIY', 'how do I', 'just wondering', 'for a school project'.",
      "**Filter out wrong intent:** words that signal they're selling, not buying, or asking a general question with no job attached.",
    ],
  },
  { h2: "Read the intent signals" },
  {
    p: "Beyond keywords, a few signals separate a buyer from noise: urgency ('this week', 'ASAP', 'today'), a specific problem ('leak under the sink'), location that matches your area, and a request for a person ('can anyone recommend...'). A post with several of these is a hot lead. See [hot vs. cold leads](/en/guides/hot-vs-cold-leads) and [quality leads](/en/guides/quality-leads).",
  },
  { h2: "Why manual filtering breaks down" },
  {
    p: "Even with perfect keywords, doing this by hand doesn't scale. You'd need to sit in dozens of groups, all day, reading every post the moment it's posted — and still you'd miss the 11pm request that a competitor answers first. Manual filtering trades your most valuable hours for a job software does better.",
  },
  { h2: "Let AI do the filtering" },
  {
    p: `This is exactly what ${SITE.brand} automates. It scans your groups continuously and runs every post through an AI filter that understands context — so it tells the difference between 'need a plumber today' and 'here's a plumbing tip' or someone advertising their own service. Only the genuine, high-intent leads reach your WhatsApp, in real time. You get the buyers without wading through the noise. See [lead automation](/en/guides/lead-automation).`,
  },
];

const FAQ = [
  {
    q: "What are negative keywords and why do they matter?",
    a: "Negative keywords are words that exclude a post even if it contains your positive keywords. They filter out job ads, spam, and non-buyers — for example, blocking 'hiring' so you don't get posts from businesses looking to recruit rather than customers looking to buy.",
  },
  {
    q: "Can't I just search groups manually?",
    a: "You can, but it doesn't scale and you'll miss leads. Posts scroll fast, you can't watch dozens of groups around the clock, and the best leads often appear at inconvenient hours. Manual works for one or two groups; automation is needed for real coverage.",
  },
  {
    q: "How does AI filtering beat keyword filtering alone?",
    a: "Keywords match text; AI understands meaning. AI reads the whole post in context and judges intent — so it keeps 'anyone know a good electrician?' and drops 'I'm an electrician, DM me', even though both contain the word 'electrician'.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["facebook-group-leads", "quality-leads", "lead-automation"]} />;
}
