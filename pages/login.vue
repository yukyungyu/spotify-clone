<template>   
  <div class="flex bg-black  w-[100%] h-[100vh] items-center justify-center">
    <button @click.prevent="Login" class="bg-white h-[40px] text-black rounded-full px-5 py-2.5 text-base hover:bg-[#1ed760]">로그인 하기</button> 
  </div> 
</template>
<script setup> 
definePageMeta({ 
  layout: 'blank' 
}) 
 
import { CommonStore } from '@/stores/pinia';
import { useRouter } from 'vue-router'

const loading = ref(true);
const error = ref(null);  
const store = CommonStore();
const { $axios } = useNuxtApp();
const router = useRouter()

const config = useRuntimeConfig();
const clientId = config.public.spotifyClientID;
const uri = config.public.spotifyURL;


// 📌 로그인
const Login = () => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${uri}`;
  console.log(authUrl)
  
  if(!store.isUser) {
    window.location.href = authUrl;
  }
};  

// 📌 spotify 인증 코드로 인증 토큰 발급하기
onMounted(() => { 
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  console.log('code: ', code)

  if (code) {
    console.log('ssssss')
     fetchAccessToken(code);
  } else {
    error.value = 'Authorization code not found';
    loading.value = false;
  }
});


// 📌 인증 토큰 가져오기
const fetchAccessToken = async (code) => {
  console.log('fetchAccessToken')
  try {  
    const result = await $axios.post('http://localhost:3001/api/login', {
      code: code,
    });
    store.login({
      accessToken: result.data.accessToken,
      refreshToken: result.data.refreshToken,
      isUser: true,
    });  
    console.log('33: ', store.isUser)
    // router.push('/')
  } catch (error) {
    error.value = 'Authentication failed: ' + error.message;
  }
};


</script>