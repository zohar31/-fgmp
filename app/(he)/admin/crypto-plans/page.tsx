import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronLeft, Bitcoin } from "lucide-react";
import { db, schema } from "@/lib/db";
import { asc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { SITE_EN } from "@/lib/config-en";
import { CryptoPlansManager } from "./CryptoPlansManager";

export const dynamic = "force-dynamic";

export default async function AdminCryptoPlansPage() {
  const session = await auth();
  if (!isAdmin(session)) redirect("/account");

  const plans = await db
    .select()
    .from(schema.cryptoPlans)
    .orderBy(asc(schema.cryptoPlans.sortOrder));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="flex items-center gap-2 font-display text-3xl font-extrabold text-white">
          <Bitcoin className="h-7 w-7 text-amber-300" />
          חבילות קריפטו (prepaid)
        </h1>
        <p className="mt-2 text-ink-300">
          חבילות תשלום מראש ב-USDT/USDC — לצד המנוי החודשי הרגיל (${SITE_EN.pricing.monthlyUSD}/חודש
          בכרטיס). כאן שולטים על מספר החודשים, המחיר, תווית ההנחה, וסדר/הצגה. אין הוראת קבע בקריפטו,
          לכן הלקוח משלם תקופה מראש.
        </p>
      </header>

      <CryptoPlansManager
        plans={plans.map((p) => ({
          id: p.id,
          months: p.months,
          priceUsd: p.priceUsd,
          label: p.label,
          badge: p.badge,
          active: p.active,
          sortOrder: p.sortOrder,
        }))}
        monthlyUsd={SITE_EN.pricing.monthlyUSD}
      />

      <Link
        href="/admin"
        className="inline-flex items-center gap-1 text-sm text-brand-300 hover:text-brand-200"
      >
        <ChevronLeft className="h-4 w-4" />
        חזרה לדשבורד
      </Link>
    </div>
  );
}
