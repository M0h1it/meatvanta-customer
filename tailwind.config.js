/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Meat Vanta - "Artisanal Heritage Modern" system
        brand: "#B4141F",        // primary crimson - CTAs, prices
        "brand-dark": "#8C0F18", // deep crimson - header, selected states
        "brand-soft": "#FFDAD7",
        accent: "#C8952B",       // gold - trust badges, premium marks
        "accent-soft": "#FFDEA8",
        surface: "#FDF9F3",      // warm white canvas
        "surface-alt": "#F6F3F2",
        ink: "#1A1A1A",          // charcoal text
        "ink-soft": "#59413F",
        success: "#2F6B4F",
        hairline: "rgba(26,26,26,0.10)",
      },
      fontFamily: {
        // Serif for headlines carries the heritage story; sans keeps
        // transactional detail (prices, weights) clean and legible.
        display: ['"Libre Caslon Text"', "Georgia", "serif"],
        sans: ['"Work Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["48px", { lineHeight: "1.1", letterSpacing: "-0.01em", fontWeight: "700" }],
        "display-sm": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        "headline-lg": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        "label-sm": ["12px", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "500" }],
      },
      borderRadius: {
        sm: "0.5rem",
        DEFAULT: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
      spacing: {
        // Standard side gutter - the page runs full width, but text never
        // touches the screen edge.
        gutter: "16px",
        "gutter-lg": "40px",
        section: "80px",
      },
    },
  },
  plugins: [],
};
