// ─────────────────────────────────────────────────────────────────────────
// US Local-SEO matrix: profession × city, under /en/leads/<profession>/<city>.
// Mirrors the Hebrew geo.ts approach — varied templated copy keyed to a stable
// hash of (profession, city) so no two pages read identically. Targets
// US local-intent searches like "plumber leads in Houston".
// ─────────────────────────────────────────────────────────────────────────

export type CityEn = {
  slug: string;
  name: string; // "Houston"
  state: string; // "TX"
  region: "Northeast" | "South" | "Midwest" | "West";
  nearby: string[];
};

export const citiesEn: CityEn[] = [
  { slug: "new-york", name: "New York", state: "NY", region: "Northeast", nearby: ["Brooklyn", "Queens", "Newark", "Jersey City"] },
  { slug: "los-angeles", name: "Los Angeles", state: "CA", region: "West", nearby: ["Long Beach", "Glendale", "Pasadena", "Santa Monica"] },
  { slug: "chicago", name: "Chicago", state: "IL", region: "Midwest", nearby: ["Evanston", "Naperville", "Cicero", "Oak Park"] },
  { slug: "houston", name: "Houston", state: "TX", region: "South", nearby: ["Katy", "Pasadena", "Sugar Land", "The Woodlands"] },
  { slug: "phoenix", name: "Phoenix", state: "AZ", region: "West", nearby: ["Scottsdale", "Mesa", "Tempe", "Glendale"] },
  { slug: "philadelphia", name: "Philadelphia", state: "PA", region: "Northeast", nearby: ["Camden", "Cherry Hill", "Bensalem", "Upper Darby"] },
  { slug: "san-antonio", name: "San Antonio", state: "TX", region: "South", nearby: ["New Braunfels", "Schertz", "Boerne", "Converse"] },
  { slug: "san-diego", name: "San Diego", state: "CA", region: "West", nearby: ["Chula Vista", "La Mesa", "El Cajon", "Escondido"] },
  { slug: "dallas", name: "Dallas", state: "TX", region: "South", nearby: ["Plano", "Irving", "Garland", "Frisco"] },
  { slug: "austin", name: "Austin", state: "TX", region: "South", nearby: ["Round Rock", "Cedar Park", "Georgetown", "Pflugerville"] },
  { slug: "jacksonville", name: "Jacksonville", state: "FL", region: "South", nearby: ["Orange Park", "St. Augustine", "Fernandina Beach"] },
  { slug: "san-jose", name: "San Jose", state: "CA", region: "West", nearby: ["Santa Clara", "Sunnyvale", "Milpitas", "Campbell"] },
  { slug: "charlotte", name: "Charlotte", state: "NC", region: "South", nearby: ["Concord", "Gastonia", "Huntersville", "Matthews"] },
  { slug: "columbus", name: "Columbus", state: "OH", region: "Midwest", nearby: ["Dublin", "Westerville", "Grove City", "Reynoldsburg"] },
  { slug: "indianapolis", name: "Indianapolis", state: "IN", region: "Midwest", nearby: ["Carmel", "Fishers", "Greenwood", "Noblesville"] },
  { slug: "seattle", name: "Seattle", state: "WA", region: "West", nearby: ["Bellevue", "Renton", "Kent", "Redmond"] },
  { slug: "denver", name: "Denver", state: "CO", region: "West", nearby: ["Aurora", "Lakewood", "Arvada", "Centennial"] },
  { slug: "nashville", name: "Nashville", state: "TN", region: "South", nearby: ["Franklin", "Murfreesboro", "Hendersonville", "Brentwood"] },
  { slug: "miami", name: "Miami", state: "FL", region: "South", nearby: ["Hialeah", "Coral Gables", "Kendall", "Fort Lauderdale"] },
  { slug: "atlanta", name: "Atlanta", state: "GA", region: "South", nearby: ["Marietta", "Sandy Springs", "Decatur", "Roswell"] },
  { slug: "boston", name: "Boston", state: "MA", region: "Northeast", nearby: ["Cambridge", "Quincy", "Newton", "Somerville"] },
  { slug: "tampa", name: "Tampa", state: "FL", region: "South", nearby: ["St. Petersburg", "Clearwater", "Brandon", "Wesley Chapel"] },
  { slug: "las-vegas", name: "Las Vegas", state: "NV", region: "West", nearby: ["Henderson", "North Las Vegas", "Summerlin", "Spring Valley"] },
  { slug: "orlando", name: "Orlando", state: "FL", region: "South", nearby: ["Kissimmee", "Winter Park", "Sanford", "Altamonte Springs"] },
];

export type ProfessionEn = {
  slug: string; // "plumber"
  noun: string; // "plumber"
  nounPlural: string; // "plumbers"
  service: string; // "plumbing"
  searchExamples: string[]; // realistic group-post phrasings (city injected)
};

export const professionsEn: ProfessionEn[] = [
  { slug: "plumber", noun: "plumber", nounPlural: "plumbers", service: "plumbing", searchExamples: ["Can anyone recommend a good plumber", "Need a plumber ASAP", "Looking for an affordable plumber"] },
  { slug: "electrician", noun: "electrician", nounPlural: "electricians", service: "electrical work", searchExamples: ["Looking for a licensed electrician", "Who's a good electrician around here", "Need an electrician for a panel upgrade"] },
  { slug: "hvac", noun: "HVAC technician", nounPlural: "HVAC techs", service: "HVAC service", searchExamples: ["AC stopped working, need HVAC help", "Recommend an HVAC company", "Looking for AC repair"] },
  { slug: "handyman", noun: "handyman", nounPlural: "handymen", service: "handyman work", searchExamples: ["Need a reliable handyman", "Handyman for small repairs", "Who do you use for handyman work"] },
  { slug: "locksmith", noun: "locksmith", nounPlural: "locksmiths", service: "locksmith service", searchExamples: ["Locked out, need a locksmith now", "Recommend a locksmith", "Need to rekey my locks"] },
  { slug: "mover", noun: "moving company", nounPlural: "movers", service: "moving", searchExamples: ["Looking for movers this weekend", "Recommend a moving company", "Need help moving apartments"] },
  { slug: "house-cleaner", noun: "house cleaner", nounPlural: "house cleaners", service: "house cleaning", searchExamples: ["Looking for a house cleaner", "Recommend a cleaning service", "Need a reliable maid service"] },
  { slug: "roofer", noun: "roofer", nounPlural: "roofers", service: "roofing", searchExamples: ["Need a roofer for a leak", "Recommend a roofing company", "Looking for a roof estimate"] },
  { slug: "painter", noun: "painter", nounPlural: "painters", service: "painting", searchExamples: ["Looking for an interior painter", "Recommend a painting company", "Need my house painted"] },
  { slug: "landscaper", noun: "landscaper", nounPlural: "landscapers", service: "landscaping", searchExamples: ["Need a landscaper for the yard", "Recommend a lawn service", "Looking for landscaping help"] },
  { slug: "pest-control", noun: "pest control company", nounPlural: "pest control companies", service: "pest control", searchExamples: ["Need pest control ASAP", "Recommend an exterminator", "Looking for pest control"] },
  { slug: "general-contractor", noun: "general contractor", nounPlural: "general contractors", service: "remodeling", searchExamples: ["Looking for a general contractor", "Recommend a contractor for a remodel", "Need a contractor for a kitchen"] },
  { slug: "carpenter", noun: "carpenter", nounPlural: "carpenters", service: "carpentry", searchExamples: ["Looking for a carpenter", "Recommend a good carpenter", "Need custom built-ins"] },
  { slug: "appliance-repair", noun: "appliance repair tech", nounPlural: "appliance repair techs", service: "appliance repair", searchExamples: ["Fridge broke, need appliance repair", "Recommend appliance repair", "Washer not working, need help"] },
  { slug: "garage-door", noun: "garage door company", nounPlural: "garage door companies", service: "garage door repair", searchExamples: ["Garage door won't open, need help", "Recommend garage door repair", "Looking for garage door install"] },
  { slug: "flooring", noun: "flooring installer", nounPlural: "flooring installers", service: "flooring", searchExamples: ["Looking for a flooring installer", "Recommend a flooring company", "Need hardwood floors installed"] },
  { slug: "junk-removal", noun: "junk removal service", nounPlural: "junk removal services", service: "junk removal", searchExamples: ["Need junk hauled away", "Recommend junk removal", "Looking for junk removal"] },
  { slug: "pressure-washing", noun: "pressure washing company", nounPlural: "pressure washing companies", service: "pressure washing", searchExamples: ["Need my driveway pressure washed", "Recommend pressure washing", "Looking for power washing"] },
  { slug: "tree-service", noun: "tree service", nounPlural: "tree services", service: "tree removal", searchExamples: ["Need a tree removed", "Recommend a tree service", "Looking for tree trimming"] },
  { slug: "photographer", noun: "photographer", nounPlural: "photographers", service: "photography", searchExamples: ["Looking for a wedding photographer", "Recommend a photographer", "Need a family photographer"] },
  { slug: "real-estate-agent", noun: "real estate agent", nounPlural: "real estate agents", service: "real estate", searchExamples: ["Looking for a real estate agent", "Recommend a realtor", "Selling my house, need an agent"] },
  { slug: "insurance-agent", noun: "insurance agent", nounPlural: "insurance agents", service: "insurance", searchExamples: ["Looking for an insurance agent", "Recommend an insurance broker", "Need help with home insurance"] },
  { slug: "personal-trainer", noun: "personal trainer", nounPlural: "personal trainers", service: "personal training", searchExamples: ["Looking for a personal trainer", "Recommend a trainer", "Need a trainer near me"] },
  { slug: "auto-mechanic", noun: "auto mechanic", nounPlural: "auto mechanics", service: "auto repair", searchExamples: ["Need a trustworthy mechanic", "Recommend an auto shop", "Looking for a mechanic"] },
];

// ── lookups ────────────────────────────────────────────────────────────────
export function getCityEn(slug: string): CityEn | undefined {
  return citiesEn.find((c) => c.slug === slug);
}
export function getProfessionEn(slug: string): ProfessionEn | undefined {
  return professionsEn.find((p) => p.slug === slug);
}
export function allGeoEnParams(): { profession: string; city: string }[] {
  const out: { profession: string; city: string }[] = [];
  for (const p of professionsEn) for (const c of citiesEn) out.push({ profession: p.slug, city: c.slug });
  return out;
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}
function pick<T>(bank: T[], seed: string): T {
  return bank[hash(seed) % bank.length];
}

export type GeoEnContent = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  kicker: string;
  subheading: string;
  intro: string[];
  benefits: string[];
  faq: { q: string; a: string }[];
  nearbyLine: string;
};

export function buildGeoEnContent(p: ProfessionEn, c: CityEn, monthly: number, refundDays: number): GeoEnContent {
  const seed = `${p.slug}|${c.slug}`;
  const example = pick(p.searchExamples, seed);
  const cityState = `${c.name}, ${c.state}`;

  const kicker = pick([`${c.name} leads`, `Leads in ${c.name}`, `${cityState}`], seed + "k");
  const h1 = `${p.noun.charAt(0).toUpperCase() + p.noun.slice(1)} Leads in ${c.name}, ${c.state} — From Facebook Groups to Your WhatsApp`;
  const metaTitle = `${p.noun.charAt(0).toUpperCase() + p.noun.slice(1)} Leads in ${c.name}, ${c.state} | FGMP`;
  const metaDescription = `Get ${p.noun} leads in ${cityState}. FGMP scans ${c.name}-area Facebook groups 24/7 and sends every ${p.service} request straight to your WhatsApp — before your competitors. $${monthly}/mo, ${refundDays}-day money-back guarantee.`;
  const subheading = `Every day, people in ${c.name} post things like "${example} in ${c.name}" in local Facebook groups. FGMP finds them in real time and sends the lead to your WhatsApp — before anyone else replies.`;

  const intro1 = pick(
    [
      `If you're a ${p.noun} working in ${cityState}, your next customers are already asking for you — in local Facebook groups. Residents across ${c.name} post "${example}" every day and get a flood of replies. The catch: you can't sit and scan every ${c.name}, ${c.nearby.slice(0, 2).join(" and ")}, and surrounding-area group all day.`,
      `${c.name} is one of the busiest markets for ${p.service}, and that means competition for every request is fierce. Dozens of posts a week from people asking "${example}" appear in local ${c.name} and ${c.nearby[0]} groups — and most close with whoever replied first.`,
      `A ${p.noun} in ${c.name} doesn't need another expensive ad — you need to reach the ${p.service} requests already being posted in the city's Facebook groups first. People in ${c.name} search for "${example}" daily, and every post is a warm potential customer.`,
    ],
    seed + "1"
  );
  const intro2 = pick(
    [
      `FGMP scans 50,000+ active Facebook groups on our side — including the local groups across ${c.name} and the ${c.region}. The moment a ${p.service} request goes up in your area, our AI detects it in under a minute, writes a tailored reply, and sends it to your WhatsApp with a direct link.`,
      `Instead of you hunting for customers, FGMP brings them to you: it monitors the ${c.name}-area groups and flags every ${p.service} request. The alert hits your WhatsApp in real time — with the original post and an AI-written reply ready to send.`,
    ],
    seed + "2"
  );
  const intro3 = pick(
    [
      `Instead of paying $25–$100+ per shared lead from a lead company (that also sold it to 3 competitors in ${c.name}), you pay a flat $${monthly}/month for every ${p.service} request in your area — unlimited. One job covers the subscription for months.`,
      `While competitors in ${c.name} pay hundreds per exclusive lead, you pay a flat $${monthly}/month for the whole stream of ${p.service} requests — no per-lead fees. And there's a ${refundDays}-day money-back guarantee, so you can test it risk-free.`,
    ],
    seed + "3"
  );

  const benefits = [
    `**Full ${c.name}-area coverage** — local groups across ${c.name}, ${c.nearby.slice(0, 3).join(", ")}, and nearby are scanned continuously.`,
    `**You reply first** — the post reaches your WhatsApp in under a minute. In ${p.service}, whoever answers first wins the job.`,
    `**AI-written reply for every lead** — tailored to the specific post and your ${c.name} business, not a canned template.`,
    `**Flat $${monthly}/month** — no per-lead fees, no ad budget, no surprises.`,
    `**Effectively exclusive leads** — the original group request, not a used lead resold to half the ${p.nounPlural} in ${c.name}.`,
  ];

  const faq = [
    {
      q: `How many ${p.noun} leads can I get in ${c.name}?`,
      a: `It depends on the season and how active the local groups are, but ${c.name} is a busy market — ${p.nounPlural} typically see dozens of requests a month from the city's groups. With the ${refundDays}-day money-back guarantee you can test the volume risk-free.`,
    },
    {
      q: `I also work outside ${c.name} — does that work?`,
      a: `Absolutely. You can set multiple service areas — for example ${c.name} plus ${c.nearby.slice(0, 2).join(" and ")} and the surrounding ${c.region} — and the system sends you ${p.service} requests from all of them.`,
    },
    {
      q: `How much does it cost?`,
      a: `$${monthly}/month, no per-lead fees, no contract. There's a ${refundDays}-day money-back guarantee — cancel within ${refundDays} days of your first payment for a full refund. After that, the paid month isn't refundable.`,
    },
  ];

  const nearbyLine = `${p.noun.charAt(0).toUpperCase() + p.noun.slice(1)} leads also in: ${c.nearby.join(" · ")}`;

  return { metaTitle, metaDescription, h1, kicker, subheading, intro: [intro1, intro2, intro3], benefits, faq, nearbyLine };
}
