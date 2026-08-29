import type { Metadata } from "next";
import { Heebo, Assistant } from "next/font/google";
import "./globals.css";

// Global 404 — catches EVERY unmatched URL across the whole app, regardless of
// route group / root layout (he or en). Because the app has multiple root
// layouts (app/(he) and app/(en), no single app/layout.tsx), a normal
// not-found can't wrap unmatched routes; global-not-found renders its own full
// document. Enabled via experimental.globalNotFound in next.config.
// Bilingual on purpose: a stray link from either language lands here and gets a
// clear home button in both Hebrew and English.

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});
const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  variable: "--font-assistant",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "404 — הדף לא נמצא · Page not found | FGMP",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${assistant.variable}`}>
      <body className="min-h-screen bg-bg bg-grad-hero">
        <main className="grid min-h-screen place-items-center px-4">
          <div className="container-x text-center">
            <div className="font-display text-7xl font-extrabold gradient-text">404</div>

            <h1 className="mt-4 font-display text-3xl font-bold text-white">
              הדף לא נמצא
            </h1>
            <p className="mt-1 text-ink-300">הקישור שגוי או שהדף הוסר.</p>

            <div className="mx-auto my-5 h-px w-24 bg-white/10" />

            <h2 className="font-display text-2xl font-bold text-white" dir="ltr">
              Page not found
            </h2>
            <p className="mt-1 text-ink-300" dir="ltr">
              The link is broken or the page has been removed.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="/" className="btn-brand inline-flex">
                לעמוד הבית
              </a>
              <a href="/en" className="btn-brand inline-flex" dir="ltr">
                Home page
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
