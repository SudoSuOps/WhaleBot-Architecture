
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        whale: {
          950: '#02010a',
          900: '#0a051e',
          800: '#150a33',
          700: '#2a1659',
          text: '#b8b8d0',
          light: '#e0e0ff'
        },
        trenchGold: {
          400: '#ffe55c',
          500: '#ffd700',
          600: '#b39200',
          glow: '#ffd70040'
        },
        trenchPurple: {
          400: '#a855f7',
          500: '#7e22ce',
          600: '#581c87',
          glow: '#7e22ce40'
        },
        diamond: {
          500: '#00f0ff',
          600: '#00bcd4',
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', "Liberation Mono", "Courier New", 'monospace'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
