/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-600': '#636A80',
        'dark-500': '#414141',
        'dark-700': '#1E293B',
        'dark-800': '#1B2028',
        'yellow-500': "#FFD33C",
        'gray-500': "#DADDE5",
        'gray-700': "#797777",
        'gray-400': "#F3F4F5",
        'gray-300': "#939699",
        'yellow-400': "#FFD33C4A",
        'red-800': "#CC0000",
      },
      boxShadow: {
        'xl': '0px 0px 11px 1px rgb(173 173 173 / 28%)',
        'sm':'2px 0px 14.2px 0px rgba(0, 0, 0, 0.06)',
        'blue':"0px 0px 0px 3px rgba(37, 108, 208, 0.25)"
      }
    },
  },
  variants: {
    extend: {
      borderRadius: ['first'],
    },
  },
  plugins: [],
}