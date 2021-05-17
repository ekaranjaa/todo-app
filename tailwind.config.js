const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      black: colors.black,
      gray: colors.trueGray,
      green: colors.green,
      red: colors.red,
      pink: colors.pink
    },
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
