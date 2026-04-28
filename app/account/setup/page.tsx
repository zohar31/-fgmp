import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { SetupForm } from "./SetupForm";

export const metadata: Metadata = { title: "הגדרות עסק" };

export default async function SetupPage() {
  const session = await auth();
  const userId = session!.user.id;

  const [settings, user] = await Promise.all([
    db.query.businessSettings.findFirst({
      where: eq(schema.businessSettings.userId, userId),
    }),
    db.query.users.findFirst({ where: eq(schema.users.id, userId) }),
  ]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-extrabold text-white">
          הגדרות העסק
        </h1>
        <p className="mt-2 text-ink-300">
          מלא/י את הפרטים — אלה הפרטים שיישלחו למערכת בעת הפעלת ה-WhatsApp.
        </p>
      </header>

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
          hoursStart: settings?.hoursStart ?? null,
          hoursEnd: settings?.hoursEnd ?? null,
          description: settings?.description ?? null,
        }}
      />
    </div>
  );
}
