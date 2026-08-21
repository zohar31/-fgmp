// English lead-terminology glossary (US market) for /en/guides/glossary.
// Single source of truth: rendered on the page AND used for the DefinedTermSet
// schema (GEO/AI-SEO). Each term is a short, self-contained definition an AI
// engine can cite as-is. `guide` points to the matching English guide slug.

export type TermEn = {
  term: string;
  aka?: string[];
  def: string;
  anchor: string;
  guide?: string;
};

export const glossaryEn: TermEn[] = [
  {
    term: "Lead",
    aka: ["sales lead"],
    def: "A potential customer who has shown interest in your product or service. An organic lead from a Facebook group is a public post from someone asking for a service — for example, \"looking for a plumber in Austin.\"",
    anchor: "lead",
    guide: "what-is-a-lead",
  },
  {
    term: "Hot lead",
    def: "A lead whose request is fresh and active (posted in the last minutes or hours). Its close rate is far higher than a cold lead's because the person is still actively looking to buy now.",
    anchor: "hot-lead",
    guide: "hot-vs-cold-leads",
  },
  {
    term: "Cold lead",
    def: "A lead who showed interest in the past but isn't ready to buy right now, or whose request is old. It needs nurturing and follow-up over time before it will close.",
    anchor: "cold-lead",
    guide: "follow-up-cold-leads",
  },
  {
    term: "Organic lead",
    def: "A lead that comes without paying for advertising — for example, from a public Facebook group post. Its cost per lead is far lower than a paid lead's.",
    anchor: "organic-lead",
    guide: "organic-vs-paid-leads",
  },
  {
    term: "Paid lead",
    def: "A lead acquired through paid advertising (Facebook Lead Ads, Google Ads). The cost per lead is higher and the quality varies.",
    anchor: "paid-lead",
    guide: "organic-vs-paid-leads",
  },
  {
    term: "Cost per lead (CPL)",
    aka: ["CPL"],
    def: "Total spend on a channel divided by the number of leads it produced. It includes media budget, management fees, and tools — not just the ad cost.",
    anchor: "cpl",
    guide: "cost-per-lead",
  },
  {
    term: "Cost per acquisition (CPA)",
    aka: ["CPA"],
    def: "The cost of each actual paying customer — cost per lead divided by close rate. This, not the price of a single lead, is the right metric for comparing lead channels.",
    anchor: "cpa",
    guide: "cost-per-lead",
  },
  {
    term: "Conversion rate",
    def: "The percentage of leads that took a desired action (reply, meeting, sale). A core measure of lead quality and how effective your sales process is.",
    anchor: "conversion-rate",
    guide: "lead-kpis",
  },
  {
    term: "Close rate",
    def: "The percentage of leads that became paying customers. A 20% close rate means one deal closes for every five leads.",
    anchor: "close-rate",
    guide: "lead-kpis",
  },
  {
    term: "Speed to lead",
    def: "The time between receiving a lead and making first contact. Responding within 5 minutes dramatically raises the odds of closing — the first to respond usually wins.",
    anchor: "speed-to-lead",
    guide: "speed-to-lead",
  },
  {
    term: "Lead funnel",
    aka: ["sales funnel"],
    def: "The customer's journey from first contact to paying customer, in stages: awareness → interest → decision → action. Leads leak between stages when there's no follow-up.",
    anchor: "lead-funnel",
    guide: "lead-funnel",
  },
  {
    term: "Exclusive lead",
    def: "A lead sold to only one business. It costs more than a shared lead but closes at a far higher rate because there's no immediate competition for the same request.",
    anchor: "exclusive-lead",
    guide: "exclusive-vs-shared-leads",
  },
  {
    term: "Shared lead",
    def: "The same request sold to several businesses at once (usually 3–5). Cheaper, but the customer is flooded with calls and the close rate drops.",
    anchor: "shared-lead",
    guide: "exclusive-vs-shared-leads",
  },
  {
    term: "Qualified lead (MQL)",
    aka: ["MQL"],
    def: "A lead that's been filtered and identified as a real potential buyer — based on budget, need, decision authority, and timing.",
    anchor: "mql",
    guide: "filter-facebook-leads",
  },
  {
    term: "Lead nurturing",
    def: "The process of building a relationship with a lead who isn't ready to buy yet — through follow-up, content, and contact over time — until they're ready to close.",
    anchor: "lead-nurturing",
    guide: "follow-up-cold-leads",
  },
  {
    term: "ROI",
    aka: ["return on investment"],
    def: "The ratio of profit from a marketing activity to its cost. Formula: (profit − cost) ÷ cost × 100. The master metric for a lead channel's profitability.",
    anchor: "roi",
    guide: "cost-per-lead",
  },
  {
    term: "Purchase intent",
    aka: ["buying intent"],
    def: "How ready a person is to buy. A post like \"need an electrician ASAP\" signals very high purchase intent versus \"thinking about a remodel someday.\"",
    anchor: "purchase-intent",
    guide: "hot-vs-cold-leads",
  },
  {
    term: "Junk lead",
    def: "A worthless inquiry — wrong number, someone who doesn't remember leaving details, spam, or a contest entrant. Especially common with paid leads.",
    anchor: "junk-lead",
    guide: "filter-facebook-leads",
  },
  {
    term: "Landing page",
    def: "A dedicated page a visitor reaches from an ad or search, built for a single goal — usually to capture contact details or an inquiry.",
    anchor: "landing-page",
  },
  {
    term: "Lead magnet",
    def: "A free value offer (guide, calculator, consultation) designed to get a visitor to leave their details, turning them into a lead.",
    anchor: "lead-magnet",
    guide: "free-leads",
  },
  {
    term: "CRM",
    aka: ["customer relationship management"],
    def: "A system for managing leads and customers — tracking every inquiry, status, and reminder. Keeps leads from falling through the cracks.",
    anchor: "crm",
    guide: "lead-management-system",
  },
  {
    term: "Lead automation",
    def: "Automating steps in the lead process — capture, alert, first response, and follow-up — so no inquiry is lost to overload or forgetfulness.",
    anchor: "lead-automation",
    guide: "lead-automation",
  },
  {
    term: "Facebook Lead Ads",
    def: "A Facebook ad format that collects customer details inside the platform with one tap. Convenient for the user, but it can produce lower-quality leads.",
    anchor: "lead-ads",
    guide: "facebook-lead-ads-vs-groups",
  },
  {
    term: "Facebook group leads",
    def: "Organic leads based on public group posts — people asking for a recommendation or service. A warm inquiry with high purchase intent and low cost.",
    anchor: "group-leads",
    guide: "facebook-group-leads",
  },
];
