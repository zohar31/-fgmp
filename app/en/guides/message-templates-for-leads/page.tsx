import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "message-templates-for-leads";
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
  { h2: "Why templates win (when used right)" },
  {
    p: "Templates aren't about sounding canned — they're about being fast and consistent when it counts. A good template gives you a strong starting point you personalize in seconds, so you never stare at a blank screen while a hot lead cools off. The rule: **always swap in their name and their specific request.** A template with one personal detail beats a perfect message sent 20 minutes late.",
  },
  { h2: "First contact" },
  {
    p: "\"Hi [Name] — saw your post looking for [service] in [area]. I'm [Your Name] with [Business], we handle exactly this. Happy to help — quick question: [one qualifying question]? I'll get you a fast quote.\"",
  },
  {
    p: "Short, specific, human, ends with an easy question. See [the first message to a lead](/en/guides/first-message-to-lead) for the full breakdown.",
  },
  { h2: "Sending a quote" },
  {
    p: "\"Thanks [Name]! For [job as they described it], it's [$X], which includes [what's included]. I could start [day/time]. Want me to lock it in?\" — always tie the number to what's included and end with a clear next step.",
  },
  { h2: "Following up (no reply yet)" },
  {
    ul: [
      "**Day 1:** \"Hi [Name], just making sure you saw my note about [job] — happy to answer any questions.\"",
      "**Day 3–4:** \"Still glad to help with [job]. I've got an opening [day] if the timing works for you.\"",
      "**About a week:** \"Wrapping up my schedule for next week — want me to hold a spot for [job]?\"",
      "See the full cadence in [following up with cold leads](/en/guides/follow-up-cold-leads).",
    ],
  },
  { h2: "Handling silence gracefully" },
  {
    p: "\"No worries if the timing's off, [Name] — I'll leave it here. Reach out anytime and I'll take care of you.\" Removing pressure often gets a reply precisely because it's the opposite of nagging.",
  },
  { h2: "Reviving an old lead" },
  {
    p: "\"Hi [Name], circling back — are you still looking for [service]? Happy to help if the timing's better now.\" Costs you nothing, wins back a real percentage.",
  },
  { h2: "Make templates fast — but stay first" },
  {
    p: `Templates make you fast to reply; a real-time lead source makes sure you're first to reply. ${SITE.brand} sends high-intent Facebook-group leads to your WhatsApp the moment they appear — so you can fire off a personalized first-contact template while you're still the only one who answered. Speed plus a sharp template is a hard combination to beat.`,
  },
];

const FAQ = [
  {
    q: "Won't customers notice I'm using a template?",
    a: "Not if you personalize it. Always include their name and a specific detail from their request. Customers don't mind a polished, fast reply — they mind a slow, generic one. The template just helps you respond quickly and clearly.",
  },
  {
    q: "Text, WhatsApp, or email for these templates?",
    a: "Use whatever channel the lead used or offered. For service businesses, text and WhatsApp get far higher and faster reply rates than email. Match their channel and keep messages short.",
  },
  {
    q: "How many follow-up messages should I template out?",
    a: "Prepare about four: a day-one nudge, a day-three value-add, a one-week soft deadline, and a graceful close. Having them ready means you actually follow up instead of forgetting, which is where most deals are won.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["first-message-to-lead", "follow-up-cold-leads", "close-deal-over-text"]} />;
}
