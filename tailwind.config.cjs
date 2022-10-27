/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        // 'about': "url('/src/assets/stacked-peaks-haikei.svg')",
        'about': "url('/src/assets/low-poly-grid-haikei-1.svg')",
      }
    }
  },
  plugins: [require("daisyui")],
}
