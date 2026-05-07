-- Tranzila Standing Order (My-Billing) ID — track which STO bills each subscription
-- Idempotent

ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "tranzilaStoId" text;
