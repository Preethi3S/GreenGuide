/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#f97316',
        'primary-hover': '#ea580c',
        'secondary': '#0f3828',
        'secondary-light': '#1a4d36',
        'accent': '#86efac',
        'dark-bg': '#0f3828',
        'dark-card': '#154030',
        'dark-text': '#ffffff',
        'dark-muted': '#9ca3af',
        'dark-border': '#1f2937',
        'light-bg': '#f8fafc',
        'light-text': '#0f3828',
        'muted': '#64748b',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Playfair Display', 'Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
};
