/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "custom": "1fr 3fr"
      },
      // rounded checkbox
    },
  },
  plugins: [],
}

