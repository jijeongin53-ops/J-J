import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wellness: {
          50: "#F7F8F5",
          100: "#EEF1EC",
          200: "#DCE3D8",
          300: "#C2CEC0",
          400: "#9FB39D",
          500: "#7A9578", // 메인 세이지 그린 (자연주의)
          600: "#5D785B",
          700: "#485E47",
          800: "#384A37",
          900: "#2A3629",
          950: "#182118",
        },
        gold: {
          50: "#FAF7EE",
          100: "#F3EED7",
          200: "#E7DDB2",
          300: "#D7C787",
          400: "#C7B05E",
          500: "#B09540", // 럭셔리 골드 포인트
          600: "#927732",
          700: "#725B28",
          800: "#554322",
          900: "#3D2F1B",
        },
        sand: {
          50: "#FAF9F6",
          100: "#F4F1EA",
          200: "#E9E3D5",
          300: "#D8CFBC",
          400: "#C3B69E",
          500: "#A7977E",
        },
        slateDark: "#131714",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Pretendard", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 10px 40px -10px rgba(42, 54, 41, 0.08), 0 0 1px 1px rgba(176, 149, 64, 0.12)",
        "luxury-hover": "0 20px 50px -10px rgba(42, 54, 41, 0.15), 0 0 1px 1px rgba(176, 149, 64, 0.25)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
