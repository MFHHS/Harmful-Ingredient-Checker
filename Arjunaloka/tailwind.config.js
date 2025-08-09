/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Your custom colors
        background: '#F9F9F9',
        primary: '#355EA2',
        textPrimary: '#424242',
        harmful: '#FF8B94',
        safe: '#A8E6CF',
      },
      fontFamily: {
        // Add custom fonts later if needed
      },
    },
  },
  plugins: [],
}