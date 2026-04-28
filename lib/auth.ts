import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db, schema } from "./db";
import { eq } from "drizzle-orm";
import { generateActivationToken } from "./activation-token";

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

      const trialDays = 7;
      const now = new Date();
      const trialEnds = new Date(now.getTime() + trialDays * 24 * 60 * 60 * 1000);

      await db.insert(schema.subscriptions).values({
        userId: user.id,
        status: "pending_setup",
        activationToken: generateActivationToken(),
        trialStartedAt: now,
        trialEndsAt: trialEnds,
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
        body: `קיבלתם ${trialDays} ימי ניסיון חינם. השלימו את ההגדרות באזור האישי כדי להתחיל לקבל לידים.`,
      });
    },
  },
});
