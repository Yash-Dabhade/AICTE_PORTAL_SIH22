/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        card: "28rem",
        report: "55vh",
      },
    },
  },
  plugins: [],
};
