import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AIAgent } from "@/components/AIAgent";
import { SITE, waLink } from "@/lib/config";

export const metadata: Metadata = {
  title: "תודה — קיבלנו את הפרטים שלך",
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <>
      <Nav />
      <main className="min-h-[70vh] py-20">
        <div className="container-x">
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-wa/10 ring-1 ring-wa/30">
              <CheckCircle2 className="h-10 w-10 text-wa" />
            </div>
            <h1 className="font-display text-4xl font-extrabold text-white sm:text-5xl text-balance">
              קיבלנו! 🎉
            </h1>
            <p className="mt-4 text-lg leading-8 text-ink-200">
              הפרטים שלך נשמרו אצלנו. נחזור אליך בוואטסאפ תוך זמן קצר עם הסבר על הצעדים הבאים
              ועם תחילת תקופת ה-{SITE.pricing.trialDays} ימים החינמיים.
            </p>

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href={waLink("היי, נרשמתי באתר ואני רוצה להתחיל")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa text-base"
              >
                <MessageCircle className="h-5 w-5" />
                שלח לנו וואטסאפ עכשיו
              </a>
              <Link href="/" className="btn-ghost text-base">
                חזרה לאתר
              </Link>
            </div>

            <p className="mt-10 text-sm text-ink-400">
              תוך כדי שאתה ממתין — בדוק את שאלות הנפוצות, או דבר עם הסוכן החכם שלנו בפינת המסך.
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <AIAgent />
    </>
  );
}
