/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2d00f7",
        secondary: "#ee756ccc",
        primaryVar: "#1570ef",
        error: "#ff0000",
        tertiary: "#fac515",
        textcolor: "#3D3C3A",
      },
      fontFamily: {
        PoppinsBold: ["PoppinsBold", "sans-serif"],
        PoppinsExtraBold: ["PoppinsExtraBold", "sans-serif"],
        PoppinsExtraLight: ["PoppinsExtraLight", "sans-serif"],
        PoppinsExtraLightItalic: ["PoppinsExtraLightItalic", "sans-serif"],
        PoppinsItalic: ["PoppinsItalic", "sans-serif"],
        PoppinsLight: ["PoppinsLight", "sans-serif"],
        PoppinsMedium: ["PoppinsMedium", "sans-serif"],
        PoppinsRegular: ["PoppinsRegular", "sans-serif"],
        PoppinsSemiBold: ["PoppinsSemiBold", "sans-serif"],
        PoppinsThin: ["PoppinsThin", "sans-serif"],
      },
    },
  },
  plugins: [],
};
