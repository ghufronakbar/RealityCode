import type { Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "abstract-1": "url('/wallpaper/wallpaper1.jpg')",
        "event-ease": "url('/event-ease/wallpaper.webp')",
        "didesa": "url('/didesa/wallpaper.jpg')",
      },
      colors: {
        primary: "#1D171E",
        secondary: "#1B151C",
        tertiary: "#1C151D",
        accent: "#A57399",
        "didesa-1": "#FF7757",
        "didesa-2": "#331811",
        "didesa-3": "#FFF2E9",
        "didesa-4": "#61291C",
      },
      fontFamily: {
        bebas: ["Bebas Neue", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        ubuntu: ["Ubuntu", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        typography: ["Typography", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
        rubik: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
export default config;
