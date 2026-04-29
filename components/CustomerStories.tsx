import Image from "next/image";
import { MapPin, CheckCircle2 } from "lucide-react";

type Story = {
  name: string;
  business: string;
  niche: string;
  region: string;
  screenshot: string;
  emoji: string;
};

const stories: Story[] = [
  {
    name: "שרון רביבו",
    business: "צלם אירועים",
    niche: "צילום",
    region: "מרכז",
    screenshot: "/screenshots/lead-photographer.jpg",
    emoji: "📸",
  },
  {
    name: "חופית חדד",
    business: "קונדיטוריית בוטיק",
    niche: "עוגות אירועים",
    region: "פתח תקווה",
    screenshot: "/screenshots/lead-bakery.jpg",
    emoji: "🎂",
  },
  {
    name: "אושרית",
    business: "מגע של יופי",
    niche: "קוסמטיקה",
    region: "גבעתיים·רמת גן",
    screenshot: "/screenshots/lead-cosmetics.jpg",
    emoji: "💄",
  },
  {
    name: "מישל לוין",
    business: "מאפרת אירועים",
    niche: "איפור",
    region: "תל אביב·רמת גן",
    screenshot: "/screenshots/lead-makeup.jpg",
    emoji: "💋",
  },
  {
    name: "צחי זוהר",
    business: "הנדימן ושיפוצים",
    niche: "שיפוצים",
    region: "ארצי",
    screenshot: "/screenshots/lead-handyman.jpg",
    emoji: "🔧",
  },
  {
    name: "גל",
    business: "מבריק שירותי ניקיון",
    niche: "ניקיון",
    region: "בת ים והסביבה",
    screenshot: "/screenshots/lead-cleaning.jpg",
    emoji: "🧹",
  },
  {
    name: "צדוק יעקב",
    business: "סוכנות ביטוח",
    niche: "ביטוח",
    region: "ארצי",
    screenshot: "/screenshots/lead-insurance.jpg",
    emoji: "🛡️",
  },
  {
    name: "מאיה זוהר",
    business: "MAY FLY",
    niche: "סוכנות נסיעות",
    region: "ארצי",
    screenshot: "/screenshots/lead-travel.jpg",
    emoji: "✈️",
  },
  {
    name: "עמיחי אלוף",
    business: "הצבע והשיפוצים",
    niche: "צבע ושיפוצים",
    region: "ירושלים",
    screenshot: "/screenshots/lead-painter.jpg",
    emoji: "🎨",
  },
  {
    name: "רן",
    business: "המנעול",
    niche: "פריצה ומנעולנות",
    region: "ארצי",
    screenshot: "/screenshots/lead-locksmith.jpg",
    emoji: "🔐",
  },
  {
    name: "מאור חדד",
    business: "Havalim — קבלן בניין",
    niche: "בנייה ושיפוצים",
    region: "ארצי",
    screenshot: "/screenshots/lead-builder.jpg",
    emoji: "🏗️",
  },
];

export function CustomerStories() {
  return (
    <section id="stories" className="py-20 md:py-28 relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-1/3 -z-10 h-96 w-96 rounded-full bg-brand-500/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/3 -z-10 h-96 w-96 rounded-full bg-wa/15 blur-3xl"
      />

      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <div className="pill text-brand-300 ring-brand-500/30">
            <CheckCircle2 className="h-3.5 w-3.5" />
            סיפורי לקוחות
          </div>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl text-balance">
            עסקים אמיתיים. לידים אמיתיים.{" "}
            <span className="gradient-text">תוצאות אמיתיות.</span>
          </h2>
          <p className="mt-4 text-lg text-ink-300">
            מעל מאות עסקים בישראל מקבלים לידים אמיתיים יום-יום דרך{" "}
            <span className="font-bold text-white">FGMP</span>.
            הנה כמה מהם — הצילומים אמיתיים, הלידים אמיתיים, ההצלחה — שלהם.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {stories.map((s) => (
            <StoryCard key={s.name + s.business} story={s} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-ink-400">
            🔒 כל הלקוחות אישרו פרסום שמם במסגרת סיפורי הלקוחות שלנו.
          </p>
        </div>
      </div>
    </section>
  );
}

function StoryCard({ story }: { story: Story }) {
  return (
    <article className="group card relative flex flex-col overflow-hidden p-0 ring-1 ring-white/10 transition hover:ring-brand-500/40 hover:-translate-y-1">
      <div className="relative aspect-[9/16] overflow-hidden bg-[#0b141a]">
        <Image
          src={story.screenshot}
          alt={`ליד אמיתי שהתקבל אצל ${story.name} — ${story.business}`}
          fill
          sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, (max-width:1280px) 30vw, 22vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent" />

        <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-bg/80 text-xl ring-1 ring-white/15 backdrop-blur-md">
          {story.emoji}
        </div>

        <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-wa/15 px-2.5 py-1 text-[10px] font-bold text-wa ring-1 ring-wa/40 backdrop-blur-md">
          <CheckCircle2 className="h-3 w-3" />
          ליד אמיתי
        </div>
      </div>

      <div className="p-4">
        <div className="font-display text-base font-bold text-white">{story.name}</div>
        <div className="mt-0.5 truncate text-sm text-ink-200">{story.business}</div>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-500/10 px-2 py-0.5 text-brand-300 ring-1 ring-brand-500/30">
            {story.niche}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-ink-300 ring-1 ring-white/10">
            <MapPin className="h-2.5 w-2.5" />
            {story.region}
          </span>
        </div>
      </div>
    </article>
  );
}
