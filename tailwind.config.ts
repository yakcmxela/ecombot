import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        themeBlue: "rgb(22, 47, 69)",
        themeLight: "rgb(238, 234, 223)",
        themeMedium: "rgb(143, 211, 244)",
        themeRed: "rgba(200, 71, 66)",
      },
      fontFamily: {
        body: ["var(--font-body)"],
        heading: ["var(--font-heading)"],
      },
    },
  },
  plugins: [],
};
export default config;
