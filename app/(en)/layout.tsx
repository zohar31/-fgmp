import type { Metadata, Viewport } from "next";
import { Heebo, Assistant } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Tracker } from "@/components/Tracker";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CookieNotice } from "@/components/CookieNotice";
import "../globals.css";
import { SITE } from "@/lib/config";
import { SITE_EN } from "@/lib/config-en";
import { JsonLd, organizationSchemaEn, websiteSchemaEn } from "@/lib/jsonld";

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

// English (/en) root layout. Serves real English server HTML —
// <html lang="en" dir="ltr"> — so crawlers see the English pages as English
// (the Hebrew root under app/(he) serves lang="he" dir="rtl"). `template: "%s"`
// passes each page's title through unchanged (pages brand themselves).
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.brand} — Facebook Group Leads, Straight to Your WhatsApp`,
    template: "%s",
  },
  description: SITE_EN.descriptions.meta,
  keywords: [
    "facebook group leads",
    "leads to whatsapp",
    "lead generation",
    "local business leads",
    "FGMP",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE.url}/en`,
    siteName: SITE.brand,
    title: `${SITE.brand} — Facebook Group Leads to WhatsApp`,
    description: SITE_EN.descriptions.og,
    images: [
      {
        url: "/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: `${SITE.brand} — Facebook group leads to WhatsApp`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.brand} — Facebook Group Leads to WhatsApp`,
    description: SITE_EN.descriptions.og,
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

export default function EnRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html lang="en" dir="ltr" className={`${heebo.variable} ${assistant.variable}`}>
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
        <a href="#main-content" className="a11y-skip">Skip to main content</a>
        <JsonLd data={organizationSchemaEn()} />
        <JsonLd data={websiteSchemaEn()} />
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
        <WhatsAppButton />
        <AccessibilityWidget />
        <CookieNotice />
        <Suspense fallback={null}>
          <Tracker />
        </Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
