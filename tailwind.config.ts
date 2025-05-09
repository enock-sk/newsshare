/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A', // Dark blue for headers/buttons
        secondary: '#F3F4F6', // Light gray for backgrounds
      },
    },
  },
  plugins: [],
};
