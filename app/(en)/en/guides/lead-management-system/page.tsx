import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "lead-management-system";
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
  { h2: "Leads die in the gaps" },
  {
    p: "Getting leads is only half the job — keeping track of them is the other half, and it's where most small businesses quietly lose money. A lead comes in, you mean to follow up, you get busy, and it's gone. Lead management is simply making sure that never happens: every lead is captured, followed up, and closed or clearly lost. It doesn't have to be complicated.",
  },
  { h2: "What to track for every lead" },
  {
    ul: [
      "**Who** — name and contact, and what they asked for.",
      "**Where from** — the source, so you can measure ROI. See [lead KPIs](/en/guides/lead-kpis).",
      "**Status** — new, contacted, quoted, won, or lost.",
      "**Next action and date** — the single most important field; without it, follow-up doesn't happen.",
    ],
  },
  { h2: "Do you actually need a CRM?" },
  {
    p: "Maybe not. A CRM is powerful once you have real volume, a team, or long sales cycles. But for a solo operator or small crew, a full CRM is often overkill that goes unused. A simple spreadsheet or a notes app with the fields above can manage dozens of leads perfectly well. The best system is the one you'll actually keep updated.",
  },
  { h2: "When a CRM earns its place" },
  {
    ul: [
      "You have more leads than you can track in your head or a sheet.",
      "A team needs to share and hand off leads.",
      "Your sales cycle is long and needs many touches over weeks.",
      "You want automated reminders and reporting.",
    ],
  },
  { h2: "The habit matters more than the tool" },
  {
    p: "A $0 spreadsheet used daily beats a $100/month CRM no one opens. Build two habits: log every new lead the moment it arrives, and never close your day with an un-actioned lead that has no next step scheduled. That discipline — not the software — is what stops leads from slipping away. See [following up](/en/guides/follow-up-cold-leads).",
  },
  { h2: "Start by never missing a lead" },
  {
    p: `Good lead management starts before the spreadsheet — with actually receiving every lead. If leads arrive scattered across groups, calls, and messages, some never get logged at all. ${SITE.brand} funnels high-intent Facebook-group leads into one place — your WhatsApp — in real time, so every lead lands somewhere you'll see it and can act on it. From there, a simple tracking habit does the rest.`,
  },
];

const FAQ = [
  {
    q: "Do I need a CRM for my small business?",
    a: "Often not at first. If you can track your leads in a simple spreadsheet and follow up reliably, that's enough. Consider a CRM when volume, a team, or long sales cycles make a manual system hard to keep up with.",
  },
  {
    q: "What's the most important thing to track for each lead?",
    a: "The next action and its date. Contact details and status matter, but the 'what happens next and when' field is what actually drives follow-up and prevents leads from being forgotten.",
  },
  {
    q: "How do I stop leads from falling through the cracks?",
    a: "Two habits: log every lead the instant it arrives, and never end a day with a lead that has no scheduled next step. Getting all your leads into one place first — like a single WhatsApp inbox — makes both habits far easier.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["lead-handling-mistakes", "follow-up-cold-leads", "lead-kpis"]} />;
}
