import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Home, MessageCircle } from "lucide-react";
import { Logo } from "@/components/Logo";
import { waLink } from "@/lib/config";
import { getServerLocale } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: "התשלום נכשל · FGMP",
  robots: { index: false, follow: false },
};

export default async function BillingFailPage() {
  const en = (await getServerLocale()) === "en";
  return (
    <main className="container-x flex min-h-screen flex-col items-center justify-center py-12" dir={en ? "ltr" : "rtl"}>
      <div className="mb-8 flex justify-center">
        <Logo />
      </div>
      <div className="card w-full max-w-lg border-l-4 border-rose-500 p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <AlertCircle className="h-16 w-16 text-rose-400" />
          <h1 className="font-display text-3xl font-extrabold text-white">
            {en ? "Payment didn't go through" : "התשלום לא הצליח"}
          </h1>
          <p className="max-w-md leading-7 text-ink-200">
            {en
              ? "The charge wasn't completed. The card may have been declined, expired, or there's a temporary issue. You can try again with one tap."
              : "הסליקה לא בוצעה. ייתכן שהכרטיס סורב, פג תוקפו, או שיש בעיה זמנית. אפשר לנסות שוב בלחיצה אחת."}
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Link href="/account/billing" className="btn-wa">
              {en ? "Try again" : "נסה שוב"}
              <ArrowLeft className={`h-4 w-4 ${en ? "rotate-180" : ""}`} />
            </Link>
            <a
              href={waLink(en ? "Hi, I have a problem with the payment on the site" : "היי, יש לי בעיה בתשלום באתר")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <MessageCircle className="h-4 w-4" />
              {en ? "Chat with us on WhatsApp" : "דבר איתנו בוואטסאפ"}
            </a>
          </div>
          <Link
            href={en ? "/en" : "/"}
            className="mt-2 inline-flex items-center gap-1 text-sm text-ink-300 hover:text-white"
          >
            <Home className="h-3.5 w-3.5" />
            {en ? "Back to home" : "חזרה לעמוד הבית"}
          </Link>
        </div>
      </div>
    </main>
  );
}
