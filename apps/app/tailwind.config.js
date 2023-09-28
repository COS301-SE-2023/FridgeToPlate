const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, '../src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    screens: {
      sm: '320px',
      md: '700px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    fontFamily: [
      'Poppins',
      'Inter',
      'Quicksand',
      'Noto Sans KR',
      ...defaultTheme.fontFamily.sans,
    ],
    extend: {
      colors: {
        'background-light': '#F5F5F5',
        'background-dark': '#010127',
        primary: '#C35214',
        'recipe-card-overlay': 'rgba(52,52,52,0.64)',
        'primary-highlight': '#E26310',
        accept: '#2bc917',
        reject: '#d70b0b',
        delete: '#B9261C',
        'delete-highlight': '#DC2626',
        subtitle: '#9D9D9D',
        'input-outline': '#E6E6E6',
      },
      gridTemplateRows: {
        10: 'repeat(10, minmax(0,1fr))',
        12: 'repeat(12, minmax(0,1fr))',
      },
      gridRowStart: {
        8: '8',
        9: '9',
        10: '10',
      },
      gridRowEnd: {
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
        13: '13',
      },
      fontFamily: {
        sans: ['Noto Sans KR'],
        inter: ['Inter'],
      },
      spacing: {
        18: '5rem',
      },
    },
  },
  plugins: [],
};
