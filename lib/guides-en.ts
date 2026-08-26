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
      "A practical guide to lead generation for small business: what a lead is, the best lead sources, what leads cost, and how to build a steady stream of customers.",
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
    title: "How to Get More Customers for a Small Business",
    description:
      "Low-cost ways to get more customers: the fastest channels, responding first, referrals, Google Business Profile, and Facebook groups — no big ad budget needed.",
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
    title: "Buying Leads — Is It Worth It? Costs & Pitfalls",
    description:
      "A straight look at buying leads: how companies price them (shared vs. exclusive), the pitfalls, the real cost-per-customer math, and a cheaper alternative.",
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
      "Facebook Lead Ads vs. organic leads from groups: cost, quality, buying intent, and close rate. Why a group lead is often warmer — and when ads still make sense.",
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
    title: "Google Business Profile — The Complete Local SEO Guide",
    description:
      "How to set up and optimize your Google Business Profile to rank in the Google Maps 3-pack: verification, categories, photos, reviews, and posts.",
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
    title: "How to Get Leads from Facebook Groups in 2026",
    description:
      "The full playbook for hot leads from Facebook groups: why it works, filtering the noise, what tools to use, the cost, and how automation changes the game.",
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
      "What a lead actually is, hot vs. cold leads, organic vs. paid, where leads come from, and how to turn a first inquiry into a paying customer.",
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
    title: "Hot vs. Cold Leads — How to Tell Them Apart",
    description:
      "The difference between a hot lead and a cold lead, how to spot each, and why treating them the same burns deals. A practical guide to reading buying intent.",
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
    title: "Speed to Lead — Why the First 5 Minutes Matter Most",
    description:
      "Close rates drop sharply after 5 minutes. Why response time is the single biggest factor in closing a lead — and how to answer first, automatically.",
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
    title: "Organic vs. Paid Leads — What Actually Pays Off",
    description:
      "A full comparison of organic and paid leads: cost, quality, close rate, and setup time. Why many small businesses shift toward organic — or a smart mix.",
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
      "What a lead really costs in the US: cost per lead by channel and trade, the hidden cost of junk leads, and why cost per acquisition is the number that matters.",
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
    title: "Lead Automation — Put Lead Generation on Autopilot",
    description:
      "What lead automation is, which parts you can automate (capture, routing, response, follow-up), the tools that do it, and how to get leads hands-free.",
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
      "The real difference between exclusive and shared leads: how the same lead is sold to 3–5 businesses, what it does to your close rate, and when exclusive wins.",
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
      "What a real-time lead is, why freshness drives close rate, how aged leads waste your money, and how to get leads the moment intent appears.",
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
      "How to tell a quality lead from junk: the signals of real buying intent, why 10 good leads beat 100 bad, and where the best leads come from.",
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
      "What to say in your first message to a lead: the structure that gets a reply, mistakes that kill the conversation, and copy-paste text templates.",
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
      "A practical follow-up system for cold leads: how many times, the right cadence, what to say each time, and how to revive old leads — without being pushy.",
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
    title: "The Sales Call Script That Books the Job",
    description:
      "A simple, proven sales call script for service businesses: how to open, qualify, present the price, and close — with exact lines and mistakes to avoid.",
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
    title: "How to Handle the 'You're Too Expensive' Objection",
    description:
      "Why customers say you're too expensive, what they really mean, and how to respond without dropping your price. Real scripts to win the job on value, not price.",
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
    title: "The Lead Funnel Explained — Contact to Customer",
    description:
      "What a lead funnel is, the stages every customer moves through (awareness → interest → decision → action), where leads leak out, and how to plug the holes.",
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
    title: "B2B Lead Generation — A Practical Guide for 2026",
    description:
      "How B2B lead generation works for small companies: the best channels, why intent beats volume, outreach vs. inbound, and low-cost ways to fill your pipeline.",
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
    title: "Google vs. Facebook Leads — Which Wins for Local?",
    description:
      "Google vs. Facebook for local leads: buying intent, cost per lead, speed, and close rate. When search wins, when social wins, and why most businesses need both.",
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
    title: "How to Filter Facebook Group Leads — Cut the Noise",
    description:
      "Facebook groups are full of noise — spam, businesses, tire-kickers. How to filter posts down to real buyers: keywords, negative keywords, and AI.",
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
    title: "Message Templates for Leads — Text & WhatsApp Scripts",
    description:
      "Copy-paste text and WhatsApp templates for every stage of a lead: first contact, quoting, following up, handling silence, and closing — ready to use.",
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
    title: "How to Close a Deal Over Text & WhatsApp",
    description:
      "Closing over text is different from the phone. Here's how to move a chat to a booked job: build trust fast, quote clearly, create urgency, and ask for the yes.",
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
      "Which Facebook groups actually produce leads: local recommend, neighborhood, and niche groups — how to find them, join, and turn them into customers.",
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
      "A ranked rundown of the best lead sources for a small business — referrals, Google, Facebook groups, and more — with the cost, intent, and effort of each.",
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
      "How to calculate how many leads you need each month to hit your goal — using your close rate, average job value, and target. A simple formula with examples.",
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
      "A practical playbook for landing your first customers with no reputation or budget: where to start, using your network, and free high-intent channels.",
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
      "Facebook groups ban self-promotion. How to get business from them without getting removed: the rules, the helpful-reply approach, and what to avoid.",
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
      "A practical guide to getting leads for free: referrals, Google Business Profile, Facebook groups, and content — and how to work each channel.",
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
      "A step-by-step framework for a lead generation strategy: set a goal, know your numbers, pick channels, respond fast, and measure. Practical and no-fluff.",
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
      "Your quote is a sales tool, not a receipt. How to write a quote that wins the job: what to include, how to present the price, anchoring, and follow-up.",
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
      "The most common mistakes businesses make with leads — slow response, no follow-up, weak first message, no qualifying — and how to fix each to close more leads.",
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
      "A practical marketing guide for contractors: the best lead sources for home services, how to get found locally, and low-cost ways to fill your schedule.",
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
      "What a lead generation system is, the parts it needs (capture, filter, deliver, respond), the types available, and how to pick one that produces customers.",
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
      "How lead generation companies work, what they charge, shared vs. exclusive leads, the red flags, and when a flat-rate real-time source beats buying leads.",
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
      "The lead metrics worth tracking: cost per lead, cost per acquisition, close rate, and response time — what each tells you and how to use them to grow.",
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
      "What lead management means, when a simple system beats a full CRM, what to track for every lead, and how to make sure no lead falls through the cracks.",
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
      "A practical lead-gen playbook for service businesses: the best local channels, why speed and reviews win, what leads cost, and how to fill your calendar.",
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
      "The real reasons bought leads disappoint: shared contacts, cold timing, low intent, rising costs — and the alternative that works.",
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
      "How to manage leads in WhatsApp: labels, quick replies, keeping every lead organized, and making sure none go cold — using WhatsApp Business tools.",
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
      "How to set up WhatsApp Business the right way: profile, catalog, quick replies, greeting and away messages, and labels — so you win more customers.",
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
      "Call a lead or message them? A practical comparison of WhatsApp/text vs. phone for leads: response rates, customer preference, speed, and when each wins.",
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
      "A practical marketing guide for lawyers and small firms: the best channels for legal clients, why trust and reviews matter most, and how to get found locally.",
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
      "A practical marketing guide for insurance agents: the best lead sources, why speed and follow-up win policies, and low-cost ways to build a steady pipeline.",
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
    title: "Leads for Small Business — A Steady Flow of Customers",
    description:
      "A no-fluff guide to getting leads for a small business on a budget: the highest-ROI channels, why speed beats spend, and how to build a predictable stream.",
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
      "A practical marketing guide for salons and beauty pros: how to get new local clients, the power of reviews and social proof, and how to stay fully booked.",
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
    title: "Marketing for Content Creators — Get Paid Clients",
    description:
      "A practical guide for content creators who want paid work: landing clients and brand deals, positioning your offer, and finding businesses that need you.",
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
      "A practical guide for social media managers who want clients: niching, packaging your service, proving ROI, and finding owners looking for social help.",
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
    title: "Marketing for Influencers — Land Brand Deals",
    description:
      "A practical guide for influencers who want to monetize: landing brand deals, pitching brands, pricing your audience, and finding companies to collaborate with.",
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
      "Telegram groups can be a real lead source. How to find relevant groups, spot buying intent, engage without spamming, and turn activity into customers.",
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
    title: "The Best Lead Generation System in 2026",
    description:
      "There's no single 'best' lead generation system — only the best for you. How to compare systems on cost, intent, speed, and exclusivity, and pick one.",
    excerpt:
      "\"Best lead generation system\" has no one answer — it depends on your trade, budget, and speed. Here's how to compare the options honestly and choose the one that actually returns money.",
    category: "Lead Generation",
    readTime: 9,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["best lead generation system", "best lead generation software", "best way to get leads", "compare lead generation systems", "best facebook leads system"],
  },
  {
    slug: "mover-leads",
    title: "Mover Leads — How Moving Companies Get More Jobs",
    description:
      "How moving companies get leads that book: why moving leads are costly and competitive, the best low-cost channels, and how to win the speed race.",
    excerpt:
      "Moving leads are some of the priciest in the country — and mostly shared. Here's how moving companies get exclusive, low-cost leads and win the booking before competitors even call.",
    category: "Industry Guides",
    readTime: 10,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["mover leads", "moving leads", "moving company leads", "leads for movers", "how to get moving leads", "moving company marketing"],
  },
  {
    slug: "locksmith-leads",
    title: "Locksmith Leads — How Locksmiths Get More Calls in 2026",
    description:
      "How locksmiths get leads that convert: why they're expensive and urgent, how to win the speed-to-lead race on lockouts, and the best low-cost channels.",
    excerpt:
      "Locksmith work is urgent and local — the first to answer usually wins. Here's how locksmiths get more calls with low-cost, high-intent leads instead of overpriced shared ones.",
    category: "Industry Guides",
    readTime: 9,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["locksmith leads", "leads for locksmiths", "how to get locksmith leads", "locksmith marketing", "locksmith lead generation", "get more locksmith calls"],
  },
  {
    slug: "plumber-leads",
    title: "Plumber Leads — How Plumbers Get More Jobs in 2026",
    description:
      "How plumbers get leads that book: why plumbing leads are urgent and pricey, how to win the speed race on emergencies, and the best low-cost channels.",
    excerpt:
      "Plumbing is urgent, local, and high-value — the plumber who answers first usually wins. Here's how plumbers get more jobs with low-cost, high-intent leads instead of overpriced shared ones.",
    category: "Industry Guides",
    readTime: 9,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["plumber leads", "plumbing leads", "leads for plumbers", "how to get plumbing leads", "plumber marketing", "plumbing lead generation"],
  },
  {
    slug: "electrician-leads",
    title: "Electrician Leads — How Electricians Get More Work in 2026",
    description:
      "How electricians get leads that convert: why licensing and trust matter most, how to win emergency calls on speed, and the best low-cost channels.",
    excerpt:
      "Electrical work is trust-heavy and local — people want a licensed pro, fast. Here's how electricians get more work with high-intent, low-cost leads instead of expensive shared ones.",
    category: "Industry Guides",
    readTime: 9,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["electrician leads", "electrical leads", "leads for electricians", "how to get electrician leads", "electrician marketing", "electrical lead generation"],
  },
  {
    slug: "hvac-leads",
    title: "HVAC Leads — How HVAC Companies Get More Calls in 2026",
    description:
      "How HVAC companies get leads that book: why HVAC leads are seasonal and expensive, how to win the speed race on no-AC emergencies, and the best channels.",
    excerpt:
      "HVAC is seasonal, urgent, and one of the priciest lead categories there is. Here's how HVAC companies get more calls with high-intent, low-cost leads instead of overpriced shared ones.",
    category: "Industry Guides",
    readTime: 9,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    keywords: ["hvac leads", "leads for hvac", "how to get hvac leads", "hvac marketing", "ac repair leads", "hvac lead generation"],
  },
  {
    slug: "roofer-leads",
    title: "Roofing Leads — How Roofers Get More Jobs in 2026",
    description:
      "How roofers get leads that close: why roofing leads are among the priciest in home services, the storm-and-insurance opportunity, and how to win on trust.",
    excerpt:
      "Roofing leads are some of the most expensive in the country — big tickets, big competition. Here's how roofers get high-intent, low-cost leads and win the job on trust, not just price.",
    category: "Industry Guides",
    readTime: 9,
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    keywords: ["roofing leads", "roofer leads", "leads for roofers", "how to get roofing leads", "roofing marketing", "storm damage roofing leads"],
  },
  {
    slug: "handyman-leads",
    title: "Handyman Leads — How Handymen Get More Jobs in 2026",
    description:
      "How handymen get a steady flow of jobs: why volume and speed matter most, the best low-cost local channels, and how to handle small jobs profitably.",
    excerpt:
      "Handyman work is high-volume and local — the one who answers first and shows up wins. Here's how handymen keep the calendar full with low-cost, high-intent leads.",
    category: "Industry Guides",
    readTime: 8,
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    keywords: ["handyman leads", "leads for handyman", "how to get handyman jobs", "handyman marketing", "handyman lead generation"],
  },
  {
    slug: "house-cleaning-leads",
    title: "House Cleaning Leads — How Cleaners Get More Clients in 2026",
    description:
      "How house cleaners get recurring clients: why retention beats one-off jobs, the best local channels, and how trust and reviews win the booking.",
    excerpt:
      "In cleaning, recurring clients are gold. Here's how house cleaners get more clients — and keep them — with low-cost, high-intent leads instead of a race to the bottom on price.",
    category: "Industry Guides",
    readTime: 8,
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    keywords: ["house cleaning leads", "cleaning leads", "leads for house cleaners", "how to get cleaning clients", "cleaning business marketing"],
  },
  {
    slug: "painter-leads",
    title: "Painting Leads — How Painters Get More Jobs in 2026",
    description:
      "How painters get leads that book: why the quote and portfolio win the job, seasonality, and where homeowners ask for interior and exterior painting.",
    excerpt:
      "Painting jobs are won on trust, a sharp quote, and great before/after photos. Here's how painters get more high-intent, low-cost leads and turn them into booked jobs.",
    category: "Industry Guides",
    readTime: 8,
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    keywords: ["painting leads", "painter leads", "leads for painters", "how to get painting jobs", "painting business marketing"],
  },
  {
    slug: "landscaping-leads",
    title: "Landscaping & Lawn Care Leads — Get More Clients",
    description:
      "How landscapers and lawn-care pros get clients: why recurring maintenance is the goal, seasonality, and where homeowners ask for lawn care.",
    excerpt:
      "Lawn care and landscaping thrive on recurring accounts, not one-off mows. Here's how to get more landscaping clients with low-cost, high-intent local leads.",
    category: "Industry Guides",
    readTime: 8,
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    keywords: ["landscaping leads", "lawn care leads", "leads for landscapers", "how to get landscaping clients", "lawn care marketing"],
  },
  {
    slug: "pest-control-leads",
    title: "Pest Control Leads — How to Get More Clients in 2026",
    description:
      "How pest control companies get leads: why urgency and recurring plans drive the business, the best local channels, and how trust wins the call.",
    excerpt:
      "Pest problems are urgent and recurring — a great mix for a steady business. Here's how pest control companies get more high-intent, low-cost leads and turn them into recurring plans.",
    category: "Industry Guides",
    readTime: 8,
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    keywords: ["pest control leads", "leads for pest control", "how to get pest control clients", "exterminator leads", "pest control marketing"],
  },
  {
    slug: "carpenter-leads",
    title: "Carpentry Leads — How Carpenters Get More Jobs in 2026",
    description:
      "How carpenters get leads for custom and finish work: why a portfolio wins the job, the best local channels, and where homeowners ask for a carpenter.",
    excerpt:
      "Carpentry sells on craftsmanship — your portfolio does the pitching. Here's how carpenters get more custom, finish, and remodel work with high-intent, low-cost local leads.",
    category: "Industry Guides",
    readTime: 8,
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    keywords: ["carpentry leads", "carpenter leads", "leads for carpenters", "how to get carpentry jobs", "finish carpentry marketing"],
  },
  {
    slug: "appliance-repair-leads",
    title: "Appliance Repair Leads — How to Get More Calls in 2026",
    description:
      "How appliance repair techs get leads: why broken-fridge urgency drives fast calls, diagnostic fees, and where homeowners ask for appliance repair.",
    excerpt:
      "A dead fridge or washer is an emergency — the tech who answers first gets the call. Here's how appliance repair pros get more high-intent, low-cost leads.",
    category: "Industry Guides",
    readTime: 7,
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    keywords: ["appliance repair leads", "leads for appliance repair", "how to get appliance repair calls", "appliance repair marketing", "refrigerator repair leads"],
  },
  {
    slug: "garage-door-leads",
    title: "Garage Door Leads — How to Get More Jobs in 2026",
    description:
      "How garage door companies get leads: urgent repairs (stuck door, broken spring), opener installs, safety, and where homeowners ask for garage door service.",
    excerpt:
      "A stuck or broken garage door is urgent — and repairs plus installs are solid tickets. Here's how garage door companies get more high-intent, low-cost leads.",
    category: "Industry Guides",
    readTime: 7,
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    keywords: ["garage door leads", "leads for garage door", "how to get garage door jobs", "garage door repair leads", "garage door marketing"],
  },
  {
    slug: "flooring-leads",
    title: "Flooring Leads — How Installers Get More Jobs",
    description:
      "How flooring installers get leads: mid-to-large tickets, material choices, why the quote and portfolio win, and where homeowners ask for flooring.",
    excerpt:
      "Flooring is a big-ticket, quote-driven job — the installer with the best portfolio and clearest estimate wins. Here's how flooring pros get more high-intent, low-cost leads.",
    category: "Industry Guides",
    readTime: 8,
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    keywords: ["flooring leads", "leads for flooring", "how to get flooring jobs", "flooring installer marketing", "hardwood flooring leads"],
  },
  {
    slug: "junk-removal-leads",
    title: "Junk Removal Leads — How to Get More Jobs in 2026",
    description:
      "How junk removal companies get leads: same-day demand, simple upfront pricing, commercial and property-manager accounts, and where people ask for junk hauling.",
    excerpt:
      "Junk removal is fast-turnaround and volume-driven — the first to reply and quote wins. Here's how junk removal companies get more high-intent, low-cost leads.",
    category: "Industry Guides",
    readTime: 7,
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    keywords: ["junk removal leads", "leads for junk removal", "how to get junk removal jobs", "junk hauling leads", "junk removal marketing"],
  },
  {
    slug: "pressure-washing-leads",
    title: "Pressure Washing Leads — How to Get More Jobs in 2026",
    description:
      "How pressure washing pros get leads: seasonality, the power of before/after photos, driveways/houses/decks, and where homeowners ask for pressure washing.",
    excerpt:
      "Pressure washing sells on dramatic before/after results — the photos do the pitching. Here's how pressure washing pros get more high-intent, low-cost local leads.",
    category: "Industry Guides",
    readTime: 7,
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    keywords: ["pressure washing leads", "leads for pressure washing", "how to get pressure washing jobs", "power washing leads", "pressure washing marketing"],
  },
  {
    slug: "tree-service-leads",
    title: "Tree Service Leads — How to Get More Jobs in 2026",
    description:
      "How tree service companies get leads: why insurance and safety win the job, storm-emergency demand, and where homeowners ask for tree removal.",
    excerpt:
      "Tree work is high-ticket and high-stakes — homeowners want an insured pro, fast, especially after storms. Here's how tree services get more high-intent, low-cost leads.",
    category: "Industry Guides",
    readTime: 8,
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    keywords: ["tree service leads", "leads for tree service", "how to get tree removal jobs", "tree trimming leads", "tree service marketing"],
  },
  {
    slug: "photographer-leads",
    title: "Photography Leads — How to Get More Bookings",
    description:
      "How photographers get clients: why the portfolio and reviews win, weddings/events/portraits, booking ahead, and where people ask for a photographer.",
    excerpt:
      "Photography is booked on your portfolio and your vibe. Here's how photographers get more weddings, events, and portrait clients with high-intent, low-cost leads.",
    category: "Industry Guides",
    readTime: 8,
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    keywords: ["photography leads", "photographer leads", "how to get photography clients", "wedding photographer marketing", "how to book more photo clients"],
  },
  {
    slug: "real-estate-leads",
    title: "Real Estate Leads — How Agents Get More Clients in 2026",
    description:
      "How real estate agents get leads: buyers vs. sellers, referrals and sphere, local farming, and why speed to lead decides who wins.",
    excerpt:
      "Real estate runs on relationships and speed. Here's how agents get more buyer and seller leads — from referrals, local presence, and the requests happening in local groups right now.",
    category: "Industry Guides",
    readTime: 9,
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    keywords: ["real estate leads", "realtor leads", "how to get real estate clients", "real estate agent marketing", "buyer and seller leads"],
  },
  {
    slug: "personal-training-leads",
    title: "Personal Training Leads — Get More Clients in 2026",
    description:
      "How personal trainers get clients: results and transformations sell, retention beats churn, online vs. in-person, and where people ask for a trainer.",
    excerpt:
      "Personal training sells on results and trust — and thrives on retention. Here's how trainers get more clients, online and in-person, with high-intent, low-cost leads.",
    category: "Industry Guides",
    readTime: 8,
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    keywords: ["personal training leads", "personal trainer leads", "how to get personal training clients", "fitness coach marketing", "get more training clients"],
  },
  {
    slug: "auto-repair-leads",
    title: "Auto Repair Leads — How Mechanics Get More Customers in 2026",
    description:
      "How auto mechanics and repair shops get leads: trust in a scam-wary market, diagnostics, repeat customers, and where drivers ask for a mechanic they can trust.",
    excerpt:
      "Drivers fear being ripped off — the mechanic they trust wins. Here's how auto repair shops get more customers with high-intent, low-cost local leads and earned trust.",
    category: "Industry Guides",
    readTime: 8,
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    keywords: ["auto repair leads", "mechanic leads", "how to get auto repair customers", "auto shop marketing", "car repair leads"],
  },
];

export function getGuideEn(slug: string): GuideEn | undefined {
  return guidesEn.find((g) => g.slug === slug);
}
