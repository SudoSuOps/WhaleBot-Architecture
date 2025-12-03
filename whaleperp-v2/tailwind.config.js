/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        whale: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
          text: '#94a3b8'
        },
        trenchGold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706'
        },
        trenchPurple: {
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea'
        },
        diamond: {
          400: '#22d3ee',
          500: '#06b6d4'
        }
      }
    },
  },
  plugins: [],
}
