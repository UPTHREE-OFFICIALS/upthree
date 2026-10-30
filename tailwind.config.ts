import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        smoke: "rgb(var(--smoke) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        deep: "#202124",
        brand: "#FF7012",
        soft: "rgb(var(--soft) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        mute: "rgb(var(--mute) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        sky: "#EAF3FF",
        azure: "#4A7DFF",
      },
      boxShadow: {
        card: "0 8px 30px rgba(32,33,36,.06)",
      },
    },
  },
} satisfies Config;
