import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { CheckCircle2 } from "lucide-react";
import { SetupForm } from "./SetupForm";
import { getServerLocale } from "@/lib/i18n-server";

export const metadata: Metadata = { title: "הגדרות עסק" };

export default async function SetupPage() {
  const session = await auth();
  const userId = session!.user.id;
  const locale = await getServerLocale();
  const en = locale === "en";

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
  const paid = !!subscription?.firstPaymentAt;
  const setupComplete = !!(
    settings?.businessName &&
    settings?.contactName &&
    settings?.niche &&
    settings?.leadPhone &&
    settings?.keywords
  );

  // Step pointer: 1=details, 2=payment, 3=WhatsApp, 4=done
  const currentStep: 1 | 2 | 3 | 4 = activated
    ? 4
    : paid
      ? 3
      : setupComplete
        ? 2
        : 1;

  return (
    <div className="space-y-6" dir={en ? "ltr" : "rtl"}>
      <header>
        <h1 className="font-display text-3xl font-extrabold text-white">
          {en ? "Business settings" : "הגדרות העסק"}
        </h1>
        <p className="mt-2 text-ink-300">
          {en
            ? "Fill in your details — these are sent to the system after payment and WhatsApp activation."
            : "מלא/י את הפרטים — אלה יישלחו למערכת אחרי השלמת התשלום והפעלת ה-WhatsApp."}
        </p>
      </header>

      <ProgressSteps current={currentStep} en={en} />

      <div className="card border-l-4 border-brand-500 p-4">
        <p className="text-sm leading-7 text-ink-200">
          {en ? (
            <>
              <strong className="text-white">Signup order:</strong> business details (this step) →{" "}
              <strong className="text-amber-300">payment</strong> →{" "}
              <strong className="text-wa">WhatsApp activation</strong>. After you save, you'll move to the next step automatically.
            </>
          ) : (
            <>
              <strong className="text-white">סדר ההרשמה:</strong> פרטי עסק (שלב זה) →{" "}
              <strong className="text-amber-300">תשלום</strong> →{" "}
              <strong className="text-wa">הפעלת WhatsApp</strong>. אחרי שמירת הפרטים תועבר אוטומטית לשלב הבא.
            </>
          )}
        </p>
      </div>

      <SetupForm
        locale={locale}
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

function ProgressSteps({ current, en }: { current: 1 | 2 | 3 | 4; en: boolean }) {
  const steps = en
    ? ([
        { n: 1, label: "Business details" },
        { n: 2, label: "Payment" },
        { n: 3, label: "WhatsApp activation" },
      ] as const)
    : ([
        { n: 1, label: "פרטי העסק" },
        { n: 2, label: "תשלום" },
        { n: 3, label: "הפעלת WhatsApp" },
      ] as const);

  return (
    <ol className="flex items-center justify-between gap-1 rounded-2xl bg-white/[0.03] p-3 ring-1 ring-white/5 sm:gap-2 sm:p-4">
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
