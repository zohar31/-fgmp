// English guide index for the US market (/en/guides). Separate from the
// Hebrew `guides` — English content targets US keywords, not translations.

export type GuideEn = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: string;
  readTime: number;
  publishedAt: string;
  updatedAt: string;
  keywords: string[];
};

export const guidesEn: GuideEn[] = [
  {
    slug: "facebook-group-leads",
    title: "How to Get Leads from Facebook Groups in 2026 — The Complete Guide",
    description:
      "The full playbook for getting hot leads from Facebook groups: why it works, how to filter the noise, what tools to use, what it costs, and how automation changes the game for local service businesses.",
    excerpt:
      "Every day, thousands of people post in Facebook groups asking for a service like yours. Here's how to turn that into a daily stream of hot leads — without scrolling groups all day.",
    category: "Lead Guides",
    readTime: 11,
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-20",
    keywords: [
      "facebook group leads",
      "how to get leads from facebook groups",
      "facebook leads for business",
      "local business leads facebook",
      "free leads facebook groups",
    ],
  },
  {
    slug: "what-is-a-lead",
    title: "What Is a Lead? A Simple Guide for Small Business Owners",
    description:
      "What a lead actually is, the difference between hot and cold leads, organic vs. paid, where leads come from, and how to turn a first inquiry into a paying customer. Plain-English basics.",
    excerpt:
      "Everyone talks about \"leads\" — but what is one, really? Here's the clearest explanation for small business owners: lead types, where they come from, and how not to lose them.",
    category: "Lead Basics",
    readTime: 8,
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-20",
    keywords: ["what is a lead", "lead definition", "types of leads", "sales lead meaning", "what is a lead in business"],
  },
  {
    slug: "hot-vs-cold-leads",
    title: "Hot vs. Cold Leads — How to Tell Them Apart (and Why It Matters)",
    description:
      "The difference between a hot lead and a cold lead, how to spot each, and why treating them the same burns deals. A practical guide to reading buying intent for small businesses.",
    excerpt:
      "Not every lead is worth the same. A hot lead wants to buy now; a cold lead is still browsing. Treat them the same and you lose both. Here's how to tell them apart.",
    category: "Lead Basics",
    readTime: 7,
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-20",
    keywords: ["hot vs cold leads", "hot leads", "cold leads", "buying intent", "lead quality"],
  },
  {
    slug: "speed-to-lead",
    title: "Speed to Lead — Why the First 5 Minutes Are Worth More Than Everything Else",
    description:
      "Studies show close rates drop up to 8x after 5 minutes. Here's why response time is the single biggest factor in closing a lead — and how a small business answers first, automatically.",
    excerpt:
      "Whoever answers first wins. Not the cheapest, not the best — the fastest. Here's the data on speed to lead, and why it's the one thing you fully control.",
    category: "Converting Leads",
    readTime: 6,
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-20",
    keywords: ["speed to lead", "lead response time", "how fast to respond to leads", "first 5 minutes leads", "fast lead follow up"],
  },
  {
    slug: "organic-vs-paid-leads",
    title: "Organic vs. Paid Leads — What Actually Pays Off for a Small Business",
    description:
      "A full comparison of organic and paid leads: cost, quality, close rate, and setup time. Real 2026 numbers and why many small businesses shift toward organic — or a smart mix.",
    excerpt:
      "A paid lead costs $8–40. An organic lead costs almost nothing — but takes a method. Here's the full comparison: when each channel wins, and what really returns ROI.",
    category: "Lead Economics",
    readTime: 9,
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-20",
    keywords: ["organic vs paid leads", "organic leads", "paid leads", "cost per lead", "lead roi"],
  },
  {
    slug: "cost-per-lead",
    title: "How Much Does a Lead Cost in 2026? Cost Per Lead by Industry",
    description:
      "What a lead really costs in the US: cost per lead by channel and trade, the hidden cost of low-quality leads, and why cost per acquisition — not cost per lead — is the number that matters.",
    excerpt:
      "A good lead costs money — but without a comparison you might pay $50 for a lead you could get for $3. Here's what leads actually cost, by channel and trade.",
    category: "Lead Economics",
    readTime: 8,
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-20",
    keywords: ["cost per lead", "how much does a lead cost", "cost per lead by industry", "lead prices", "cpl 2026"],
  },
];

export function getGuideEn(slug: string): GuideEn | undefined {
  return guidesEn.find((g) => g.slug === slug);
}
