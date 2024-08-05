<template>
  <div class="flex bg-black w-[100%] h-[100vh] items-center justify-center">
    <button
      @click.prevent="Login"
      class="bg-[#1ed760] h-[48px] text-black rounded-full w-[300px] flex justify-center items-center text-lg font-bold"
    >
      Login With Spotify
    </button>
  </div>
</template>
<script setup>
definePageMeta({
  layout: 'blank',
});

import { CommonStore } from '@/stores/pinia';

const store = CommonStore();

const config = useRuntimeConfig();
const clientId = config.public.spotifyClientID;
const uri = config.public.spotifyURL;

// 📌 로그인
const Login = () => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${uri}`;

  if (!store.isUser) {
    window.location.href = authUrl;
  }
};
</script>
