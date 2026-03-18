/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: "#F5EBDD",
        softBrown: "#B08968",
        accentBrown: "#A98467",
        sidebar: "#E6D5C3",
        darkText: "#4A3F35",
        lightText: "#7C6A5D",
      },
    },
  },
  plugins: [],
}