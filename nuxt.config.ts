
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  pages: true,
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    public: { 
      spotifyClientID : process.env.SPOTIFY_CLIENT_ID, 
      spotifyClientSecret : process.env.SPOTIFY_CLIENT_SECRET, 
      spotifyURL : process.env.SPOTIFY_URL,
      spotifyRefreshToken : process.env.SPOTIFY_RT,  
    }
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
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Spotify - Web Player:Music for Listeners',
      htmlAttrs: {
        lang: 'ko',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Spotify clone study' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: 'https://open.spotifycdn.com/cdn/images/favicon16.1c487bff.png' }
      ],
    }
  }
})

