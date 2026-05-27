import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-pretendard)", "system-ui", "sans-serif"],
        display: ["var(--font-black-han-sans)", "sans-serif"],
      },
      colors: {
        peach: {
          50: "#FFF7F3",
          100: "#FFEDE5",
          200: "#FFD6C4",
          300: "#FFB899",
          400: "#FF8F66",
          500: "#FF6B3D",
          600: "#F05525",
        },
        mint: {
          50: "#F0FDF9",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
        },
        honey: {
          50: "#FFFDF0",
          100: "#FFF9DB",
          200: "#FFF3BF",
          300: "#FFEC99",
          400: "#FFE066",
          500: "#FFD43B",
        },
        ink: {
          50: "#F8F9FA",
          100: "#F1F3F5",
          200: "#E9ECEF",
          300: "#DEE2E6",
          400: "#ADB5BD",
          500: "#868E96",
          600: "#495057",
          700: "#343A40",
          800: "#212529",
        },
      },
      boxShadow: {
        soft: "0 2px 20px rgba(0, 0, 0, 0.06)",
        card: "0 4px 24px rgba(0, 0, 0, 0.08)",
        glow: "0 0 24px rgba(255, 107, 61, 0.18)",
      },
      keyframes: {
        bob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "bubble-in": {
          from: { opacity: "0", transform: "translateY(-8px) scale(0.95)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "drop-in": {
          "0%": { opacity: "0", transform: "translateY(-60px) scale(0.8)" },
          "60%": { transform: "translateY(6px) scale(1.02)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "pop-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "toast-in": {
          "0%": { opacity: "0", transform: "translateX(-50%) translateY(16px) scale(0.9)" },
          "100%": { opacity: "1", transform: "translateX(-50%) translateY(0) scale(1)" },
        },
        "confetti-pop": {
          "0%": { opacity: "0", transform: "translate(0,0) rotate(var(--confetti-start, 0deg))" },
          "100%": { opacity: "1", transform: "translate(var(--confetti-tx, 0), var(--confetti-ty, 0)) rotate(var(--confetti-end, 0deg))" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(0.97)" },
        },
      },
      animation: {
        bob: "bob 2s ease-in-out infinite",
        wiggle: "wiggle 2s ease-in-out infinite",
        "bubble-in": "bubble-in 0.4s ease",
        "drop-in": "drop-in 0.5s cubic-bezier(0.34,1.56,0.64,1)",
        "pop-in": "pop-in 0.3s ease",
        "toast-in": "toast-in 0.3s ease",
        "confetti-pop": "confetti-pop 0.6s ease-out forwards",
        "pulse-soft": "pulse-soft 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
