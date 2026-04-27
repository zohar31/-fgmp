import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0a0d1c",
          soft: "#0f1428",
          card: "#141a33",
          ring: "#1d2545",
        },
        brand: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        wa: {
          DEFAULT: "#25D366",
          dark: "#1da851",
          light: "#4ae085",
        },
        ink: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
        },
      },
      fontFamily: {
        sans: ["var(--font-heebo)", "system-ui", "sans-serif"],
        display: ["var(--font-assistant)", "var(--font-heebo)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grad-hero":
          "radial-gradient(1200px 600px at 50% -10%, rgba(139,92,246,0.25), transparent 60%), radial-gradient(800px 400px at 90% 20%, rgba(37,211,102,0.12), transparent 60%)",
        "grad-card":
          "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(139,92,246,0.35), 0 20px 60px -15px rgba(139,92,246,0.45)",
        "glow-wa": "0 0 0 1px rgba(37,211,102,0.35), 0 20px 60px -15px rgba(37,211,102,0.45)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease-out both",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
