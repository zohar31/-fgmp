import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "התשלום בוצע · FGMP",
  robots: { index: false, follow: false },
};

export default function BillingSuccessPage() {
  return (
    <main className="container-x flex min-h-screen flex-col items-center justify-center py-12">
      <div className="mb-8 flex justify-center">
        <Logo />
      </div>
      <div className="card w-full max-w-lg border-l-4 border-wa p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <CheckCircle2 className="h-16 w-16 text-wa" />
          <h1 className="font-display text-3xl font-extrabold text-white">
            התשלום בוצע בהצלחה ✓
          </h1>
          <p className="max-w-md leading-7 text-ink-200">
            תודה! המנוי שלך פעיל. החיוב הבא יתבצע אוטומטית בעוד חודש.
            תקבל הודעה בוואטסאפ לפני כל חיוב.
          </p>
          <p className="text-xs text-ink-400">
            (ייתכן שתידרש להתחבר שוב מסיבות אבטחה — זה תקין)
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Link href="/account/billing" className="btn-wa">
              לפרטי המנוי
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link href="/" className="btn-ghost">
              לעמוד הבית
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
