/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        attention: {
          '0%, 100%': { transform: 'scale(105%)' },
          '50%': { transform: 'scale(100%)' },
        }
      },
      animation: {
        attention: 'attention 2s ease-in-out infinite',
        'spin-slow': 'spin 1.2s linear infinite',
        'spin-slower': 'spin 25s linear infinite'
      }
    },
  },
  plugins: [],
}