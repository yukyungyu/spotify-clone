<template>
  <section>
    <SongThumbnail :data="album.thumbnail" />
    <div>
      <STitle>{{ album.name }}의 곡 더보기</STitle>
    </div>
    <SongRow :data="album.tracks" />
    <footer />
  </section>
</template>

<script setup>
import { CommonStore } from '@/stores/pinia';
import { useRoute } from 'vue-router';

const local = ref('ko_KR');
const { $axios } = useNuxtApp();
const store = CommonStore();
const route = useRoute();
const album = reactive({
  thumbnail: {},
  name: '',
  tracks: [],
});

// 📌 앨범 가져오기
const getIdAlbum = async () => {
  try {
    const response = await $axios.get(
      `https://api.spotify.com/v1/albums/${route.params.id}?market=${local.value}`,
      {
        headers: {
          Authorization: `Bearer ${store.accessToken}`,
        },
      },
    );
    album.thumbnail = response.data;
    album.name = response.data.artists[0].name;
    album.tracks = response.data.tracks.items;
  } catch (error) {
    error.value = 'Failed to fetch category ' + error.message;
  }
};
onMounted(() => {
  getIdAlbum();
});
</script>

<style lang="css" scoped></style>
