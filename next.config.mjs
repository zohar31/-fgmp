/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    // Serve one dedicated bilingual 404 for every unmatched URL across both
    // root layouts (app/(he) and app/(en)) — see app/global-not-found.tsx.
    globalNotFound: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // ── מטריצת מקצוע × עיר הוסרה (ספטמבר 2026) ──────────────────────────
  // היו ~3,000 עמודים (48×40 עברית, 45×24 אנגלית) שנוצרו מתבנית אחת עם
  // החלפת שם עיר ומקצוע — Scaled content abuse + Doorway abuse לפי מדיניות
  // הספאם של גוגל. הם דיללו את האתר והורידו אמון מכלל הדומיין.
  // 301 (ולא 404) כדי שערך הקישורים והסיגנלים של אותם URL יתרכזו בעמוד
  // המקצוע, שנשאר ומכיל תוכן אמיתי.
  async redirects() {
    return [
      {
        source: "/lidim/:slug/:city",
        destination: "/lidim/:slug",
        permanent: true,
      },
      {
        source: "/en/leads/:profession/:city",
        destination: "/en/leads/:profession",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
