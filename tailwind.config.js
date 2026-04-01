/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wedding: {
          bg: '#FAF8F5',
          text: '#2C2B2A',
          gold: '#D4AF37',
          blush: '#FDECEF',
          sage: '#E2E8E4'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        script: ['Great Vibes', 'cursive'],
        bigbang: ['DFVN Big Bang', 'serif'],
        nvnvalky: ['NVNValky', 'serif'],
      },
      fontSize:{
        titleSection: 'clamp(32px, 8vw, 36px)',
      }
    },
  },
  plugins: [],
}
