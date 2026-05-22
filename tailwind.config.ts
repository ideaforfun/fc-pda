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
        snack: {
          50: "#fff8ed",
          100: "#ffefd4",
          200: "#ffdba8",
          300: "#ffbf70",
          400: "#ff9837",
          500: "#ff7a10",
          600: "#f05e06",
          700: "#c74608",
          800: "#9e380f",
          900: "#7f3010",
        },
      },
    },
  },
  plugins: [],
};

export default config;
