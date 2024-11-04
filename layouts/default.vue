<template>
  <Header />
  <SideNav />
  <main
    id="main"
    class="fixed right-0 top-0 w-[calc(100%-360px)] px-2 pb-24 overflow-auto h-full bg-gradient-to-b from-[#1C1C1C] to-black"
  >
    <div class="mt-[70px]"></div>
    <slot />
    <div class="mb-100px"></div>
  </main>
  <div v-if="store.currentSong">
    <MusicPlayer />
  </div>
</template>
<script setup>
import { CommonStore } from '@/stores/pinia';
import { useRouter } from 'vue-router';
const router = useRouter();

const store = CommonStore();
onMounted(() => {
  if (store.accessToken === '') {
    router.push('/login');
  }
});
</script>
<style></style>
