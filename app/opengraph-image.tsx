import { ImageResponse } from "next/og";
import { SITE } from "@/lib/config";

export const runtime = "edge";
export const alt = `לידים מקבוצות פייסבוק לוואטסאפ או טלגרם — ${SITE.brand}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// satori לא תומך באלגוריתם BiDi של Unicode. הפתרון המוכר: להפוך ידנית טקסט עברי
// לפני העברה ל-renderer, כך שיראה תקין בתמונה הסופית
function rev(s: string): string {
  return s.split("").reverse().join("");
}

// טוען פונט שתומך בעברית — Heebo Bold מ-Google Fonts
async function loadHebrewFont() {
  const css = await fetch(
    "https://fonts.googleapis.com/css2?family=Heebo:wght@800&display=swap",
    { headers: { "User-Agent": "Mozilla/5.0" } }
  ).then((r) => r.text());
  const url = css.match(/src: url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/)?.[1];
  if (!url) throw new Error("Heebo font URL not found");
  return fetch(url).then((r) => r.arrayBuffer());
}

export default async function Image() {
  const heebo = await loadHebrewFont();
  return new ImageResponse(
    (
      <div
        lang="he"
        dir="rtl"
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0a0d1c 0%, #1a1f3a 50%, #0a2e1f 100%)",
          padding: "80px",
          position: "relative",
          direction: "rtl",
          fontFamily: "Heebo",
        }}
      >
        {/* gradient orbs */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-200px",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(139,92,246,0.4), transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-200px",
            left: "-200px",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(37,211,102,0.3), transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "44px",
            fontWeight: 800,
            color: "white",
            letterSpacing: "-0.02em",
            fontFamily: "Heebo",
          }}
        >
          {SITE.brand}
        </div>

        {/* main heading */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            marginTop: "40px",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              fontSize: "76px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              fontFamily: "Heebo",
              direction: "rtl",
              textAlign: "right",
              display: "flex",
            }}
          >
            {rev("לידים מקבוצות פייסבוק")}
          </div>
          <div
            style={{
              fontSize: "76px",
              fontWeight: 800,
              background: "linear-gradient(90deg, #c4b5fd, #25D366)",
              backgroundClip: "text",
              color: "transparent",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginTop: "12px",
              fontFamily: "Heebo",
              direction: "rtl",
              textAlign: "right",
              display: "flex",
            }}
          >
            {rev("ישירות לוואטסאפ וטלגרם")}
          </div>
          <div
            style={{
              fontSize: "32px",
              color: "#cbd5e1",
              marginTop: "32px",
              lineHeight: 1.4,
              fontFamily: "Heebo",
              direction: "rtl",
              textAlign: "right",
              display: "flex",
            }}
          >
            {rev("מערכת AI שסורקת 24/7 ושולחת לידים בזמן אמת")}
          </div>
        </div>

        {/* footer pills */}
        <div style={{ display: "flex", gap: "16px", alignItems: "center", flexDirection: "row-reverse" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 24px",
              background: "rgba(37,211,102,0.15)",
              border: "1px solid rgba(37,211,102,0.4)",
              borderRadius: "9999px",
              fontSize: "26px",
              color: "#25D366",
              fontWeight: 600,
              fontFamily: "Heebo",
            }}
          >
            {rev("7 ימי ניסיון חינם")}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 24px",
              background: "rgba(139,92,246,0.15)",
              border: "1px solid rgba(139,92,246,0.4)",
              borderRadius: "9999px",
              fontSize: "26px",
              color: "#c4b5fd",
              fontWeight: 600,
              fontFamily: "Heebo",
            }}
          >
            {rev("ללא כרטיס אשראי")}
          </div>
          <div
            style={{
              marginRight: "auto",
              fontSize: "26px",
              color: "#94a3b8",
              fontFamily: "Heebo",
            }}
          >
            {SITE.domain}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Heebo", data: heebo, style: "normal", weight: 800 },
      ],
    }
  );
}
