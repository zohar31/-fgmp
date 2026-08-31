import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { sendCustomerEmail, reminderEmailHtml } from "@/lib/email";
import { SITE, isEnglishCustomer } from "@/lib/config";

export const runtime = "nodejs";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const session = await auth();
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { userId } = await params;

  const [user, sub, settings] = await Promise.all([
    db.query.users.findFirst({ where: eq(schema.users.id, userId) }),
    db.query.subscriptions.findFirst({
      where: eq(schema.subscriptions.userId, userId),
    }),
    db.query.businessSettings.findFirst({
      where: eq(schema.businessSettings.userId, userId),
    }),
  ]);

  if (!user || !user.email) {
    return NextResponse.json({ error: "משתמש לא נמצא" }, { status: 404 });
  }
  if (!sub) {
    return NextResponse.json({ error: "מנוי לא נמצא" }, { status: 404 });
  }

  const name = user.name?.split(" ")[0] || settings?.contactName?.split(" ")[0] || "👋";

  // Send the reminder in the customer's language (English for US customers,
  // detected from their stored phone / service areas — same heuristic as the
  // in-app notifications).
  const en = isEnglishCustomer({
    leadPhone: settings?.leadPhone,
    serviceAreas: settings?.serviceAreas,
  });

  let subject: string;
  let headline: string;
  let body: string;
  let ctaUrl: string;
  let ctaLabel: string;

  if (sub.status === "pending_setup") {
    subject = en
      ? `Finish setting up ${SITE.brand} — just 2 minutes left`
      : `סיים את ההרשמה ל-${SITE.brand} — נשארו רק 2 דקות`;
    headline = en ? "Almost there — just your business details 🎯" : "כמעט שם — חסרים רק פרטי העסק 🎯";
    body = en
      ? "You opened an account but haven't filled in your business details yet. Without them we can't start scanning Facebook groups for you. It takes 2 minutes. Reminder — with a 3-day full money-back guarantee, zero risk."
      : "פתחת חשבון אבל עוד לא מילאת את פרטי העסק. בלי זה לא נוכל להתחיל לסרוק עבורך קבוצות פייסבוק. זה לוקח 2 דקות. נזכיר — עם ערבות החזר מלא 3 ימים, אפס סיכון.";
    ctaUrl = `${SITE.url}/account/setup`;
    ctaLabel = en ? "Complete your business settings" : "השלם את הגדרות העסק";
  } else if (sub.status === "pending_activation") {
    subject = en
      ? `One last step — activate WhatsApp on ${SITE.brand}`
      : `שלב אחד אחרון — הפעל את ה-WhatsApp ב-${SITE.brand}`;
    headline = en ? "The last step — activate WhatsApp ⚡" : "השלב האחרון — הפעלת WhatsApp ⚡";
    body = en
      ? "You filled in your business details, but haven't activated the WhatsApp channel yet. It's one click — and the system starts scanning and sending you leads."
      : "מילאת את פרטי העסק, אבל עדיין לא הפעלת את ערוץ ה-WhatsApp. זו לחיצה אחת — והמערכת מתחילה לסרוק ולשלוח לך לידים.";
    ctaUrl = `${SITE.url}/account/whatsapp`;
    ctaLabel = en ? "Activate WhatsApp" : "הפעל את WhatsApp";
  } else {
    return NextResponse.json(
      { error: "אין צורך בתזכורת — הסטטוס לא דורש זאת" },
      { status: 400 }
    );
  }

  const result = await sendCustomerEmail({
    to: user.email,
    subject,
    html: reminderEmailHtml({ name, ctaUrl, ctaLabel, headline, body, en }),
  });

  if (!result.sent) {
    return NextResponse.json(
      { error: "שליחת המייל נכשלה" },
      { status: 502 }
    );
  }

  await db
    .update(schema.subscriptions)
    .set({ lastReminderAt: new Date(), updatedAt: new Date() })
    .where(eq(schema.subscriptions.userId, userId));

  return NextResponse.json({ ok: true });
}
