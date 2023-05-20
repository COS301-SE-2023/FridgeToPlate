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
      'background-light': '#F8F8F8',
      'background-dark': '#010127',
      'primary': '#C35214',
      'primary-highlight': '#E26310'
    },
  },
  plugins: [],
};
