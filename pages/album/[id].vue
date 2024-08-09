<template>
  <section>
    <SongThumbnail :data="album.thumbnail" />
    <SongPlayBar
      @play="handlePlay"
      @heart="handleHeart"
      @option="handleOption"
      @playlist="handlePlaylist"
    />
    <SongRow :data="album.tracks" />
    <article>
      <STitle>{{ album.name }}의 곡 더보기</STitle>
    </article>
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

const handlePlay = () => {
  console.log('Play button clicked');
  // Add your play logic here
};

const handleHeart = () => {
  console.log('Heart button clicked');
  // Add your heart logic here
};

const handleOption = () => {
  console.log('Option button clicked');
  // Add your option logic here
};

const handlePlaylist = () => {
  console.log('Playlist button clicked');
  // Add your playlist logic here
};

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
    console.log(response.data, ': data');
  } catch (error) {
    error.value = 'Failed to fetch category ' + error.message;
  }
};
onMounted(() => {
  getIdAlbum();
});
</script>

<style lang="css" scoped></style>
