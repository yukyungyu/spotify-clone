<template>
  <section>
    <STitle>Favorite Artist</STitle>
    <SList type="artist" :data="topArtistList" :icon="icon" :date="date" />
  </section>
</template>

<script setup>
import { CommonStore } from '@/stores/pinia';

const { $axios } = useNuxtApp();
const route = useRoute();
const store = CommonStore();
const topArtistList = ref([]);

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  date: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: Boolean,
    default: false,
  },
});

// 📌 상위 아티스트 리스트 가져오기
const getTopArtist = async () => {
  try {
    const { data } = await $axios.get(
      `https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10&offset=9&market=${store.local}`,
      {
        headers: {
          Authorization: `Bearer ${store.accessToken}`,
        },
      },
    );
    topArtistList.value = data.items;
  } catch (e) {
    console.error(e);
  }
};

onMounted(() => {
  if (store.isUser) {
    getTopArtist();
  }
});
</script>

<style scoped></style>
