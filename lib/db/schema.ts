import {
  pgTable,
  text,
  timestamp,
  primaryKey,
  integer,
  boolean,
  pgEnum,
  uuid,
  serial,
  time,
  index,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const accounts = pgTable(
  "accounts",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [primaryKey({ columns: [account.provider, account.providerAccountId] })]
);

export const sessions = pgTable("sessions", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })]
);

export const subscriptionStatus = pgEnum("subscription_status", [
  "pending_setup",
  "pending_activation",
  "trial_active",
  "active",
  "cancelled",
  "expired",
]);

export const subscriptions = pgTable("subscriptions", {
  userId: text("userId")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  status: subscriptionStatus("status").notNull().default("pending_setup"),
  activationToken: text("activationToken").unique().notNull(),
  trialStartedAt: timestamp("trialStartedAt", { mode: "date" }),
  trialEndsAt: timestamp("trialEndsAt", { mode: "date" }),
  activatedAt: timestamp("activatedAt", { mode: "date" }),
  activatedFromPhone: text("activatedFromPhone"),
  suspendedAt: timestamp("suspendedAt", { mode: "date" }),
  suspendedReason: text("suspendedReason"),
  lastReminderAt: timestamp("lastReminderAt", { mode: "date" }),
  cancelledAt: timestamp("cancelledAt", { mode: "date" }),
  cancellationReason: text("cancellationReason"),
  // Tranzila billing fields
  tranzilaToken: text("tranzilaToken"),
  tranzilaTokenExpiry: text("tranzilaTokenExpiry"), // YYMM
  tranzilaCardLast4: text("tranzilaCardLast4"),
  tranzilaCardBrand: text("tranzilaCardBrand"),
  firstPaymentAt: timestamp("firstPaymentAt", { mode: "date" }),
  cancelAtPeriodEnd: boolean("cancelAtPeriodEnd").notNull().default(false),
  lastPaymentAt: timestamp("lastPaymentAt", { mode: "date" }),
  nextChargeAt: timestamp("nextChargeAt", { mode: "date" }),
  failedChargeCount: integer("failedChargeCount").notNull().default(0),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

export const businessSettings = pgTable("business_settings", {
  userId: text("userId")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  businessName: text("businessName"),
  contactName: text("contactName"),
  vatId: text("vatId"),
  contactEmail: text("contactEmail"),
  leadPhone: text("leadPhone"),
  niche: text("niche"),
  serviceAreas: text("serviceAreas"),
  keywords: text("keywords"),
  hoursStart: time("hoursStart"),
  hoursEnd: time("hoursEnd"),
  description: text("description"),
  telegramUsername: text("telegramUsername"),
  // AI filter — enabled by default for every new customer
  aiFilterEnabled: boolean("aiFilterEnabled").notNull().default(true),
  aiPositiveExamples: text("aiPositiveExamples"),
  aiNegativeExamples: text("aiNegativeExamples"),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

export const notificationType = pgEnum("notification_type", [
  "info",
  "success",
  "warning",
  "billing",
  "system",
]);

export const notifications = pgTable(
  "notifications",
  {
    id: serial("id").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: notificationType("type").notNull().default("info"),
    title: text("title").notNull(),
    body: text("body"),
    read: boolean("read").notNull().default(false),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  },
  (table) => [index("notifications_userId_idx").on(table.userId, table.createdAt)]
);

export const invoiceStatus = pgEnum("invoice_status", [
  "pending",
  "paid",
  "failed",
  "refunded",
]);

export const invoices = pgTable(
  "invoices",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    amount: integer("amount").notNull(),
    currency: text("currency").notNull().default("ILS"),
    status: invoiceStatus("status").notNull().default("pending"),
    issuedAt: timestamp("issuedAt", { mode: "date" }).notNull().defaultNow(),
    paidAt: timestamp("paidAt", { mode: "date" }),
    pdfUrl: text("pdfUrl"),
    providerInvoiceId: text("providerInvoiceId"),
    // Tranzila transaction details
    tranzilaIndex: text("tranzilaIndex"),
    tranzilaConfirmationCode: text("tranzilaConfirmationCode"),
    tranzilaResponseCode: text("tranzilaResponseCode"),
    tranzilaResponseMessage: text("tranzilaResponseMessage"),
    paymentMethod: text("paymentMethod"), // 'credit_card' | 'bit' | etc.
    isRecurring: boolean("isRecurring").notNull().default(false),
  },
  (table) => [index("invoices_userId_idx").on(table.userId, table.issuedAt)]
);

export const signupIntents = pgTable("signup_intents", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  businessName: text("businessName").notNull(),
  whatsapp: text("whatsapp").notNull(),
  service: text("service").notNull(),
  ip: text("ip"),
  userAgent: text("userAgent"),
  linkedUserId: text("linkedUserId").references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

// extension pushes — אדמין לוחץ "שלח לתוסף" → שורה כאן
// התוסף ב-VPS פולל endpoint שמחזיר את כל ה-pendings, ומאשר עם /ack
export const extensionPushStatus = pgEnum("extension_push_status", [
  "pending",
  "delivered",
  "failed",
]);

export const extensionPushes = pgTable(
  "extension_pushes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    pushedByAdminId: text("pushedByAdminId").references(() => users.id, {
      onDelete: "set null",
    }),
    pushedAt: timestamp("pushedAt", { mode: "date" }).notNull().defaultNow(),
    ackAt: timestamp("ackAt", { mode: "date" }),
    status: extensionPushStatus("status").notNull().default("pending"),
    errorMessage: text("errorMessage"),
  },
  (t) => [
    index("extension_pushes_status_idx").on(t.status, t.pushedAt),
    index("extension_pushes_user_idx").on(t.userId, t.pushedAt),
  ]
);

// ─────────────────────────────────────────────────────────
// Agent — phone verification + sessions + audit log
// ─────────────────────────────────────────────────────────
//
// The website agent verifies subscribers via a 5-digit code sent to their
// leadPhone (via wa-server). Once verified, an agent_sessions row is created
// (30 min TTL). Every tool the agent invokes is logged to agent_actions.

export const phoneVerifications = pgTable(
  "phone_verifications",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    phone: text("phone").notNull(),
    codeHash: text("codeHash").notNull(), // bcrypt of the 5-digit code
    expiresAt: timestamp("expiresAt", { mode: "date" }).notNull(),
    attempts: integer("attempts").notNull().default(0),
    verifiedAt: timestamp("verifiedAt", { mode: "date" }),
    blockedUntil: timestamp("blockedUntil", { mode: "date" }),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  },
  (t) => [
    index("phone_verifications_phone_idx").on(t.phone, t.createdAt),
  ]
);

export const agentSessions = pgTable(
  "agent_sessions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    phone: text("phone").notNull(),
    expiresAt: timestamp("expiresAt", { mode: "date" }).notNull(),
    lastUsedAt: timestamp("lastUsedAt", { mode: "date" }).notNull().defaultNow(),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  },
  (t) => [
    index("agent_sessions_user_idx").on(t.userId, t.expiresAt),
  ]
);

export const agentActions = pgTable(
  "agent_actions",
  {
    id: serial("id").primaryKey(),
    sessionId: uuid("sessionId"),
    userId: text("userId"),
    toolName: text("toolName").notNull(),
    args: text("args"), // JSON string
    result: text("result"), // JSON string
    error: text("error"),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  },
  (t) => [
    index("agent_actions_user_idx").on(t.userId, t.createdAt),
    index("agent_actions_tool_idx").on(t.toolName, t.createdAt),
  ]
);

export const cancellationRequestStatus = pgEnum("cancellation_request_status", [
  "pending",
  "cancelled_only",
  "cancelled_and_refunded",
  "rejected",
]);

export const cancellationRequests = pgTable(
  "cancellation_requests",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    reason: text("reason"),
    requestedAt: timestamp("requestedAt", { mode: "date" }).notNull().defaultNow(),
    status: cancellationRequestStatus("status").notNull().default("pending"),
    processedAt: timestamp("processedAt", { mode: "date" }),
    processedByAdminId: text("processedByAdminId").references(() => users.id, {
      onDelete: "set null",
    }),
    adminNotes: text("adminNotes"),
    refundedInvoiceId: uuid("refundedInvoiceId"),
    wasRefundEligible: boolean("wasRefundEligible").notNull().default(false),
  },
  (t) => [
    index("cancellation_requests_status_idx").on(t.status, t.requestedAt),
    index("cancellation_requests_user_idx").on(t.userId, t.requestedAt),
  ]
);

export const pageViews = pgTable(
  "page_views",
  {
    id: serial("id").primaryKey(),
    path: text("path").notNull(),
    referrer: text("referrer"),
    referrerDomain: text("referrerDomain"),
    utmSource: text("utmSource"),
    utmMedium: text("utmMedium"),
    utmCampaign: text("utmCampaign"),
    fingerprint: text("fingerprint"),
    country: text("country"),
    device: text("device"),
    browser: text("browser"),
    os: text("os"),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  },
  (t) => [
    index("page_views_createdAt_idx").on(t.createdAt),
    index("page_views_path_idx").on(t.path),
    index("page_views_fingerprint_idx").on(t.fingerprint, t.createdAt),
  ]
);
