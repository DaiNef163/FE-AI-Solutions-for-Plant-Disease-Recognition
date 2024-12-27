/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0D9488",
        colorPageProduct: "#BEF5ED",
      },
      backgroundImage: {
        backgroundPageGradient:
          "linear-gradient(to right, rgba(81, 228, 206, 0.7) 5%, rgba(183, 244, 235, 0.7) 60%)",
        backgroundHeader: "linear-gradient(to right, #51E4CE 10%, #B7F4EB 75%)",
      },
      backgroundPageProduct:
        "linear-gradient(to right, #2DD4BF 5%, #53E5CF 60%, #ffffff 95%)",
    },
  },
  plugins: [require("daisyui"), require("tailwindcss-animated")],
  
};
