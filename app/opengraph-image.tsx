import { ImageResponse } from "next/og";
import { SITE } from "@/lib/config";

export const runtime = "edge";
export const alt = `${SITE.brand} — לידים מקבוצות פייסבוק ישירות לוואטסאפ`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0a0d1c 0%, #1a1f3a 50%, #0a2e1f 100%)",
          padding: "80px",
          position: "relative",
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
          }}
        >
          <div
            style={{
              fontSize: "76px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            לידים מקבוצות פייסבוק
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
            }}
          >
            ישירות ל-WhatsApp ו-Telegram
          </div>
          <div
            style={{
              fontSize: "32px",
              color: "#cbd5e1",
              marginTop: "32px",
              lineHeight: 1.4,
            }}
          >
            מערכת AI שסורקת 24/7 ושולחת לידים בזמן אמת
          </div>
        </div>

        {/* footer pills */}
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
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
            }}
          >
            7 ימי ניסיון חינם
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
            }}
          >
            ללא כרטיס אשראי
          </div>
          <div
            style={{
              marginLeft: "auto",
              fontSize: "26px",
              color: "#94a3b8",
            }}
          >
            {SITE.domain}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
