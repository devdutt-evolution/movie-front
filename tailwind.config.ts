import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        bottom: "url('/bottom-shape.svg')",
      },
      colors: {
        primary: "#2BD17E",
        red: "#EB5757",
        back: "#093545",
        input: "#224957",
        card: "#092C39",
      },
    },
  },
  plugins: [],
};
export default config;
