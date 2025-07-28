/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // If using the new app directory in Next.js 13+
  ],
  darkMode: 'class', // or 'media' or false if you don't need dark mode
  theme: {
    extend: {
      // You can extend colors, fonts, spacing, etc. here
      colors: {
        primary: '#1D4ED8',
        secondary: '#F59E0B',
        neutral: '#F3F4F6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
