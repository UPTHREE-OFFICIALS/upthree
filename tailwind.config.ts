import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        smoke: "rgb(var(--color-smoke) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        deep: "#202124",
        brand: "#FF7012",
        soft: "rgb(var(--color-soft) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        mute: "rgb(var(--color-mute) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        sky: "#EAF3FF",
        azure: "#4A7DFF",
      },
      boxShadow: {
        card: "0 8px 30px rgba(32,33,36,.06)",
      },
    },
  },
} satisfies Config;
