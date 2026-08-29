import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="grid min-h-[60vh] place-items-center">
        <div className="container-x text-center">
          <div className="font-display text-7xl font-extrabold gradient-text">404</div>
          <h1 className="mt-4 font-display text-3xl font-bold text-white">
            הדף לא נמצא
          </h1>
          <p className="mt-2 text-ink-300">
            הקישור שגוי או שהדף הוסר.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/" className="btn-brand inline-flex">
              חזרה לעמוד הבית
            </Link>
            <Link href="/en" className="btn-ghost inline-flex" dir="ltr">
              English home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
