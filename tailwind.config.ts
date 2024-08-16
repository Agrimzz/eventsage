import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#8F8061",
          DEFAULT: "#8F8061",
          foreground: "hsl(var(--primary-foreground))",
        },
        white: "#F8F7F2",
        grey: "#4C4E49",
        black: "#191919",
        foreground: "hsl(var(--foreground))",
      },
      backgroundColor: {
        default: "#191919",
      },
    },
  },
  plugins: [],
}
export default config
