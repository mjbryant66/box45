/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Palatino Linotype', 'Book Antiqua', 'Palatino', 'Georgia', 'serif'],
        sans: ['Trebuchet MS', 'Lucida Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
