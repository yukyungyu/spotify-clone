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
*/
const scope =
  'user-read-private%20user-read-email%20ugc-image-upload%20user-read-playback-state%20playlist-read-private%20playlist-modify-private%20playlist-modify-public%20user-read-recently-played%20user-top-read%20user-library-modify%20user-library-read%20streaming%20app-remote-control%20user-modify-playback-state%20user-read-currently-playing%20playlist-read-collaborative%20user-read-playback-position';

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
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&scope=${scope}&response_type=code&redirect_uri=${uri}`;

  if (!store.isUser) {
    window.location.href = authUrl;
  }
};

onMounted(() => {
  if (store.accessToken === '') {
    router.push('/login');
  } else {
    router.push('/');
  }
});
</script>
<style lang="css" scoped></style>
