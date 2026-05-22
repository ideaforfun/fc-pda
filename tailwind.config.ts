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
        cocoa: {
          50: "#FFF8DC",
          100: "#FFE5B8",
          200: "#FFD89D",
          300: "#F5C77E",
          400: "#7B5E3F",
          500: "#5A4030",
          600: "#3D2914",
          700: "#2A1B10",
          800: "#1a0d05",
        },
        butter: {
          200: "#FFF3A0",
          300: "#FFE066",
          400: "#FFD93D",
          500: "#F5C300",
          600: "#B8860B",
        },
        tomato: {
          400: "#FF6B6B",
          500: "#E63946",
          600: "#B91C1C",
        },
        blush: "#FFB6C1",
      },
      keyframes: {
        bob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-2px)" },
          "75%": { transform: "translateX(2px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "bubble-in": {
          from: { opacity: "0", transform: "translateY(-6px) scale(0.9)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "drop-in": {
          "0%": { opacity: "0", transform: "translateY(-100px) scale(0.7)" },
          "60%": { transform: "translateY(8px) scale(1.02)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "pop-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "toast-in": {
          "0%": { opacity: "0", transform: "translateX(-50%) translateY(20px) scale(0.7)" },
          "60%": { transform: "translateX(-50%) translateY(-4px) scale(1.05)" },
          "100%": { opacity: "1", transform: "translateX(-50%) translateY(0) scale(1)" },
        },
        "confetti-pop": {
          "0%": { opacity: "0", transform: "translate(0, 0) rotate(var(--confetti-start, 0deg))" },
          "100%": { opacity: "1", transform: "translate(var(--confetti-tx, 0), var(--confetti-ty, 0)) rotate(var(--confetti-end, 0deg))" },
        },
      },
      animation: {
        bob: "bob 2s ease-in-out infinite",
        shake: "shake 0.3s ease infinite",
        wiggle: "wiggle 2s ease-in-out infinite",
        "bubble-in": "bubble-in 0.4s ease",
        "drop-in": "drop-in 0.5s cubic-bezier(0.34,1.56,0.64,1)",
        "pop-in": "pop-in 0.3s ease",
        "toast-in": "toast-in 0.3s ease",
        "confetti-pop": "confetti-pop 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
