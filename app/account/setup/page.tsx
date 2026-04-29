import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { CheckCircle2 } from "lucide-react";
import { SetupForm } from "./SetupForm";

export const metadata: Metadata = { title: "הגדרות עסק" };

export default async function SetupPage() {
  const session = await auth();
  const userId = session!.user.id;

  const [settings, user, subscription] = await Promise.all([
    db.query.businessSettings.findFirst({
      where: eq(schema.businessSettings.userId, userId),
    }),
    db.query.users.findFirst({ where: eq(schema.users.id, userId) }),
    db.query.subscriptions.findFirst({
      where: eq(schema.subscriptions.userId, userId),
    }),
  ]);

  const activated = !!subscription?.activatedAt;
  const setupComplete = !!(
    settings?.businessName &&
    settings?.contactName &&
    settings?.niche &&
    settings?.leadPhone &&
    settings?.keywords
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-extrabold text-white">
          הגדרות העסק
        </h1>
        <p className="mt-2 text-ink-300">
          מלא/י את הפרטים — אלה יישלחו למערכת בעת הפעלת ה-WhatsApp.
        </p>
      </header>

      <ProgressSteps current={activated ? 3 : setupComplete ? 2 : 1} />

      <div className="card border-l-4 border-brand-500 p-4">
        <p className="text-sm leading-7 text-ink-200">
          <strong className="text-white">חשוב לדעת:</strong> אחרי שמירת ההגדרות
          (שלב זה) — תועברו אוטומטית לשלב הבא: <strong className="text-wa">הפעלת WhatsApp</strong>.
          זהו השלב האחרון לסיום ההרשמה.
        </p>
      </div>

      <SetupForm
        defaults={{
          businessName: settings?.businessName ?? null,
          contactName: settings?.contactName ?? null,
          vatId: settings?.vatId ?? null,
          contactEmail: settings?.contactEmail ?? user?.email ?? null,
          leadPhone: settings?.leadPhone ?? null,
          niche: settings?.niche ?? null,
          serviceAreas: settings?.serviceAreas ?? null,
          keywords: settings?.keywords ?? null,
          description: settings?.description ?? null,
          telegramUsername: settings?.telegramUsername ?? null,
        }}
      />
    </div>
  );
}

function ProgressSteps({ current }: { current: 1 | 2 | 3 }) {
  const steps = [
    { n: 1, label: "התחברות עם Google" },
    { n: 2, label: "הגדרות העסק" },
    { n: 3, label: "הפעלת WhatsApp" },
  ] as const;

  return (
    <ol className="flex items-center justify-between gap-2 rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/5">
      {steps.map((s, i) => {
        const done = current > s.n;
        const active = current === s.n;
        return (
          <li key={s.n} className="flex flex-1 items-center gap-2">
            <span
              className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ring-1 ${
                done
                  ? "bg-wa text-white ring-wa"
                  : active
                    ? "bg-brand-500 text-white ring-brand-500"
                    : "bg-white/5 text-ink-400 ring-white/10"
              }`}
            >
              {done ? <CheckCircle2 className="h-4 w-4" /> : s.n}
            </span>
            <span
              className={`hidden text-xs sm:block ${
                done ? "text-wa" : active ? "font-bold text-white" : "text-ink-400"
              }`}
            >
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <span
                className={`mx-2 hidden h-px flex-1 sm:block ${
                  done ? "bg-wa/40" : "bg-white/10"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
