/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily :{
        lunasima :['Lunasima' ,"sans-serif"],
      },
      colors:{
        'custom-color': 'rgb(190, 230, 180)',
        'custom-color-dark': '#67a75b',
        'custom-color-light': '#e9f3e5',
      },
    },
  },
  plugins: [],
}

