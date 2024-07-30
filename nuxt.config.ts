
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  pages: true,
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    spotifyClientID : process.env.SPOTIFY_CLIENT_ID, 
    spotifyClientSecret : process.env.SPOTIFY_CLIENT_SECRET, 
    spotifyRefreshToken : process.env.SPOTIFY_RT,
    public: {}
  },
  css: ['@/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {
        overrideBrowserslist: ['cover 99.5%', 'not IE < 9'],
      },
    },
  },
})

