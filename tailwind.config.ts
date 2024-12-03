import type { Config } from "tailwindcss";

const BLOG = require("./blog.config");
// const { fontFamilies } = require("./lib/font");
// import {fontSan}
import { fontFamilies } from "./lib/font";
const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,}",
    "./app/**/*.{js,ts,jsx,tsx,}",
  ],
  darkMode: BLOG.APPEARANCE === "class" ? "media" : "class", // or 'media' or 'class'
  theme: {
    fontFamily: fontFamilies,
    screens: {
      sm: "540px",
      // => @media (min-width: 576px) { ... }
      md: "720px",
      // => @media (min-width: 768px) { ... }
      lg: "960px",
      // => @media (min-width: 992px) { ... }
      xl: "1140px",
      // => @media (min-width: 1200px) { ... }
      "2xl": "1536px",
    },
    extend: {
      colors: {
        day: {
          DEFAULT: BLOG.BACKGROUND_LIGHT || "#ffffff",
        },
        night: {
          DEFAULT: BLOG.BACKGROUND_DARK || "#111827",
        },
        // rwwt: {
        //   'background-gray': '#f5f5f5',
        //   'black-gray': '#101414',
        //   'light-gray': '#e5e5e5'
        // }
      },
      maxWidth: {
        side: "14rem",
        "9/10": "90%",
        "screen-3xl": "1440px",
        "screen-4xl": "1560px",
      },
      boxShadow: {
        input: "0px 7px 20px rgba(0, 0, 0, 0.03)",
        form: "0px 1px 55px -11px rgba(0, 0, 0, 0.01)",
        pricing: "0px 0px 40px 0px rgba(0, 0, 0, 0.08)",
        "switch-1": "0px 0px 5px rgba(0, 0, 0, 0.15)",
        testimonial: "0px 10px 20px 0px rgba(92, 115, 160, 0.07)",
        "testimonial-btn": "0px 8px 15px 0px rgba(72, 72, 138, 0.08)",
        1: "0px 1px 3px 0px rgba(166, 175, 195, 0.40)",
        2: "0px 5px 12px 0px rgba(0, 0, 0, 0.10)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  // plugins: [require("tailwindcss-animate")],
};
export default config;
