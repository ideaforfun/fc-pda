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
        ink: {
          50: "#F5F6F8",
          100: "#F0F2F5",
          200: "#ECECF1",
          300: "#C0C1CA",
          400: "#B0B1BA",
          500: "#8A8B94",
          600: "#5A5B64",
          700: "#3A3B44",
          800: "#191A1E",
        },
        warm: "#F8F9FB",
      },
      borderRadius: {
        card: "20px",
      },
      boxShadow: {
        card: "0 2px 8px rgba(23, 25, 35, 0.04)",
        soft: "0 4px 16px rgba(23, 25, 35, 0.06)",
      },
      keyframes: {
        "tile-wobble": {
          "0%, 100%": { translate: "0 0" },
          "50%": { translate: "0 -2px" },
        },
        "cookie-bounce": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "30%": { transform: "translateY(-4px) rotate(12deg)" },
          "60%": { transform: "translateY(0) rotate(-4deg)" },
        },
        "pop-up": {
          from: { opacity: "0", transform: "translateX(-50%) translateY(10px)" },
          to: { opacity: "1", transform: "translateX(-50%) translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "sheet-up": {
          from: { transform: "translateY(60px)", opacity: "0.5" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "tile-wobble": "tile-wobble 3.5s ease-in-out infinite",
        "cookie-bounce": "cookie-bounce 2.2s ease-in-out infinite",
        "pop-up": "pop-up 0.22s ease",
        "fade-in": "fade-in 0.3s ease",
        "sheet-up": "sheet-up 0.28s cubic-bezier(0.32,0.72,0,1)",
      },
    },
  },
  plugins: [],
};

export default config;
