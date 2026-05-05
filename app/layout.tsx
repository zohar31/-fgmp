import type { Metadata, Viewport } from "next";
import { Heebo, Assistant } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Tracker } from "@/components/Tracker";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";
import "./globals.css";
import { SITE } from "@/lib/config";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/jsonld";

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
  metadataBase: new URL(SITE.url),
  title: {
    default: `לידים מקבוצות פייסבוק בוואטסאפ — מערכת AI אוטומטית | ${SITE.brand}`,
    template: `%s | לידים בוואטסאפ — ${SITE.brand}`,
  },
  description: SITE.descriptions.meta,
  keywords: [
    // Core leads keywords
    "לידים",
    "ליד",
    "לידים מפייסבוק",
    "לידים מקבוצות פייסבוק",
    "ליד מפייסבוק",
    "לידים חמים",
    "ליד חם",
    "לידים אוטומטיים",
    "ליד אוטומטי",
    "לידים בוואטסאפ",
    "ליד חם בוואטסאפ",
    "לידים בטלגרם",
    "לידים בעברית",
    "לידים בזמן אמת",
    "לידים אורגניים",
    "לידים אורגניים מפייסבוק",
    // System / generation
    "מערכת לידים",
    "מערכת לידים אוטומטית",
    "מערכת לידים לעסקים",
    "אוטומציית לידים",
    "הזרמת לידים",
    "ייצור לידים",
    "ייצור לידים אוטומטי",
    "בוט לידים",
    "סוכן לידים",
    "AI לידים",
    "לידים בעזרת AI",
    "לידים מבינה מלאכותית",
    // Long-tail intent
    "איך להשיג לידים",
    "איך משיגים לידים",
    "איך לקבל לידים",
    "איך מקבלים לידים בפייסבוק",
    "איך לקבל לידים חמים",
    "איפה למצוא לידים",
    "לידים זולים",
    "לידים בלי פרסום ממומן",
    "לידים אורגניים מול ממומנים",
    "לידים מול Facebook Lead Ads",
    "מערכת לידים בישראל",
    "לידים לעסק קטן",
    "לידים לעצמאים",
    "לידים לבעלי מקצוע",
    // Industries (high-intent commercial)
    "לידים לשיפוצניק",
    "לידים לעורך דין",
    "לידים לסוכן ביטוח",
    "לידים לקוסמטיקאית",
    "לידים לצלם",
    "לידים למנעולן",
    "לידים להנדימן",
    // Facebook scanning
    "קבוצות פייסבוק",
    "סריקת קבוצות פייסבוק",
    "סורק קבוצות פייסבוק",
    "מעקב אחרי קבוצות פייסבוק",
    "ניטור קבוצות פייסבוק",
    "AI לעסקים",
    "FGMP",
    "צח אור",
  ],
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: SITE.url,
    siteName: SITE.brand,
    title: `מערכת לידים אוטומטית מקבוצות פייסבוק לוואטסאפ — ${SITE.brand}`,
    description: SITE.descriptions.og,
    images: [
      {
        url: "/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: `לידים מקבוצות פייסבוק לוואטסאפ או טלגרם — ${SITE.brand}`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `מערכת לידים אוטומטית מקבוצות פייסבוק לוואטסאפ — ${SITE.brand}`,
    description: SITE.descriptions.og,
    images: ["/og-image.jpeg"],
  },
  robots: { index: true, follow: true },
  verification: {
    google: "t1VDu0yboLSuMl6plLXEcaHCzLxi-hnPaMzjQ2Ap24Y",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0d1c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${assistant.variable}`}>
      <head>
        {gtmId && (
          <Script id="gtm" strategy="afterInteractive">{`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}</Script>
        )}
        {pixelId && (
          <Script id="meta-pixel" strategy="afterInteractive">{`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}'); fbq('track', 'PageView');
          `}</Script>
        )}
      </head>
      <body className="min-h-screen bg-bg bg-grad-hero">
        <a href="#main-content" className="a11y-skip">דלג לתוכן הראשי</a>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
        <AccessibilityWidget />
        <Suspense fallback={null}>
          <Tracker />
        </Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
