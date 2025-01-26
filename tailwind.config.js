/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pink: {
          50: '#FFF0F7',
          100: '#FFE3EF',
          200: '#FFC1E3',
          300: '#FF9ED3',
          400: 'var(--accent-color)',
          500: '#FF56B4',
          600: '#FF33A5',
        },
        purple: {
          50: '#F7F0FF',
          100: '#EFE3FF',
          200: '#D9C6F2',
          300: '#C3A9E5',
          400: '#AD8CD8',
          500: '#976FCB',
          600: '#8152BE',
        },
      },
    },
  },
  plugins: [],
};