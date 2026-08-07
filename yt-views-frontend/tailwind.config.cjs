/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
      colors: {
        primary: '#222222',
        secondary: '#666666',
        border: '#e5e5e5',
        positive: '#198754',
        negative: '#dc3545',
        export: '#ffc107',
        exportDark: '#e0a800',
        header: '#4f81bd',
        layoutBg: '#f8f9fa',
        navbar: '#1f1f1f',
      }
    },
  },
  plugins: [],
}