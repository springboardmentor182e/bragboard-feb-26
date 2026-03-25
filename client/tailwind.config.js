/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // keep this
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1", // Indigo
        secondary: "#8B5CF6", // Purple
        accent: "#EC4899", // Pink
        success: "#10B981",
        warning: "#F59E0B",
      },
    },
  },
  plugins: [],
};
