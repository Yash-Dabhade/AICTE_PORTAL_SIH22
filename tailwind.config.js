/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        card: "28rem",
        report: "55vh",
        intro: "14%",
        DetailContainer: "60vh",
        responseContainer: "49vh",
        selectBox: "100% !important",
        instituteList: "30vh !important",
      },
    },
  },
  plugins: [],
};
