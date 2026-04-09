/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0b1326",
        surface: {
          DEFAULT: "#161f33",
          container: {
            low: "#0e182b",
            DEFAULT: "#161f33",
            high: "#1d2940",
            highest: "#2a3a5a"
          }
        },
        primary: {
          DEFAULT: "#818cf8", // Indigo 400
          container: "#312e81"
        },
        secondary: {
          DEFAULT: "#2dd4bf", // Teal 400
        },
        tertiary: {
          DEFAULT: "#fb7185", // Rose 400
        },
        on: {
          surface: {
            DEFAULT: "#f8fafc",
            variant: "#94a3b8"
          },
          primary: "#ffffff"
        }
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Outfit', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
