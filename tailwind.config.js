module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'aBlue': '#00ADEF',
        'aRed': '#F03C6B',
        'aYellow': '#F7941D',
        'aGray': '#f4f4f4',
      },
      spacing: {
        '200': '12.5rem',
        '250': '15.625rem',
        '300': '18.75rem',
        '350': '21.875rem',
        '400': '25rem',
        '450': '28.125rem',
        '500': '31.25rem',
        '600': '37.5rem',
        '800': '50rem',
      },
      borderRadius: {
        '50': '50px',
      },
      fontSize: {
        'hero': '2.65rem',
       },
       maxWidth: {
        '300': '18.75rem',
        '350': '21.875rem',
        '400': '25rem',
        '500': '31.25rem',
        '600': '37.5rem',
        '15': '15rem',
       },
       minHeight: {
        '250': '15.625rem',
        '300': '18.75rem',
        '350': '21.875rem',
        '400': '25rem',
        '500': '31.25rem',
        '600': '37.5rem',
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
