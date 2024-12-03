module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#065f46',
        error: '#b91c1c',
        link: '#0284c7',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
