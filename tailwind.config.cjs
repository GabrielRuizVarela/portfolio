/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'about': "url('/src/assets/blurry-gradient-haikei(1).svg')",
        'web': "url('/src/assets/images/webdev.svg')",
      }
    },
    screens: {
      'xs': '300px',
      ...defaultTheme.screens,
    },
  },
  plugins: [require("daisyui")],
}
