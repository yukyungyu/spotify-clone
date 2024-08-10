<template>
  <section>
    <STitle v-if="route.path === '/'">Spotify 플레이리스트</STitle>
    <STitle v-if="route.path === '/search'">플레이리스트</STitle>
    <STitle v-if="route.path.includes('/category')">새로운 음악 찾기</STitle>
    <SList type="playlist" :data="playlist" :icon="icon" />
  </section>
</template>

<script setup>
import { CommonStore } from '@/stores/pinia';
const { $axios } = useNuxtApp();
const route = useRoute(); 
const store = CommonStore();
const playlist = ref([]); 

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  icon: {
    type: Boolean,
    default: false,
  },
});

// 📌 플레이 리스트 가져오기
const getPlaylists = async () => {
  try {
    const { data } = await $axios.get(
      `https://api.spotify.com/v1/browse/featured-playlists?offset=9&market=${store.local}`,
      {
        headers: {
          Authorization: `Bearer ${store.accessToken}`,
        },
      },
    );
    playlist.value = data.playlists.items;
  } catch (error) {
    console.error(error);
  }
};

watch(
  () => props.data,
  (newVal) => {
    playlist.value = newVal;
  },
);

onMounted(() => {
  if (store.isUser) {
    getPlaylists();
  }
});
</script>

<style lang="css" scoped></style>
