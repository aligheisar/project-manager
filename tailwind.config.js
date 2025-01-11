/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        vsm: "420px",
      },
      transitionProperty: {
        "color-postions":
          "background, background-color, color, translate, top, bottom, left, right",
        "color-filter": "filter, backdrop-filter, background-color, color",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
