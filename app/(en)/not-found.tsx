import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function NotFoundEn() {
  return (
    <div dir="ltr">
      <Nav />
      <main className="grid min-h-[60vh] place-items-center">
        <div className="container-x text-center">
          <div className="font-display text-7xl font-extrabold gradient-text">404</div>
          <h1 className="mt-4 font-display text-3xl font-bold text-white">Page not found</h1>
          <p className="mt-2 text-ink-300">The link is broken or the page has been removed.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/en" className="btn-brand inline-flex">
              Back to home
            </Link>
            <Link href="/" className="btn-ghost inline-flex" dir="rtl">
              לעמוד הבית בעברית
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
