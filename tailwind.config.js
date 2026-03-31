/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['"Libre Franklin"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Instrument Serif"', 'serif'],
        retro: ['"Press Start 2P"', 'monospace'],
      },
      colors: {
        surface: '#080808',
        'surface-raised': '#111111',
        'surface-hover': '#1a1a1a',
        'text-primary': '#e8e8e8',
        'text-muted': '#888888',
        lutie: {
          pink: '#FF2D78',
          yellow: '#FFE135',
          cyan: '#00E5FF',
          green: '#39FF14',
        },
        office: {
          steel: '#4A6FA5',
          cold: '#2A3F5F',
          line: '#1e2d44',
        },
      },
      animation: {
        'scan': 'scan 8s linear infinite',
        'blink': 'blink 1s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
        'grain': 'grain 0.5s steps(1) infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
      },
    },
  },
  plugins: [],
};
