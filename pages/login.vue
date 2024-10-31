<template>
  <div class="flex bg-black w-[100%] h-[100vh] items-center justify-center">
    <button
      @click.prevent="Login"
      class="bg-[#1ed760] hover:bg-[#6bff10] h-[48px] text-black rounded-full w-[300px] flex justify-center items-center text-lg font-bold transition"
    >
      로그인 하기
    </button>
  </div>
</template>
<script setup>
definePageMeta({ layout: 'blank' });

import { CommonStore } from '@/stores/pinia';
import { useRouter } from 'vue-router';

const store = CommonStore();
const config = useRuntimeConfig();
const clientId = config.public.spotifyClientID;
const uri = config.public.spotifyURL;
const router = useRouter();

/*
  scope: 데이터 범위
*/

const scopeArr = [
  'ugc-image-upload',
  'user-read-private',
  'user-read-email',
  'user-read-playback-state',
  'user-modify-playback-state',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',
  'user-read-playback-position',
  'user-read-recently-played',
  'user-read-currently-playing',
  'user-top-read',
  'user-library-modify',
  'user-library-read',
  'streaming',
  'app-remote-control',
];

const combinedScopes = scopeArr.join('%20');

// 📌 로그인
const Login = () => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&scope=${combinedScopes}&response_type=code&redirect_uri=${uri}`;

  console.log('로그인 ====>');
  window.location.href = authUrl;
};
</script>
<style lang="css" scoped></style>
