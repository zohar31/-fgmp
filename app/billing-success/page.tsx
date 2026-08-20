import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/Logo";
import { getServerLocale } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: "התשלום בוצע · FGMP",
  robots: { index: false, follow: false },
};

export default async function BillingSuccessPage() {
  const en = (await getServerLocale()) === "en";
  return (
    <main className="container-x flex min-h-screen flex-col items-center justify-center py-12" dir={en ? "ltr" : "rtl"}>
      <div className="mb-8 flex justify-center">
        <Logo />
      </div>
      <div className="card w-full max-w-lg border-l-4 border-wa p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <CheckCircle2 className="h-16 w-16 text-wa" />
          <h1 className="font-display text-3xl font-extrabold text-white">
            {en ? "Payment successful ✓" : "התשלום בוצע בהצלחה ✓"}
          </h1>
          <p className="max-w-md leading-7 text-ink-200">
            {en
              ? "Thank you! Your subscription is active. The next charge runs automatically in a month. You'll get a WhatsApp message before every charge."
              : "תודה! המנוי שלך פעיל. החיוב הבא יתבצע אוטומטית בעוד חודש. תקבל הודעה בוואטסאפ לפני כל חיוב."}
          </p>
          <p className="text-xs text-ink-400">
            {en
              ? "(You may be asked to sign in again for security reasons — that's normal)"
              : "(ייתכן שתידרש להתחבר שוב מסיבות אבטחה — זה תקין)"}
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Link href="/account/billing" className="btn-wa">
              {en ? "Subscription details" : "לפרטי המנוי"}
              <ArrowLeft className={`h-4 w-4 ${en ? "rotate-180" : ""}`} />
            </Link>
            <Link href={en ? "/en" : "/"} className="btn-ghost">
              {en ? "Home" : "לעמוד הבית"}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
