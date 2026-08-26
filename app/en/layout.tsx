import type { Metadata } from "next";

// English (/en) subtree metadata. Overrides the root layout's Hebrew title
// template ("%s | לידים בוואטסאפ — FGMP") so English pages don't inherit a
// Hebrew branding suffix. `template: "%s"` passes each page's own title through
// unchanged (pages that want branding include it themselves).
export const metadata: Metadata = {
  title: {
    default: "FGMP — Facebook Group Leads, Straight to Your WhatsApp",
    template: "%s",
  },
};

// Layout for the English (/en) subtree. An early inline script flips
// <html lang/dir> to en/ltr during HTML parse — so every English page stays
// statically generated while still rendering as proper LTR English.
// The default <html lang="he" dir="rtl"> is set by the root layout.
export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html:
            "document.documentElement.lang='en';document.documentElement.dir='ltr';",
        }}
      />
      {children}
    </>
  );
}
