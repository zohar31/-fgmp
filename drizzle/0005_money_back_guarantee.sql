-- Money-back guarantee model + admin-mediated cancellation requests
-- Idempotent

-- Track when the customer's first paid charge happened — anchor for the
-- 7-day refund window.
ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "firstPaymentAt" timestamp;

-- After-window cancellations stay active until end of the paid month.
-- When true, the cron will not charge the next cycle and instead expire
-- the subscription when nextChargeAt is reached.
ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "cancelAtPeriodEnd" boolean NOT NULL DEFAULT false;

-- Cancellation requests: customer asks via /account/billing, admin reviews
-- and either cancels-only or cancels+refunds via Tranzila refund API.
DO $$ BEGIN
  CREATE TYPE "cancellation_request_status" AS ENUM
    ('pending', 'cancelled_only', 'cancelled_and_refunded', 'rejected');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "cancellation_requests" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" text NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "reason" text,
  "requestedAt" timestamp NOT NULL DEFAULT now(),
  "status" "cancellation_request_status" NOT NULL DEFAULT 'pending',
  "processedAt" timestamp,
  "processedByAdminId" text REFERENCES "users"("id") ON DELETE SET NULL,
  "adminNotes" text,
  "refundedInvoiceId" uuid,
  "wasRefundEligible" boolean NOT NULL DEFAULT false
);

CREATE INDEX IF NOT EXISTS "cancellation_requests_status_idx"
  ON "cancellation_requests" ("status", "requestedAt");
CREATE INDEX IF NOT EXISTS "cancellation_requests_user_idx"
  ON "cancellation_requests" ("userId", "requestedAt");
