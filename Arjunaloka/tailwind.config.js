/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('nativewind/preset')],
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: '#F9F9F9',
        primary: '#355EA2',
      },
      fontFamily: {
        montserrat: ['Montserrat_400Regular', 'sans-serif'],
        montserratMedium: ['Montserrat_500Medium', 'sans-serif'],
        montserratBold: ['Montserrat_700Bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
