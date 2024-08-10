<template>
  <section>
    <SongThumbnail :data="categoryData.message" />
    <SongPlayBar
      @play="handlePlay"
      @heart="handleHeart"
      @option="handleOption"
      @playlist="handlePlaylist"
    />
    <Playlist :data="categoryData.playlists" :icon="true" />
    <footer />
  </section>
</template>

<script setup>
import { CommonStore } from '@/stores/pinia';
const route = useRoute();
const store = CommonStore();
const { $axios } = useNuxtApp();

const categoryData = reactive({
  message: '',
  playlists: [],
});

// 📌 카테고리별 플레이리스트
const getCategoryDetail = async (categoryId) => {
  try {
    const response = await $axios.get(
      `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?limit=14`,
      {
        headers: {
          Authorization: `Bearer ${store.accessToken}`,
        },
      },
    );
    categoryData.message = response.data.message;
    categoryData.playlists = response.data.playlists.items;
    // console.log('response.data: ', response.data);
  } catch (error) {
    error.value = 'Failed to fetch category ' + error.message;
  }
};

onMounted(() => {
  getCategoryDetail(route.params.id);
});
</script>

<style scoped></style>
