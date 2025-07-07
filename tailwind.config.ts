import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#00BCD4",
        background: "#f0f4f8",
        darkBg: "#111827",
        card: "#ffffff",
        cardDark: "#1f2937",
      },
      boxShadow: {
        neumorphic: "8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff",
        neumorphicDark: "8px 8px 16px #0e1012, -8px -8px 16px #1a1a1a",
      },
    },
  },
  plugins: [],
};

export default config;
