/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx,}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark",],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};