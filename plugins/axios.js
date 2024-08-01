import axios from 'axios'; 

export default defineNuxtPlugin(nuxtApp => {
  const api = axios.create({
    baseURL: process.env.SPOTIFY_URL, 
    headers: {
      'Content-Type': 'application/json',
    },
  });

  nuxtApp.provide('axios', api);
});