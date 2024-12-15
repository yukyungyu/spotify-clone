<template>
  <div></div>
</template>

<script setup>
import { CommonStore } from '@/stores/pinia';
import { useRouter } from 'vue-router';

// const loading = ref(true);
const error = ref(null);
const store = CommonStore();
const { $axios } = useNuxtApp();
const router = useRouter();

// 📌 get UserInfo
const getUserInfo = async () => {
  try {
    const response = await $axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${store.accessToken}`,
      },
    });
    store.name = response.data.display_name;
    store.userId = response.data.id;
    // console.log(response.data, 'data');
  } catch (error) {
    error.value = 'Failed to fetch category ' + error.message;
  }
};

// 📌 spotify 인증 코드로 인증 토큰 발급하기
onMounted(async () => {
  console.log('accessToken ======>' + store.accessToken);
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  if (code !== '') {
    try {
      const result = await $axios.post('http://localhost:3001/api/login', {
        code: code,
      });
      store.login({
        accessToken: result.data.accessToken,
        refreshToken: result.data.refreshToken,
        isUser: true,
      });
      router.push('/');
      console.log('로그인 api 통신 ======>');
      getUserInfo();
    } catch (error) {
      error.value = 'Authentication failed: ' + error.message;
    }
  }
});
</script>

<style></style>
