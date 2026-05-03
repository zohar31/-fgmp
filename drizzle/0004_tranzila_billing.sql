-- Tranzila billing — subscription token + invoice transaction details
-- Idempotent

ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "tranzilaToken" text;
ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "tranzilaTokenExpiry" text;
ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "tranzilaCardLast4" text;
ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "tranzilaCardBrand" text;
ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "lastPaymentAt" timestamp;
ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "nextChargeAt" timestamp;
ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "failedChargeCount" integer NOT NULL DEFAULT 0;

ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "tranzilaIndex" text;
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "tranzilaConfirmationCode" text;
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "tranzilaResponseCode" text;
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "tranzilaResponseMessage" text;
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "paymentMethod" text;
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "isRecurring" boolean NOT NULL DEFAULT false;
