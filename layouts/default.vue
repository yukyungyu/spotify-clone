<template>
  <Header />
  <SideNav />
  <main
    id="main"
    class="fixed right-0 top-0 w-[calc(100%-420px)] px-4 pb-24 overflow-auto h-full bg-black"
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

const store = CommonStore();
</script>
<style></style>
