<template>
  <section>
    <SongThumbnail :data="artist.thumbnail" />
    <SongPlayBar type="artist" />
    <SongRow :data="artist.track" />
  </section>
</template>

<script setup>
import { CommonStore } from '@/stores/pinia';
import { useRoute } from 'vue-router';

const { $axios } = useNuxtApp();
const store = CommonStore();
const route = useRoute();
const artist = reactive({
  thumbnail: {},
  track: [],
});

// 📌 아티스트 가져오기
const getIdArtist = async () => {
  try {
    const response = await $axios.get(
      `https://api.spotify.com/v1/artists/${route.params.id}?market=${store.local}`,
      {
        headers: {
          Authorization: `Bearer ${store.accessToken}`,
        },
      },
    );
    artist.thumbnail = response.data;
  } catch (error) {
    error.value = 'Failed to fetch category ' + error.message;
  }
};

// 📌 아티스트 앨범 리스트
const getIdArtistTrack = async () => {
  try {
    const response = await $axios.get(
      `https://api.spotify.com/v1/artists/${route.params.id}/top-tracks?market=${store.local}`,
      {
        headers: {
          Authorization: `Bearer ${store.accessToken}`,
        },
      },
    );
    artist.track = response.data.tracks;
    console.log(response.data, ': artist');
  } catch (error) {
    error.value = 'Failed to fetch category ' + error.message;
  }
};

const getRelatedArtist = async () => {
  try {
    const response = await $axios.get(
      `https://api.spotify.com/v1/artists/${route.params.id}/related-artists?market=${store.local}`,
      {
        headers: {
          Authorization: `Bearer ${store.accessToken}`,
        },
      },
    );
    console.log(response.data, ': related');
  } catch (error) {
    error.value = 'Failed to fetch category ' + error.message;
  }
};

onMounted(() => {
  getIdArtist();
  getIdArtistTrack();
  // getRelatedArtist();
});
</script>

<style lang="css" scoped></style>
