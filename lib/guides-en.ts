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
  {
    slug: "message-templates-for-leads",
    title: "Message Templates for Leads — Text & WhatsApp Scripts That Get Replies",
    description:
      "Copy-paste text and WhatsApp templates for every stage of a lead: first contact, quoting, following up, handling silence, and closing. Ready-to-use scripts for service businesses.",
    excerpt:
      "Stop writing every message from scratch. Here are copy-paste text and WhatsApp templates for each stage of a lead — first contact, quote, follow-up, and close.",
    category: "Converting Leads",
    readTime: 8,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["lead message templates", "text templates for leads", "whatsapp templates business", "sales message templates", "follow up text templates"],
  },
  {
    slug: "close-deal-over-text",
    title: "How to Close a Deal Over Text & WhatsApp (Without Being Pushy)",
    description:
      "Closing over text and WhatsApp is different from the phone. Here's how to move a chat to a booked job: build trust fast, quote clearly, create urgency, and ask for the yes — with example messages.",
    excerpt:
      "More customers want to text than talk. Closing over WhatsApp or text is a skill of its own — here's how to turn a chat into a booked job without sounding pushy.",
    category: "Converting Leads",
    readTime: 8,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["close deal over text", "closing over whatsapp", "how to close a sale by text", "text message sales", "closing deals on whatsapp"],
  },
  {
    slug: "best-facebook-groups-for-leads",
    title: "Best Facebook Groups for Finding Leads (And How to Use Them)",
    description:
      "Which Facebook groups actually produce leads for a service business: local buy/sell/recommend groups, neighborhood groups, and niche groups — how to find them, join, and turn them into customers.",
    excerpt:
      "Not all Facebook groups are worth your time. Here are the types that actually produce leads for local businesses — and how to find and use them without getting banned.",
    category: "Lead Guides",
    readTime: 8,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["best facebook groups for leads", "facebook groups for business leads", "local facebook groups", "recommendation groups", "find leads facebook groups"],
  },
  {
    slug: "lead-sources",
    title: "The 10 Best Lead Sources for a Small Business in 2026",
    description:
      "A ranked rundown of the best lead sources for a small business — referrals, Google, Facebook groups, GBP, and more — with the cost, intent, and effort of each, so you know where to focus first.",
    excerpt:
      "There are a dozen places to get leads, but they're not equal. Here are the 10 best lead sources for a small business, ranked by cost, intent, and effort.",
    category: "Lead Generation",
    readTime: 10,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["lead sources", "best lead sources", "where to get leads", "lead generation sources", "small business lead sources"],
  },
  {
    slug: "how-many-leads-per-month",
    title: "How Many Leads Do You Need Per Month? (A Simple Formula)",
    description:
      "How to calculate exactly how many leads your business needs each month to hit your revenue goal — using your close rate, average job value, and target. A simple, no-nonsense formula with examples.",
    excerpt:
      "\"I need more leads\" — but how many? Here's the simple formula to work out exactly how many leads a month you need to hit your revenue goal, with worked examples.",
    category: "Lead Basics",
    readTime: 7,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["how many leads per month", "how many leads do i need", "leads needed to hit goal", "lead goal calculator", "leads per month formula"],
  },
  {
    slug: "first-customers-new-business",
    title: "How to Get Your First Customers for a New Business",
    description:
      "A practical playbook for landing your first customers with no reputation and no budget: where to start, how to use your network, free high-intent channels, and how to turn the first jobs into more.",
    excerpt:
      "The hardest customers to get are the first ones — no reviews, no reputation, no budget. Here's a practical playbook to land your first customers and build momentum.",
    category: "Lead Generation",
    readTime: 9,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["first customers new business", "how to get first customers", "getting first clients", "new business no customers", "first clients startup"],
  },
  {
    slug: "post-in-facebook-groups-without-getting-banned",
    title: "How to Post in Facebook Groups Without Getting Banned",
    description:
      "Facebook groups ban self-promotion fast. Here's how to get business from groups without getting removed: the rules that matter, the helpful-reply approach, and what gets you banned.",
    excerpt:
      "Spam a group and you're gone — and so are your leads. Here's how to get real business from Facebook groups without getting banned: the etiquette, the rules, and what to avoid.",
    category: "Lead Guides",
    readTime: 8,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["facebook group ban", "post in facebook groups without getting banned", "facebook group rules", "facebook group etiquette", "promote business facebook groups"],
  },
  {
    slug: "free-leads",
    title: "How to Get Free Leads for Your Business (No Ad Budget)",
    description:
      "A practical guide to getting leads for free: referrals, Google Business Profile, Facebook groups, and content. The exact free channels that work for a small business — and how to work them.",
    excerpt:
      "You don't need an ad budget to get customers. Here are the free lead channels that actually work for a small business — and how to turn them into a steady stream.",
    category: "Lead Generation",
    readTime: 9,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["free leads", "how to get free leads", "free lead generation", "get leads without paying", "free leads for business"],
  },
  {
    slug: "lead-generation-strategy",
    title: "How to Build a Lead Generation Strategy That Actually Works",
    description:
      "A step-by-step framework for building a lead generation strategy: set a goal, know your numbers, pick your channels, respond fast, and measure. Practical, no-fluff, for small businesses.",
    excerpt:
      "Random tactics produce random results. A real lead generation strategy is simpler than it sounds — here's a step-by-step framework any small business can follow.",
    category: "Lead Generation",
    readTime: 10,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["lead generation strategy", "lead gen strategy", "how to build a lead strategy", "lead generation plan", "b2b lead strategy"],
  },
  {
    slug: "price-quote-that-closes",
    title: "How to Write a Price Quote That Closes the Job",
    description:
      "Your quote is a sales tool, not a receipt. Here's how to write a price quote that wins the job: what to include, how to present the price, anchoring, and the follow-up that seals it.",
    excerpt:
      "A quote isn't just a number — it's your closing pitch in writing. Here's how to write a price quote that wins the job instead of getting ghosted.",
    category: "Converting Leads",
    readTime: 8,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["price quote that closes", "how to write a quote", "sales quote", "quote to win the job", "how to quote a job"],
  },
  {
    slug: "lead-handling-mistakes",
    title: "7 Lead-Handling Mistakes That Quietly Cost You Customers",
    description:
      "The most common mistakes businesses make with leads — slow response, no follow-up, weak first message, no qualifying — and exactly how to fix each one to close more of the leads you already get.",
    excerpt:
      "You don't always need more leads — you need to stop losing the ones you have. Here are the 7 most common lead-handling mistakes, and how to fix each.",
    category: "Converting Leads",
    readTime: 8,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["lead handling mistakes", "why am i losing leads", "lead follow up mistakes", "not closing leads", "lead conversion mistakes"],
  },
  {
    slug: "marketing-for-contractors",
    title: "Marketing for Contractors — How to Get More Jobs in 2026",
    description:
      "A practical marketing guide for contractors: the best lead sources for construction and home services, how to get found locally, why speed wins jobs, and low-cost ways to fill your schedule.",
    excerpt:
      "Contractors don't need fancy marketing — they need a full schedule. Here are the lead sources and tactics that actually get contractors more jobs, without a big ad budget.",
    category: "Industry Guides",
    readTime: 9,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["marketing for contractors", "contractor leads", "how to get construction leads", "contractor marketing", "get more contracting jobs"],
  },
  {
    slug: "lead-generation-system",
    title: "What Is a Lead Generation System — And How to Choose One",
    description:
      "What a lead generation system is, the parts it should have (capture, filter, deliver, respond), the types available, and how a small business picks one that produces customers, not busywork.",
    excerpt:
      "A lead generation system turns 'hoping the phone rings' into a predictable flow of customers. Here's what one actually is, and how to choose the right one for your business.",
    category: "Lead Generation",
    readTime: 9,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["lead generation system", "lead gen system", "best lead generation system", "how to choose a lead system", "automated lead system"],
  },
  {
    slug: "lead-generation-companies",
    title: "Lead Generation Companies — How to Choose One (or Skip It)",
    description:
      "How lead generation companies work, what they charge, the difference between shared and exclusive leads, the red flags to watch for, and when a flat-rate real-time source beats buying leads.",
    excerpt:
      "Lead generation companies promise a shortcut to customers — but the fine print matters. Here's how they work, what to watch for, and when a different model wins.",
    category: "Buying Leads",
    readTime: 9,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["lead generation companies", "lead company", "best lead generation companies", "lead gen company", "should i use a lead company"],
  },
  {
    slug: "lead-kpis",
    title: "Lead Generation KPIs — The Metrics That Actually Matter",
    description:
      "The lead generation metrics worth tracking: cost per lead, cost per acquisition, close rate, response time, and lead-to-customer rate — what each tells you and how to use them to grow.",
    excerpt:
      "You can't improve what you don't measure — but most businesses track the wrong numbers. Here are the lead generation KPIs that actually matter, and how to use them.",
    category: "Lead Basics",
    readTime: 8,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["lead generation kpis", "lead metrics", "lead generation metrics", "lead conversion rate", "cost per acquisition"],
  },
  {
    slug: "lead-management-system",
    title: "Lead Management — Do You Really Need a CRM?",
    description:
      "What lead management means, when a simple system beats a full CRM, what to track for every lead, and how to make sure no lead ever falls through the cracks — without drowning in software.",
    excerpt:
      "Leads slip through the cracks when there's no system to catch them. Here's how to manage leads properly — and whether you actually need a CRM or something simpler.",
    category: "Converting Leads",
    readTime: 8,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["lead management", "lead management system", "do i need a crm", "how to manage leads", "lead tracking"],
  },
  {
    slug: "leads-for-service-businesses",
    title: "Leads for Service Businesses — The Complete 2026 Playbook",
    description:
      "A practical lead-generation playbook for service businesses: the best channels for local services, why speed and reviews win, what leads cost, and how to build a steady flow of booked jobs.",
    excerpt:
      "Service businesses live and die by a full schedule. Here's the complete playbook for getting leads for a local service business — the channels, the costs, and the method.",
    category: "Lead Generation",
    readTime: 10,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["leads for service businesses", "service business leads", "local service leads", "home service leads", "how to get service business leads"],
  },
  {
    slug: "why-buying-leads-fails",
    title: "Why Buying Leads Fails — And What to Do Instead",
    description:
      "The real reasons bought leads disappoint: shared contacts, cold timing, low intent, and rising costs. A clear look at why buying leads fails for most small businesses — and the alternative that works.",
    excerpt:
      "Buying leads feels like buying customers — until you meet the reality: shared, cold, and expensive. Here's why buying leads fails, and what actually works instead.",
    category: "Buying Leads",
    readTime: 8,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["why buying leads fails", "are bought leads worth it", "problems with buying leads", "buying leads doesn't work", "stop buying leads"],
  },
  {
    slug: "manage-leads-in-whatsapp",
    title: "How to Manage Leads in WhatsApp (Without Losing Track)",
    description:
      "WhatsApp is where a lot of leads live now. Here's how to manage them: labels, quick replies, keeping every lead organized, and making sure none go cold — using WhatsApp Business tools.",
    excerpt:
      "If your leads come through WhatsApp, chaos is one busy day away. Here's how to manage leads in WhatsApp so none slip through — using labels, quick replies, and simple habits.",
    category: "Converting Leads",
    readTime: 8,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["manage leads in whatsapp", "whatsapp lead management", "organize whatsapp leads", "whatsapp business labels", "whatsapp for sales"],
  },
  {
    slug: "whatsapp-business-setup",
    title: "WhatsApp Business Setup — A Simple Guide for Getting Leads",
    description:
      "How to set up WhatsApp Business the right way to win more customers: profile, catalog, quick replies, greeting and away messages, labels, and the settings that make you look professional.",
    excerpt:
      "WhatsApp Business is free and built for exactly this. Here's how to set it up properly so you respond faster, look professional, and turn more chats into customers.",
    category: "Converting Leads",
    readTime: 8,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["whatsapp business setup", "how to set up whatsapp business", "whatsapp business for leads", "whatsapp business features", "whatsapp business tips"],
  },
  {
    slug: "whatsapp-vs-phone-leads",
    title: "WhatsApp vs. Phone Calls for Leads — Which Closes Better?",
    description:
      "Should you call a lead or message them? A practical comparison of WhatsApp/text vs. phone calls for leads: response rates, customer preference, speed, and when each wins the job.",
    excerpt:
      "Call or text? For today's leads it's a real decision. Here's how WhatsApp and phone calls compare for reaching and closing leads — and when to use each.",
    category: "Converting Leads",
    readTime: 7,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["whatsapp vs phone", "text vs call leads", "should i call or text a lead", "best way to contact a lead", "whatsapp or phone for business"],
  },
  {
    slug: "marketing-for-lawyers",
    title: "Marketing for Lawyers — How to Get More Clients in 2026",
    description:
      "A practical marketing guide for lawyers and small law firms: the best channels for legal clients, why trust and reviews matter most, ethical lead generation, and how to get found locally.",
    excerpt:
      "Legal clients hire on trust, not ads. Here's a practical marketing guide for lawyers and small firms: the channels that bring real clients, and how to build the trust that closes them.",
    category: "Industry Guides",
    readTime: 9,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["marketing for lawyers", "law firm marketing", "how to get legal clients", "attorney lead generation", "lawyer leads"],
  },
  {
    slug: "marketing-for-insurance-agents",
    title: "Marketing for Insurance Agents — How to Get More Clients",
    description:
      "A practical marketing guide for insurance agents: the best lead sources, why speed and follow-up win policies, referrals and local presence, and low-cost ways to build a steady client pipeline.",
    excerpt:
      "Insurance is a relationship business built on trust and timing. Here's a practical marketing guide for agents: the lead sources that work, and how to turn them into policies.",
    category: "Industry Guides",
    readTime: 9,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["marketing for insurance agents", "insurance leads", "how to get insurance clients", "insurance agent marketing", "insurance lead generation"],
  },
  {
    slug: "leads-for-small-business",
    title: "Leads for Small Business — How to Get a Steady Flow of Customers",
    description:
      "A no-fluff guide to getting leads for a small business on a tight budget: the highest-ROI channels, why speed beats spend, what leads cost, and how to build a predictable stream of customers.",
    excerpt:
      "Every small business needs a steady flow of customers — without a big-company budget. Here's how to get leads for a small business, focused on what actually returns money.",
    category: "Lead Generation",
    readTime: 10,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["leads for small business", "small business leads", "how to get leads for small business", "small business lead generation", "get customers small business"],
  },
  {
    slug: "marketing-for-salons",
    title: "Marketing for Salons & Beauty Pros — How to Fill Your Chair",
    description:
      "A practical marketing guide for salons, stylists, and beauty pros: how to get new clients locally, the power of reviews and social proof, rebooking, and low-cost ways to stay fully booked.",
    excerpt:
      "In beauty, a full book is everything. Here's a practical marketing guide for salons and beauty pros: how to get new local clients and keep your chair full — without a big ad spend.",
    category: "Industry Guides",
    readTime: 9,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["marketing for salons", "salon marketing", "how to get salon clients", "beauty business marketing", "hair stylist marketing"],
  },
  {
    slug: "marketing-for-content-creators",
    title: "Marketing for Content Creators — How to Get Paid Clients & Brand Deals",
    description:
      "A practical guide for content creators who want paid work: how to land clients and brand deals, position your offer, use your portfolio, and find businesses actively looking for content help.",
    excerpt:
      "Making great content isn't the same as getting paid for it. Here's how content creators land clients and brand deals — positioning, outreach, and finding businesses that need you.",
    category: "Industry Guides",
    readTime: 9,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["marketing for content creators", "how to get content creation clients", "content creator clients", "get brand deals", "freelance content clients"],
  },
  {
    slug: "marketing-for-social-media-managers",
    title: "Marketing for Social Media Managers — How to Get Clients",
    description:
      "A practical guide for social media managers who want more clients: niching, packaging your service, proving ROI, and finding business owners actively looking for social media help.",
    excerpt:
      "You can run great social media for clients — but you have to find them first. Here's how social media managers get clients: positioning, outreach, and where businesses ask for help.",
    category: "Industry Guides",
    readTime: 9,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["marketing for social media managers", "how to get social media management clients", "smm clients", "get social media clients", "freelance social media manager"],
  },
  {
    slug: "marketing-for-influencers",
    title: "Marketing for Influencers — How to Land Brand Deals & Monetize",
    description:
      "A practical guide for influencers who want to monetize: landing brand deals, pitching brands, pricing your audience, and finding companies actively looking to collaborate with creators.",
    excerpt:
      "An audience is only worth what you monetize it for. Here's how influencers land brand deals and paid partnerships — pitching, pricing, and finding brands that want to work with you.",
    category: "Industry Guides",
    readTime: 8,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["marketing for influencers", "how to get brand deals", "influencer brand partnerships", "monetize influence", "influencer sponsorships"],
  },
  {
    slug: "leads-from-telegram",
    title: "How to Get Leads from Telegram — A Practical Guide",
    description:
      "Telegram groups and channels can be a real lead source. Here's how to find relevant groups, spot buying intent, engage without spamming, and turn Telegram activity into customers.",
    excerpt:
      "It's not just Facebook — Telegram groups and channels are full of people asking for services too. Here's how to turn Telegram into a real, low-cost lead source for your business.",
    category: "Lead Guides",
    readTime: 7,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["leads from telegram", "telegram leads", "how to get leads on telegram", "telegram groups for business", "telegram lead generation"],
  },
  {
    slug: "best-lead-generation-system",
    title: "The Best Lead Generation System in 2026 — How to Compare Them",
    description:
      "There's no single 'best' lead generation system — only the best for your business. Here's how to compare lead systems on cost, intent, speed, and exclusivity, and pick the one that pays off.",
    excerpt:
      "\"Best lead generation system\" has no one answer — it depends on your trade, budget, and speed. Here's how to compare the options honestly and choose the one that actually returns money.",
    category: "Lead Generation",
    readTime: 9,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["best lead generation system", "best lead generation software", "best way to get leads", "compare lead generation systems", "best facebook leads system"],
  },
];

export function getGuideEn(slug: string): GuideEn | undefined {
  return guidesEn.find((g) => g.slug === slug);
}
