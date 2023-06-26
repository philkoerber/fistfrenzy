/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightblue: "#CCE6F4",
        pacificblue: "#4BA3C3",
        darkblue: "#175676",
        verydarkblue: "#0A2533",

        crimson: "#D62839",
        indianyellow: "#F6AE2D"
      },
      fontFamily: {
        "normal": ["Barlow", "sans-serif"],
        "verziert": ["Xanh Mono", "monospace"]
      }
    },
  },
  plugins: [],
}