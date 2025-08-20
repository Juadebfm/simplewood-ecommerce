/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        smGreen: "#7DB800",
        smRed: "#E46D6D",
        smLightGray: "#E0E0E0",
        smMediumGray: "#A2A2A2",
        smDarkGray: "#828282",
        smBlack: "#212121",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        smH1: "40px",
        smH2: "36px",
        smH3: "18px",
        smCategoryText: "20px",
      },
    },
  },
  plugins: [],
};
