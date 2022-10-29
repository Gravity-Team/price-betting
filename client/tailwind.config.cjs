/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    fontFamily: {
      satoshiLight: ['Satoshi-Light', 'sans-serif'],
      satoshiMedium: ['Satoshi-Medium', 'sans-serif'],
      satoshiRegular: ['Satoshi-Regular', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'violet': '#665DCD',
      'blueLight': '#5FA4E6',
      'gold': '#D2AB67',
      'black': '#141619',
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
