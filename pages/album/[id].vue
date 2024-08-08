<template>
  <section>
    <SongThumbnail :data="album" />
    <div></div>
    <footer />
  </section>
</template>

<script setup>
import { CommonStore } from '@/stores/pinia';
import { useRoute } from 'vue-router';

const local = ref('KR');
const { $axios } = useNuxtApp();
const store = CommonStore();
const album = ref({});
const route = useRoute();

// 📌 앨범 가져오기
const id = route.path.split('/')[2];
const getIdAlbum = async () => {
  try {
    const { data } = await $axios.get(
      `https://api.spotify.com/v1/albums/${id}?market=${local.value}`,
      {
        headers: {
          Authorization: `Bearer ${store.accessToken}`,
        },
      },
    );
    // console.log('album:', data);
    album.value = data;
  } catch (e) {
    console.error(e);
  }
};

onMounted(() => {
  if (store.isUser) {
    getIdAlbum();
  }
});
</script>

<style lang="css" scoped></style>
