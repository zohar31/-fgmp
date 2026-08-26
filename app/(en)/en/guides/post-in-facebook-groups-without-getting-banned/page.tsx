import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "post-in-facebook-groups-without-getting-banned";
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
  { h2: "Why groups ban businesses" },
  {
    p: "Facebook groups exist for their members, not for your marketing. Admins ban self-promotion because it clutters the group and annoys everyone. So the fastest way to lose your access — and your leads — is to treat a group like a billboard. The good news: you can get plenty of business from groups without ever posting an ad, by being the helpful expert instead of the spammer.",
  },
  { h2: "The golden rule: help first, sell second" },
  {
    p: "The single move that works in almost every group: when someone asks for your service, be the useful reply. Answer their question, offer a genuine tip, and let them come to you. \"Happy to help — I do this, feel free to DM me\" is welcome; \"CALL ME FOR THE BEST PRICES 📞📞\" gets you removed. You're not hiding that you're a business; you're leading with value.",
  },
  { h2: "Read the rules of every group" },
  {
    ul: [
      "**Check the pinned rules before posting.** Many groups have a specific day or thread for promotion — use it.",
      "**Some groups ban all links.** Post helpfully and move the details to DM.",
      "**Respect 'no self-promo' groups.** In those, only reply when asked, and keep it low-key.",
      "**Don't post the same thing in 20 groups.** Facebook flags identical repeated posts as spam — that risks your account, not just the group.",
    ],
  },
  { h2: "What gets you banned" },
  {
    ul: [
      "Copy-pasting the same promo across many groups in a short time.",
      "Posting ads in groups that forbid promotion.",
      "Dropping links with no context or conversation.",
      "Aggressive DMing of people who didn't ask.",
      "Using multiple fake accounts to promote — a fast track to a full account ban.",
    ],
  },
  { h2: "Build a reputation, not just posts" },
  {
    p: "The businesses that win in groups are the ones members recognize as helpful. Answer questions in your expertise even when there's no immediate job, and when someone finally asks 'who do you recommend for X?', other members tag you. That earned reputation produces referrals on top of direct leads — and it's completely ban-proof because you're adding value, not extracting it.",
  },
  { h2: "Catch every request without living in the groups" },
  {
    p: `The safest, most scalable way to get group business isn't posting at all — it's responding fast when people ask. But you can't watch every group around the clock. ${SITE.brand} does it for you: it scans groups 24/7, filters for real requests matching your trade, and sends them to your WhatsApp so you can reply helpfully and first — no spamming, no ban risk. See [how to filter group leads](/en/guides/filter-facebook-leads).`,
  },
];

const FAQ = [
  {
    q: "Can I promote my business in Facebook groups at all?",
    a: "Yes, but carefully. Follow each group's rules, use designated promo threads where they exist, and lead with helpful replies rather than ads. The reply-when-asked approach gets business without triggering bans.",
  },
  {
    q: "Why did Facebook ban me for posting the same thing in many groups?",
    a: "Facebook's spam detection flags identical or near-identical posts sent to many groups in a short window. That can restrict or ban your whole account, not just remove the post. Vary your contributions and don't mass-post.",
  },
  {
    q: "Is it better to post or to reply in groups?",
    a: "Replying, in most cases. Answering people who are actively asking for your service is higher-intent, more welcome, and far less likely to get you banned than broadcasting promotional posts.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["best-facebook-groups-for-leads", "filter-facebook-leads", "facebook-group-leads"]} />;
}
