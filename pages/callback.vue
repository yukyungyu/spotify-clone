<template>
  <div></div>
</template>

<script setup>
import { CommonStore } from '@/stores/pinia';
import { useRouter } from 'vue-router';

const loading = ref(true);
const error = ref(null);
const store = CommonStore();
const { $axios } = useNuxtApp();
const router = useRouter(); 

// 📌 spotify 인증 코드로 인증 토큰 발급하기
onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (code) {
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
    } catch (error) {
      error.value = 'Authentication failed: ' + error.message;
    }
  } else {
    console.error('No authorization code found');
  }
});
</script>

<style></style>
