/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sela: {
          green:   "#0D9E6E",
          emerald: "#059669",
          dark:    "#065F46",
          light:   "#D1FAE5",
          gray:    "#6B7280",
          charcoal:"#1F2937",
          cream:   "#FAFAF7",
        },
      },
      fontFamily: {
        display: ["'Outfit'", "sans-serif"],
        body:    ["'DM Sans'", "sans-serif"],
      },
      animation: {
        "fade-up":   "fadeUp 0.5s ease forwards",
        "fade-in":   "fadeIn 0.4s ease forwards",
        "slide-in":  "slideIn 0.3s ease forwards",
      },
      keyframes: {
        fadeUp:  { "0%": { opacity: 0, transform: "translateY(16px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
        fadeIn:  { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        slideIn: { "0%": { transform: "translateX(-10px)", opacity: 0 }, "100%": { transform: "translateX(0)", opacity: 1 } },
      },
    },
  },
  plugins: [],
};
