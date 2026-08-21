import type { Metadata } from "next";
import { GuideLayoutEn, type Block } from "@/components/GuideLayoutEn";
import { getGuideEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";

const SLUG = "whatsapp-vs-phone-leads";
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
  { h2: "Call or message? It's a real decision now" },
  {
    p: "A few years ago, following up on a lead meant picking up the phone. Today many customers would rather text than talk — and forcing a call can cost you the job. But the phone still wins in some situations. The smart move isn't picking one forever; it's knowing which to use when, and matching the channel the customer prefers.",
  },
  { h2: "Where WhatsApp and text win" },
  {
    ul: [
      "**Higher response rates** — many people ignore calls from unknown numbers but reply to a message.",
      "**Lower pressure** — customers can answer on their own time, which gets more of them to engage.",
      "**A written trail** — quotes, addresses, and details stay in the chat for both sides.",
      "**Speed** — you can fire off a personalized first message in seconds. See [message templates](/en/guides/message-templates-for-leads).",
    ],
  },
  { h2: "Where the phone still wins" },
  {
    ul: [
      "**Complex or high-value jobs** — talking through details builds trust faster than typing.",
      "**Urgent needs** — a burst pipe or lockout deserves an immediate call.",
      "**When a chat stalls** — a quick call can rescue a deal that's gone quiet over text.",
      "**Reading the customer** — tone of voice tells you things text can't.",
    ],
  },
  { h2: "The winning rule: match the customer" },
  {
    p: "The best channel is the one the customer chose. If they messaged you in a group or texted first, reply the same way — switching them to a call they didn't ask for adds friction. If they called, call back. When in doubt, open on the channel they used and offer the other: 'Happy to jump on a quick call if that's easier, or I can send everything here.'",
  },
  { h2: "Speed beats channel" },
  {
    p: "Whichever channel you choose, being fast matters more than being on the 'right' one. A quick text beats a slow call and vice versa — the first solid responder usually wins the job. See [speed to lead](/en/guides/speed-to-lead). Pick the channel that lets you respond fastest and feels natural to the customer.",
  },
  { h2: "Leads to WhatsApp, ready to reply" },
  {
    p: `${SITE.brand} delivers high-intent Facebook-group leads straight to your WhatsApp in real time, so you can open the conversation on the channel most customers now prefer — instantly, while the lead is hot. From there you can keep chatting or move to a call, whatever fits the job. See [how to manage leads in WhatsApp](/en/guides/manage-leads-in-whatsapp).`,
  },
];

const FAQ = [
  {
    q: "Should I call or text a new lead?",
    a: "Match the channel they used. If they messaged first, reply by message — it's lower pressure and gets higher response. Reserve calls for complex, high-value, or urgent jobs, or to rescue a chat that's gone quiet.",
  },
  {
    q: "Do text messages really get better responses than calls?",
    a: "For many leads, yes — people often ignore calls from unknown numbers but will reply to a message on their own time. That said, high-value or urgent situations still benefit from a call. Use the customer's preference as your guide.",
  },
  {
    q: "What matters more — the channel or the speed?",
    a: "Speed. The first solid responder usually wins the job, whether by call or text. Choose whichever channel lets you respond fastest and feels natural to the customer, and prioritize replying quickly over the 'perfect' medium.",
  },
];

export default function Page() {
  return <GuideLayoutEn slug={SLUG} blocks={BLOCKS} faq={FAQ} related={["speed-to-lead", "manage-leads-in-whatsapp", "first-message-to-lead"]} />;
}
