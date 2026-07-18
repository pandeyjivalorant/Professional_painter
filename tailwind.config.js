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
        obsidian: '#0B0B0B',
        ivory: '#F5F0E8',
        gold: '#C9A227',
        'gold-light': '#E6D088',
        rose: '#D4A5A5',
        slate: '#2A2A3A',
        'slate-mid': '#3D3D52',
        muted: '#888888',
        'warm-white': '#F8F5F0',
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
