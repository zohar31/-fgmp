import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { sendCustomerEmail, reminderEmailHtml } from "@/lib/email";
import { SITE } from "@/lib/config";

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

  let subject: string;
  let headline: string;
  let body: string;
  let ctaUrl: string;
  let ctaLabel: string;

  if (sub.status === "pending_setup") {
    subject = `סיים את ההרשמה ל-${SITE.brand} — נשארו רק 2 דקות`;
    headline = "כמעט שם — חסרים רק פרטי העסק 🎯";
    body =
      "התחלת ניסיון חינם של 7 ימים, אבל עוד לא מילאת את פרטי העסק שלך. בלי זה לא נוכל להתחיל לסרוק קבוצות פייסבוק עבורך. זה לוקח 2 דקות.";
    ctaUrl = `${SITE.url}/account/setup`;
    ctaLabel = "השלם את הגדרות העסק";
  } else if (sub.status === "pending_activation") {
    subject = `שלב אחד אחרון — הפעל את ה-WhatsApp ב-${SITE.brand}`;
    headline = "השלב האחרון — הפעלת WhatsApp ⚡";
    body =
      "מילאת את פרטי העסק, אבל עדיין לא הפעלת את ערוץ ה-WhatsApp. זו לחיצה אחת — והמערכת מתחילה לסרוק ולשלוח לך לידים.";
    ctaUrl = `${SITE.url}/account/whatsapp`;
    ctaLabel = "הפעל את WhatsApp";
  } else {
    return NextResponse.json(
      { error: "אין צורך בתזכורת — הסטטוס לא דורש זאת" },
      { status: 400 }
    );
  }

  const result = await sendCustomerEmail({
    to: user.email,
    subject,
    html: reminderEmailHtml({ name, ctaUrl, ctaLabel, headline, body }),
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
