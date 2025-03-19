const nextPlugin = require('eslint-plugin-next');

module.exports = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      next: nextPlugin,
    },
    rules: {
      'next/no-img-element': 'off',
    },
  },
];