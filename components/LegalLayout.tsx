import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { AIAgent } from "./AIAgent";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="py-16 md:py-24">
        <div className="container-x">
          <article className="mx-auto max-w-3xl">
            <header className="mb-10 border-b border-white/10 pb-8">
              <h1 className="font-display text-4xl font-extrabold text-white sm:text-5xl">
                {title}
              </h1>
              <p className="mt-3 text-sm text-ink-400">עודכן לאחרונה: {updated}</p>
            </header>
            <div className="prose prose-invert max-w-none text-ink-200 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:leading-8 [&_p]:my-3 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pr-6 [&_li]:my-1 [&_a]:text-brand-300 [&_a]:underline">
              {children}
            </div>
          </article>
        </div>
      </main>
      <Footer />
      <AIAgent />
    </>
  );
}
