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
      sm: { min: '390px', max: '819px' },
      md: { min: '820px', max: '1023px' },
      lg: { min: '1024px', max: '1279px' },
      xl: { min: '1280px' },
    },
  },
  plugins: [],
};
