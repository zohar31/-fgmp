-- Crypto prepaid plans + subscription paid-through date.
-- Adds admin-managed prepaid packages (paid in USDT/USDC) alongside the
-- existing $99/mo Tranzila card plan. Idempotent (IF NOT EXISTS / guarded seed).

ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "paidUntil" timestamp;

CREATE TABLE IF NOT EXISTS "crypto_plans" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "months" integer NOT NULL,
  "priceUsd" integer NOT NULL,
  "label" text,
  "badge" text,
  "active" boolean NOT NULL DEFAULT true,
  "sortOrder" integer NOT NULL DEFAULT 0,
  "createdAt" timestamp NOT NULL DEFAULT now(),
  "updatedAt" timestamp NOT NULL DEFAULT now()
);

-- Seed the default prepaid packages (only if the table is empty).
INSERT INTO "crypto_plans" ("months", "priceUsd", "label", "badge", "active", "sortOrder")
SELECT * FROM (VALUES
  (3,  267, '3 months',  'Save 10%', true, 1),
  (6,  499, '6 months',  'Save 16%', true, 2),
  (12, 948, '12 months', 'Save 20%', true, 3)
) AS v(months, "priceUsd", label, badge, active, "sortOrder")
WHERE NOT EXISTS (SELECT 1 FROM "crypto_plans");
