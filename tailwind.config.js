/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#10151F",
        "ink-muted": "#5B6472",
        paper: "#F4F5F7",
        surface: "#FFFFFF",
        border: "#E2E4E9",
        accent: {
          DEFAULT: "#4338CA",
          50: "#EEECFC",
          100: "#DDD9F9",
          500: "#4338CA",
          600: "#3730A3",
          700: "#2E2882",
        },
        signal: {
          DEFAULT: "#A6FF4D",
          dim: "#7ED321",
        },
        dark: {
          bg: "#0B0E14",
          surface: "#141922",
          border: "#232A38",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,21,31,0.04), 0 8px 24px rgba(16,21,31,0.06)",
        lcd: "inset 0 2px 8px rgba(0,0,0,0.4)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, rgba(16,21,31,0.02))",
      },
    },
  },
  plugins: [],
};
