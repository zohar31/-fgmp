import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Activity, Globe, Search, Bell, Zap, ShieldCheck } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Methodology — how we measure the numbers",
  description:
    "The source and method behind every number on FGMP — 50,000+ groups, 60,000+ posts daily, 4,670+ keywords, 1,000+ leads a day. Updated in real time.",
  alternates: {
    canonical: `${SITE.url}/en/methodology`,
    languages: { "he-IL": `${SITE.url}/methodology`, "en-US": `${SITE.url}/en/methodology` },
  },
  openGraph: {
    type: "article",
    title: "Methodology — how FGMP's statistics are measured",
    description:
      "Full transparency: data source, measurement method, and periodic updates of the numbers shown across the site.",
    url: `${SITE.url}/en/methodology`,
  },
};

const LAST_UPDATED = "2026-05-05";

export default function MethodologyPageEn() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${SITE.url}/en` },
          { name: "Methodology", url: `${SITE.url}/en/methodology` },
        ])}
      />
      <Nav />
      <main id="main-content" className="container-x py-10" dir="ltr">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/en" },
            { name: "Methodology", href: "/en/methodology" },
          ]}
        />

        <article className="mx-auto mt-8 max-w-3xl">
          <header>
            <h1 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              Methodology
            </h1>
            <p className="mt-3 text-sm text-ink-400">
              Last updated: {new Date(LAST_UPDATED).toLocaleDateString("en-US")}
            </p>
            <p className="mt-4 text-xl leading-9 text-ink-200">
              Full transparency for the numbers we show. Every statistic on FGMP is
              based on actual data from the system's database — not estimates, not
              marketing spin. This page explains the source and the method.
            </p>
          </header>

          <div className="mt-10 space-y-8">
            <Stat
              icon={Globe}
              value="50,000+"
              label="Facebook groups scanned"
              source="A DISTINCT count of group_id in our active-groups store, as of the end of the previous day."
              update="Updated daily at 02:00"
              note={`A group counts as "active" if it's public, has had at least 5 posts in the last 7 days, and hasn't been blocked by Facebook.`}
            />

            <Stat
              icon={Activity}
              value="50,000–60,000"
              label="Posts analyzed daily"
              source="A 30-day moving average from the system's posts table. Every post that passes through the scanner is counted once only (deduplicated by a unique post_id)."
              update="Moving average — updated daily"
              note="On peak days (holidays, weekends) it climbs to 70K+. On slow days (Monday mornings, right after holidays) it drops to 40K."
            />

            <Stat
              icon={Search}
              value="4,670+"
              label="Active keywords"
              source="An aggregate count of the keywords all our active subscribers have defined, deduplicated (DISTINCT LOWER(keyword))."
              update="Real-time count — updates on every keyword added/removed"
              note="Includes both negative keywords (filter out irrelevant inquiries) and positive keywords (surface leads)."
            />

            <Stat
              icon={Bell}
              value="1,000+"
              label="Leads sent daily"
              source="A 30-day moving average from the leads_sent table. Only leads that passed the AI filter and were actually sent to the customer are counted (not those blocked by a negative filter)."
              update="Moving average — updated daily"
              note="This number is the total across all subscribers. A single subscriber receives between 5 and 200+ leads a month depending on trade and area."
            />

            <Stat
              icon={Zap}
              value="<60 seconds"
              label="Average response time"
              source="The time between the post's publish timestamp (as shown on Facebook) and the timestamp of the alert sent to the customer's WhatsApp. Measured on a sample of the last 1,000 leads."
              update="Rolling average — measured weekly"
              note='In high "feed velocity" groups (frequent posts), the time sometimes drops to 15–30 seconds. In quiet groups it rises to 2–3 minutes.'
            />
          </div>

          <div className="mt-12 rounded-3xl border border-white/5 bg-white/[0.02] p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-brand-300" />
              <div>
                <h2 className="font-display text-xl font-bold text-white">
                  Verification
                </h2>
                <p className="mt-2 text-ink-200">
                  We're ready to show the real numbers at any moment. Prospective
                  business customers are welcome to book a demo — we'll walk you
                  through the live database on screen.
                </p>
                <p className="mt-3 text-sm text-ink-300">
                  Get in touch:{" "}
                  <a
                    href={`https://wa.me/${SITE.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-300 hover:underline"
                  >
                    WhatsApp +972585222227
                  </a>{" "}
                  or{" "}
                  <a
                    href={`mailto:${SITE.notificationEmail}`}
                    className="text-brand-300 hover:underline"
                  >
                    {SITE.notificationEmail}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/5 pt-8">
            <Link
              href="/en"
              className="inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 rotate-180" />
              Back to home
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
  source,
  update,
  note,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  source: string;
  update: string;
  note?: string;
}) {
  return (
    <div className="card p-6">
      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-500/10 ring-1 ring-brand-500/20">
          <Icon className="h-6 w-6 text-brand-300" />
        </div>
        <div className="flex-1">
          <div className="font-display text-3xl font-extrabold text-white">{value}</div>
          <div className="mt-1 text-sm font-medium text-ink-100">{label}</div>
          <dl className="mt-4 space-y-2 text-sm">
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-ink-400">
                Source
              </dt>
              <dd className="mt-1 text-ink-200">{source}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-ink-400">
                Update frequency
              </dt>
              <dd className="mt-1 text-ink-200">{update}</dd>
            </div>
            {note && (
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-ink-400">
                  Note
                </dt>
                <dd className="mt-1 text-ink-300">{note}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}
