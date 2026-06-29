/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chrome: '#e8e8e8',
        neural: '#00f0ff',
        bio: '#ff2d75',
        emerald: '#00ff88',
        steel: '#1a1a2e',
        deep: '#0a0a15',
      },
    },
  },
  plugins: [],
}