/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main': '#4267b2'
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp'),],
}
