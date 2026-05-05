import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { ChevronLeft, AlertCircle } from "lucide-react";
import { TestChargeButton } from "./TestChargeButton";

export const metadata: Metadata = {
  title: "בדיקת סליקה (אדמין)",
  robots: { index: false, follow: false },
};

export default async function AdminBillingTestPage() {
  const session = await auth();
  if (!isAdmin(session)) redirect("/account");

  const userId = session!.user!.id;
  const settings = await db.query.businessSettings.findFirst({
    where: eq(schema.businessSettings.userId, userId),
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-extrabold text-white">
          בדיקת סליקה — חיוב אמיתי 1 ₪
        </h1>
        <p className="mt-2 text-ink-300">
          מצב TEST של Tranzila לא תומך בכרטיסי בדיקה. כדי לוודא שהסליקה עובדת
          end-to-end — נחייב 1 ₪ אמיתי על הכרטיס שלך, ובהמשך נבטל/נחזיר אם תרצה.
        </p>
      </header>

      <div className="card border-l-4 border-amber-500 p-5">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-1 h-5 w-5 shrink-0 text-amber-300" />
          <div className="text-sm leading-7 text-ink-200">
            <strong className="text-amber-300">חיוב אמיתי!</strong>
            {" "}לחיצה על הכפתור תיצור עסקה ב-Tranzila שתחייב את הכרטיס באמת ב-1 ₪.
            אחרי שווידאת שהכל עובד, תוכל להחזיר את הסכום דרך פאנל Tranzila או דרך
            מסוף הזיכויים (סיסמה: <code className="text-ink-300">tnqRWM3F</code>).
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="mb-3 font-display font-bold text-white">מה ייבדק בעסקה הזו?</h2>
        <ol className="space-y-2 text-sm leading-7 text-ink-200 [&_li]:before:content-['✓'] [&_li]:before:mr-2 [&_li]:before:text-wa">
          <li>Tranzila מקבלת את הבקשה ומעבדת אותה</li>
          <li>החיוב עובר בהצלחה (Response code = 000)</li>
          <li>Webhook (`/api/billing/return`) נקרא ע"י Tranzila</li>
          <li>נשמר invoice ב-DB עם פרטי העסקה (index, ConfirmationCode)</li>
          <li>נשמר Tranzila Token לחיוב חוזר</li>
          <li>נשמרים פרטי כרטיס מוצפנים (last4, expiry)</li>
          <li>Subscription status עובר ל-active</li>
          <li>nextChargeAt מתעדכן ל-30 יום קדימה</li>
          <li>Notification נשלח ללקוח על תשלום שהתקבל</li>
        </ol>
      </div>

      <div className="card p-6">
        <h2 className="mb-3 font-display font-bold text-white">פרטי המשתמש שלך</h2>
        <dl className="grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-ink-400">משתמש:</dt>
            <dd className="text-white">{session!.user!.email}</dd>
          </div>
          <div>
            <dt className="text-ink-400">שם עסק:</dt>
            <dd className="text-white">{settings?.businessName || "—"}</dd>
          </div>
          <div>
            <dt className="text-ink-400">איש קשר:</dt>
            <dd className="text-white">{settings?.contactName || session!.user!.name || "—"}</dd>
          </div>
          <div>
            <dt className="text-ink-400">ת.ז./ע.מ.:</dt>
            <dd className="text-white" dir="ltr">{settings?.vatId || "—"}</dd>
          </div>
          <div>
            <dt className="text-ink-400">טלפון לידים:</dt>
            <dd className="text-white" dir="ltr">{settings?.leadPhone || "—"}</dd>
          </div>
        </dl>
      </div>

      <TestChargeButton
        userId={userId}
        email={settings?.contactEmail || session!.user!.email || ""}
        contact={settings?.contactName || session!.user!.name || ""}
        phone={settings?.leadPhone || ""}
        myid={settings?.vatId || ""}
      />

      <div className="card p-5">
        <h2 className="mb-3 font-display font-bold text-white">אחרי הבדיקה</h2>
        <ul className="list-inside list-disc space-y-1 text-sm text-ink-300">
          <li>ב-/admin/payments — תראה את ה-invoice החדש (1 ₪, paid)</li>
          <li>ב-/admin/users/[שלך] — סטטוס מנוי = active, יש token שמור</li>
          <li>החיוב הבא — בעוד 30 ימים אוטומטית (cron עוד לא מוגדר — Commit 2)</li>
        </ul>
      </div>

      <Link
        href="/admin/payments"
        className="inline-flex items-center gap-1 text-sm text-brand-300 hover:text-brand-200"
      >
        <ChevronLeft className="h-4 w-4" />
        חזרה ל-/admin/payments
      </Link>
    </div>
  );
}
