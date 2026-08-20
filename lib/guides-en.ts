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
    slug: "lead-generation",
    title: "Lead Generation for Small Business — The Complete 2026 Guide",
    description:
      "A complete, practical guide to lead generation for small businesses: what a lead is, the 10 best lead sources, what leads cost, and how to build a steady, predictable stream of customers.",
    excerpt:
      "Every business runs on a stream of customers — but most rely on luck and word of mouth. Here's the complete guide to lead generation: the sources, the costs, and the method to build a steady flow.",
    category: "Lead Generation",
    readTime: 12,
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-20",
    keywords: ["lead generation", "lead generation for small business", "how to generate leads", "lead sources", "small business leads"],
  },
  {
    slug: "how-to-get-more-customers",
    title: "How to Get More Customers for a Small Business (Without a Big Budget)",
    description:
      "Practical, low-cost ways to get more customers for a small business: the fastest channels, how to respond first, referrals, Google Business Profile, and Facebook groups. No big ad budget required.",
    excerpt:
      "More customers isn't about a bigger budget — it's about the right channels and speed. Here are the most effective, low-cost ways to get more customers for a small business.",
    category: "Lead Generation",
    readTime: 9,
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-20",
    keywords: ["how to get more customers", "get more customers small business", "how to get customers", "attract customers", "grow small business"],
  },
  {
    slug: "buying-leads",
    title: "Buying Leads — Is It Worth It? Lead Companies, Costs & Pitfalls",
    description:
      "A straight look at buying leads: how lead companies price leads (per-lead, shared vs. exclusive), the common pitfalls, the real math on cost per customer, and a cheaper alternative that converts better.",
    excerpt:
      "Buying leads sounds like a shortcut — until you find they're shared with 5 competitors, cold, and don't close. Here's the truth about buying leads, and what works instead.",
    category: "Buying Leads",
    readTime: 9,
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-20",
    keywords: ["buying leads", "lead company", "should i buy leads", "exclusive vs shared leads", "lead generation companies"],
  },
  {
    slug: "facebook-lead-ads-vs-groups",
    title: "Facebook Lead Ads vs. Group Leads — Which Pays Off?",
    description:
      "A comparison of Facebook Lead Ads and organic leads from groups: cost, quality, buying intent, and close rate. Why a group lead is often warmer — and when ads still make sense.",
    excerpt:
      "Lead Ads bring volume — at a cost, with variable quality. A group lead comes from someone who typed the request themselves. Here's the full comparison.",
    category: "Lead Economics",
    readTime: 8,
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-20",
    keywords: ["facebook lead ads", "lead ads vs groups", "facebook ads for leads", "organic facebook leads", "facebook lead generation"],
  },
  {
    slug: "google-business-profile",
    title: "Google Business Profile — The Complete Local SEO Guide for 2026",
    description:
      "How to set up and optimize your Google Business Profile to rank in the Google Maps 3-pack: verification, categories, photos, reviews, and posts. Essential for any local business.",
    excerpt:
      "Most local customers search Google Maps — and your Business Profile decides if they see you. Here's the complete guide to ranking in the local 3-pack.",
    category: "Local Marketing",
    readTime: 9,
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-20",
    keywords: ["google business profile", "google my business", "local seo", "google maps ranking", "gbp optimization"],
  },
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
  {
    slug: "lead-automation",
    title: "Lead Automation — How to Put Lead Generation on Autopilot in 2026",
    description:
      "What lead automation is, which parts of the lead process you can automate (capture, routing, response, follow-up), the tools that do it, and how a small business gets hot leads without lifting a finger.",
    excerpt:
      "The best lead source is the one that runs while you work. Here's what lead automation actually means, which steps you can automate today, and how to stop trading hours for leads.",
    category: "Automation",
    readTime: 9,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["lead automation", "automate lead generation", "automated leads", "lead generation automation", "lead capture automation"],
  },
  {
    slug: "exclusive-vs-shared-leads",
    title: "Exclusive vs. Shared Leads — Which Is Worth Paying For?",
    description:
      "The real difference between exclusive and shared leads: how lead companies sell the same lead to 3–5 businesses, what it does to your close rate, the true cost math, and when exclusive is worth the premium.",
    excerpt:
      "A shared lead is sold to you and four competitors — so you're racing on price and speed before you even say hello. Here's the honest comparison of exclusive vs. shared leads.",
    category: "Buying Leads",
    readTime: 8,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["exclusive vs shared leads", "exclusive leads", "shared leads", "are shared leads worth it", "exclusive lead generation"],
  },
  {
    slug: "real-time-leads",
    title: "Real-Time Leads — Why Fresh Leads Close and Aged Leads Don't",
    description:
      "What a real-time lead is, why lead freshness is one of the biggest drivers of close rate, how aged and recycled leads waste your money, and how to get leads the moment intent appears.",
    excerpt:
      "A lead is worth the most in the first few minutes and almost nothing a week later. Here's why real-time leads close, what \"aged leads\" really are, and how to always be first.",
    category: "Lead Guides",
    readTime: 7,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["real time leads", "real-time leads", "fresh leads", "aged leads", "live leads"],
  },
  {
    slug: "quality-leads",
    title: "What Makes a Quality Lead — And How to Get More of Them",
    description:
      "How to tell a quality lead from a junk one: the signals of real buying intent, why 10 good leads beat 100 bad ones, how to score leads, and where the highest-quality leads actually come from.",
    excerpt:
      "\"More leads\" is the wrong goal — better leads is the right one. Here's how to recognize a quality lead, why it matters more than volume, and how to get more of them.",
    category: "Lead Basics",
    readTime: 8,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["quality leads", "high quality leads", "qualified leads", "lead quality", "how to get quality leads"],
  },
  {
    slug: "first-message-to-lead",
    title: "The First Message to a New Lead — Templates That Get a Reply",
    description:
      "What to say in your very first message to a lead: the structure that gets a reply, mistakes that kill the conversation, and copy-paste WhatsApp/text templates for service businesses.",
    excerpt:
      "The first message decides whether a lead replies or ghosts you. Here's the structure that works, the mistakes to avoid, and templates you can copy today.",
    category: "Converting Leads",
    readTime: 7,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["first message to a lead", "how to message a lead", "lead follow up message", "what to say to a lead", "lead response template"],
  },
  {
    slug: "follow-up-cold-leads",
    title: "How to Follow Up With Cold Leads (Without Being Annoying)",
    description:
      "A practical follow-up system for cold leads: how many times to follow up, the right cadence, what to say each time, and how to revive old leads that went quiet — without feeling pushy.",
    excerpt:
      "Most deals are lost in the follow-up, not the pitch. Here's a simple, non-annoying system for following up with cold leads and reviving the ones that went silent.",
    category: "Converting Leads",
    readTime: 8,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["follow up with leads", "cold lead follow up", "how to follow up with leads", "lead nurturing", "reviving old leads"],
  },
  {
    slug: "sales-call-script",
    title: "The Sales Call Script That Books the Job (For Service Businesses)",
    description:
      "A simple, proven sales call script for service businesses: how to open, qualify, present the price, and close — with the exact lines to use and the mistakes that lose the job on the phone.",
    excerpt:
      "You don't need to be a smooth talker to close on the phone — you need a structure. Here's a simple sales call script that books the job, line by line.",
    category: "Converting Leads",
    readTime: 9,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["sales call script", "phone sales script", "how to close on the phone", "service business sales script", "sales script for small business"],
  },
  {
    slug: "price-objection",
    title: "How to Handle 'You're Too Expensive' — Beating the Price Objection",
    description:
      "Why customers say you're too expensive, what they usually mean, and exactly how to respond without dropping your price. Real scripts to handle the price objection and win the job on value.",
    excerpt:
      "\"That's more than I expected.\" It isn't always about money — and caving on price is the worst response. Here's how to handle the price objection and still close.",
    category: "Converting Leads",
    readTime: 8,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["price objection", "you're too expensive", "handle price objection", "overcoming price objections", "customer says too expensive"],
  },
  {
    slug: "lead-funnel",
    title: "The Lead Funnel Explained — From First Contact to Paying Customer",
    description:
      "What a lead funnel is, the stages every customer moves through (awareness → interest → decision → action), where leads leak out, and how a small service business plugs the holes.",
    excerpt:
      "Most businesses lose customers not because of bad leads, but a leaky funnel. Here's the lead funnel in plain English — the stages, the leaks, and how to fix them.",
    category: "Lead Basics",
    readTime: 8,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["lead funnel", "sales funnel", "lead funnel stages", "sales funnel for small business", "how a sales funnel works"],
  },
  {
    slug: "b2b-leads",
    title: "B2B Lead Generation in 2026 — A Practical Guide for Small Companies",
    description:
      "How B2B lead generation actually works for small companies: the best channels, why buying intent matters more than volume, outreach vs. inbound, and low-cost ways to fill your pipeline.",
    excerpt:
      "B2B lead gen doesn't need a huge sales team or ad budget. Here's a practical guide for small companies: the channels that work, and how to find businesses actively looking.",
    category: "Lead Generation",
    readTime: 9,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["b2b lead generation", "b2b leads", "how to generate b2b leads", "b2b lead gen", "business to business leads"],
  },
  {
    slug: "google-vs-facebook-leads",
    title: "Google vs. Facebook Leads — Which Channel Wins for Local Business?",
    description:
      "A head-to-head comparison of Google and Facebook for local leads: buying intent, cost per lead, speed, and close rate. When search wins, when social wins, and why most businesses need both.",
    excerpt:
      "Google catches people searching; Facebook catches people scrolling. Both produce leads — but very different ones. Here's the honest comparison for a local business.",
    category: "Lead Economics",
    readTime: 9,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["google vs facebook leads", "google ads vs facebook ads", "best channel for local leads", "facebook vs google for business", "where to get local leads"],
  },
  {
    slug: "filter-facebook-leads",
    title: "How to Filter Facebook Group Leads — Cut the Noise, Keep the Buyers",
    description:
      "Facebook groups are full of noise — spam, other businesses, tire-kickers. Here's how to filter group posts down to real buyers: keywords, negative keywords, intent signals, and AI filtering.",
    excerpt:
      "The problem with Facebook groups isn't too few leads — it's too much noise. Here's how to filter group posts down to the people actually ready to buy.",
    category: "Lead Guides",
    readTime: 8,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["filter facebook leads", "facebook group leads filter", "find buyers in facebook groups", "facebook lead keywords", "qualify facebook group leads"],
  },
];

export function getGuideEn(slug: string): GuideEn | undefined {
  return guidesEn.find((g) => g.slug === slug);
}
