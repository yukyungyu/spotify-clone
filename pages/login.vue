<template>
  <div class="flex bg-black w-[100%] h-[100vh] items-center justify-center">
    <button
      @click.prevent="Login"
      class="bg-white h-[40px] text-black rounded-full px-5 py-2.5 text-base hover:bg-[#1ed760]"
    >
      로그인 하기
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
