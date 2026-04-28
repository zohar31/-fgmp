import Link from "next/link";
import { Logo } from "./Logo";
import { SITE, waLink } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-bg-soft/50">
      <div className="container-x py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs leading-7 text-ink-300">
              מערכת AI לאיתור לידים מקבוצות פייסבוק — ישירות לוואטסאפ של העסק שלך.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-white">ניווט</h4>
            <ul className="mt-4 space-y-2 text-sm text-ink-300">
              <li><a href="#how" className="hover:text-white">איך זה עובד</a></li>
              <li><a href="#who" className="hover:text-white">למי זה מתאים</a></li>
              <li><a href="#pricing" className="hover:text-white">מחיר</a></li>
              <li><a href="#faq" className="hover:text-white">שאלות נפוצות</a></li>
              <li><a href="/login" className="hover:text-white">הרשמה</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white">משפטי ופנייה</h4>
            <ul className="mt-4 space-y-2 text-sm text-ink-300">
              <li>
                <Link href="/terms" className="hover:text-white">
                  תקנון
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  מדיניות פרטיות
                </Link>
              </li>
              <li>
                <a
                  href={waLink("היי, יש לי שאלה")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  וואטסאפ: 058-5222227
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 text-xs text-ink-400 sm:flex-row sm:items-center">
          <div>
            © {new Date().getFullYear()} כל הזכויות שמורות לצח אור.
          </div>
          <div>{SITE.domain}</div>
        </div>
      </div>
    </footer>
  );
}
