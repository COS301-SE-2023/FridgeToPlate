const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, '../src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        'background-light': '#F8F8F8',
        'background-dark': '#010127',
        'primary': '#C35214',
        'primary-highlight': '#E26310',
        'accept': '#2bc917',
        'reject': '#d70b0b'
      },
      gridTemplateRows: {
        10: "repeat(10, minmax(0,1fr))",
        12: "repeat(12, minmax(0,1fr))",
      },
      gridRowStart: {
        8: "8",
        9: "9",
        10: "10",
      },
      gridRowEnd: {
        8: "8",
        9: '9',
        10: "10",
        11: "11",
        12: "12",
        13: "13",
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'wix-display': ['Wix Madefor Display', 'sans-serif']
      }
    }

  },
  plugins: [],
};
