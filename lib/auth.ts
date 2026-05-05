import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db, schema } from "./db";
import { eq } from "drizzle-orm";
import { generateActivationToken } from "./activation-token";
import { sendLeadEvent, isConfigured as isCapiConfigured } from "./meta-capi";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: schema.users,
    accountsTable: schema.accounts,
    sessionsTable: schema.sessions,
    verificationTokensTable: schema.verificationTokens,
  }),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      if (!user.id || !user.email) return;

      const now = new Date();

      // New money-back-guarantee model: no free trial. Customer creates
      // account → fills settings → pays 299₪ → gets 7-day full-refund window
      // anchored on firstPaymentAt. trialStartedAt/trialEndsAt left null;
      // the columns remain in the schema for backward compatibility with
      // legacy users who signed up before this change.
      await db.insert(schema.subscriptions).values({
        userId: user.id,
        status: "pending_setup",
        activationToken: generateActivationToken(),
      });

      const intent = await db.query.signupIntents.findFirst({
        where: eq(schema.signupIntents.email, user.email),
        orderBy: (t, { desc }) => [desc(t.createdAt)],
      });

      await db.insert(schema.businessSettings).values({
        userId: user.id,
        businessName: intent?.businessName ?? null,
        contactEmail: user.email,
        leadPhone: intent?.whatsapp ?? null,
        description: intent?.service ?? null,
      });

      if (intent) {
        await db
          .update(schema.signupIntents)
          .set({ linkedUserId: user.id })
          .where(eq(schema.signupIntents.id, intent.id));
      }

      await db.insert(schema.notifications).values({
        userId: user.id,
        type: "info",
        title: "ברוכים הבאים ל-FGMP! 🎉",
        body: "השלימו את הגדרות העסק והתשלום באזור האישי כדי להתחיל לקבל לידים. ערבות החזר מלא 7 ימים — אם לא מרוצים, מקבלים את הכסף בחזרה.",
      });

      // Meta CAPI — שולח אירוע Lead לאופטימיזציה של קמפיינים
      // לא חוסם את הרישום במקרה של כשל
      if (isCapiConfigured()) {
        const [firstName, ...rest] = (user.name || "").split(/\s+/);
        sendLeadEvent({
          email: user.email,
          phone: intent?.whatsapp,
          firstName: firstName || null,
          lastName: rest.join(" ") || null,
          externalId: user.id,
          eventSourceUrl: "https://fgmp.net/login",
          eventId: `signup_${user.id}_${now.getTime()}`,
        })
          .then((r) => {
            if (!r.ok) console.warn("[meta-capi] lead event failed:", r.error);
          })
          .catch((e) => console.warn("[meta-capi] lead event error:", e));
      }
    },
  },
});
