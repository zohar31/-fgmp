import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { CheckCircle2 } from "lucide-react";
import { CancelForm } from "./CancelForm";

export const metadata: Metadata = { title: "ביטול מנוי" };

export default async function CancelPage() {
  const session = await auth();
  const userId = session!.user.id;

  const subscription = await db.query.subscriptions.findFirst({
    where: eq(schema.subscriptions.userId, userId),
  });

  if (subscription?.status === "cancelled") {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="font-display text-3xl font-extrabold text-white">ביטול מנוי</h1>
        </header>
        <div className="card border-l-4 border-ink-500 p-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-ink-300" />
            <div>
              <h3 className="font-display font-bold text-white">המנוי בוטל</h3>
              <p className="mt-1 text-sm text-ink-300">
                המנוי שלך בוטל בתאריך{" "}
                {subscription.cancelledAt &&
                  new Date(subscription.cancelledAt).toLocaleDateString("he-IL")}
                . לא יבוצעו חיובים נוספים.
              </p>
              {subscription.cancellationReason && (
                <p className="mt-2 text-xs text-ink-400">
                  סיבת ביטול: {subscription.cancellationReason}
                </p>
              )}
              <p className="mt-3 text-sm text-ink-300">
                רוצה לחזור?{" "}
                <Link href="/" className="text-brand-300 hover:underline">
                  צור איתנו קשר
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-extrabold text-white">ביטול מנוי</h1>
        <p className="mt-2 text-ink-300">
          מצטערים שאת/ה עוזב/ת. הביטול יבוצע מיד ולא יבוצעו חיובים נוספים.
        </p>
      </header>

      <div className="card p-6">
        <h2 className="font-display text-lg font-bold text-white">מה קורה אחרי ביטול</h2>
        <ul className="mt-4 space-y-2 text-sm text-ink-200">
          <li className="flex gap-2">
            <span className="text-wa">✓</span>
            <span>הגישה לאזור האישי נשמרת — כל הנתונים שלך נשמרים.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-wa">✓</span>
            <span>שליחת הלידים נפסקת מיידית.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-wa">✓</span>
            <span>לא יבוצעו חיובים נוספים.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-wa">✓</span>
            <span>תוכל/י לחדש בכל עת על ידי פנייה אלינו בוואטסאפ.</span>
          </li>
        </ul>
      </div>

      <CancelForm />
    </div>
  );
}
