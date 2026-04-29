import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #8b5cf6, #25D366)",
          color: "white",
          fontSize: 100,
          fontWeight: 800,
          letterSpacing: "-0.05em",
        }}
      >
        F
      </div>
    ),
    { ...size }
  );
}
