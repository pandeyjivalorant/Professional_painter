/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './context/**/*.{js,jsx}',
    './data/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: 'rgb(var(--obsidian-rgb) / <alpha-value>)',
        ivory: 'rgb(var(--ivory-rgb) / <alpha-value>)',
        gold: 'rgb(var(--gold-rgb) / <alpha-value>)',
        'gold-light': 'rgb(var(--gold-light-rgb) / <alpha-value>)',
        rose: 'rgb(var(--rose-rgb) / <alpha-value>)',
        slate: 'rgb(var(--slate-rgb) / <alpha-value>)',
        'slate-mid': 'rgb(var(--slate-mid-rgb) / <alpha-value>)',
        muted: 'rgb(var(--muted-rgb) / <alpha-value>)',
        'warm-white': 'rgb(var(--warm-white-rgb) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        title: ['Cinzel', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
      },
    },
  },
  plugins: [],
};
