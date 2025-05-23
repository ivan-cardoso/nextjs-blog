import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "13": "repeat(13, minmax(0, 1fr))",
      },
      colors: {
        blue: {
          400: "#2589FE",
          500: "#0070F3",
          600: "#2F6FEB",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        geist: ["var(--font-geist-sans)", "sans-serif"],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            pre: {
              // Example: Let rehype-pretty-code handle background and color
              backgroundColor: null,
              // color: null,
              // You can still define padding, margins, font-family here if needed
              // fontFamily: theme('fontFamily.mono').join(','),
              // padding: theme('spacing.4'),
            },
            "code::before": { content: "none" }, // Remove backticks
            "code::after": { content: "none" }, // Remove backticks
            // Add more overrides if needed
          },
        },
      }),
    },
    keyframes: {
      shimmer: {
        "100%": {
          transform: "translateX(100%)",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [typography],
};
export default config;
