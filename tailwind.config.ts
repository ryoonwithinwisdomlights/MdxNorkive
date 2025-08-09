import { BLOG } from "./blog.config";
import scrollbarHide from "tailwind-scrollbar-hide";
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./modules/**/*.{js,ts,jsx,tsx,}",
    "./components/**/*.{js,ts,jsx,tsx,}",
    "./context/**/*.{js,ts,jsx,tsx,}",
    "./lib/**/*.{js,ts,jsx,tsx,}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./types/**/*.{js,ts,jsx,tsx,}",
    "./styles/**/*.{js,ts,jsx,tsx,css}",
  ],
  safelist: [
    "wrapper",
    "shadow-card",
    "scroll-hidden",
    "glassmorphism",
    "medium-zoom-overlay",
    "shadow-text",
    "forbid-copy",
    "no-scrollbar",
    // 필요시 추가
  ],
  theme: {
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.2s ease-out forwards",
        "fd-sidebar-in-right": "fdSidebarInRight 0.3s ease-out forwards",
        "fd-sidebar-out-right": "fdSidebarOutRight 0.3s ease-in forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        fdSidebarInRight: {
          "0%": {
            opacity: "0",
            transform: "translateX(100%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        fdSidebarOutRight: {
          "0%": {
            opacity: "1",
            transform: "translateX(0)",
          },
          "100%": {
            opacity: "0",
            transform: "translateX(100%)",
          },
        },
      },
    },
  },
  plugins: [scrollbarHide],
};
