/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    screens: {
      sm: { min: '390px', max: '1023px' },
      md: { min: '1024px', max: '1999px' },
      lg: { min: '1200px' },
    },
  },
  plugins: [],
};
