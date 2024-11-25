const BLOGG = require("./blogG.config");
const { fontFamilies } = require("./lib/font");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./themes/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  darkMode: BLOGG.APPEARANCE === "class" ? "media" : "class", // or 'media' or 'class'
  theme: {
    fontFamily: fontFamilies,
    extend: {
      colors: {
        day: {
          DEFAULT: BLOGG.BACKGROUND_LIGHT || "#ffffff",
        },
        night: {
          DEFAULT: BLOGG.BACKGROUND_DARK || "#111827",
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
      },
    },
  },
  variants: {
    extend: {},
  },
  // plugins: [],
  plugins: [require("tailwindcss-animate")],
};
