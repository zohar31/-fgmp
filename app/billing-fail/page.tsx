import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "התשלום נכשל · FGMP",
  robots: { index: false, follow: false },
};

export default function BillingFailPage() {
  return (
    <main className="container-x flex min-h-screen flex-col items-center justify-center py-12">
      <div className="mb-8 flex justify-center">
        <Logo />
      </div>
      <div className="card w-full max-w-lg border-l-4 border-rose-500 p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <AlertCircle className="h-16 w-16 text-rose-400" />
          <h1 className="font-display text-3xl font-extrabold text-white">
            התשלום לא הצליח
          </h1>
          <p className="max-w-md leading-7 text-ink-200">
            הסליקה לא בוצעה. ייתכן שהכרטיס סורב, פג תוקפו, או שיש בעיה זמנית.
            אפשר לנסות שוב בלחיצה אחת.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Link href="/account/billing" className="btn-wa">
              נסה שוב
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <a
              href="https://wa.me/972585222227?text=היי, יש לי בעיה בתשלום"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              דבר איתנו בוואטסאפ
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
