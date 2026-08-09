import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "org-primary": "var(--org-primary)",
        "org-secondary": "var(--org-secondary)",
        "org-accent": "var(--org-accent)",
      },
    },
  },
  plugins: [],
};

export default config;
