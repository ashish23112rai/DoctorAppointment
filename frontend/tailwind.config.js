/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        lato: ['Lato', 'sans-serif'],
      },
      // Add smooth scrolling configuration here
      scrollBehavior: {
        smooth: 'smooth',
      },
    },
  },
  plugins: [],
}
