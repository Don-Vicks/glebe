import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      colors: {
        ink: "#16233A",
        navy: "#1B2A4A",
        teal: {
          DEFAULT: "#0E6E5C",
          deep: "#0A5548",
        },
        gold: "#B98A2E",
        paper: "#FAF7F0",
        "ink-soft": "#3D4B5C",
      },
    },
  },
  plugins: [],
};

export default config;