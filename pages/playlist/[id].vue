<template>
  <section>
    <SongThumbnail :data="playlistData.info" />
    <div class="under-container">
      <div class="play-area flex justify-between items-center">
        <div class="flex gap-6">
          <button class="play-btn"></button>
          <button class="plus-btn"></button>
        </div>
        <div>목록<i></i></div>
      </div>
      <div class="playlist-row">
        <!-- Song List -->
        <SongRow :data="playlistData.track" />
      </div>
    </div>
    <footer />
  </section>
</template>

<script setup>
import { ref } from 'vue';
const route = useRoute();
const store = CommonStore();
const { $axios } = useNuxtApp();

const playlistData = reactive({
  info: [],
  track: [],
});
const local = ref('KR');

// 📌 플레이리스트 디테일 가져오기
const getPlaylistDetail = async (id) => {
  try {
    const response = await $axios.get(
      `https://api.spotify.com/v1/playlists/${id}?market=${local.value}`,
      {
        headers: {
          Authorization: `Bearer ${store.accessToken}`,
        },
      },
    );

    playlistData.info = response.data;
  } catch (error) {
    error.value = 'Failed to fetch category ' + error.message;
  }
};

// 📌 트랙 리스트 가져오기
const getTracks = async (id) => {
  try {
    const response = await $axios.get(
      `https://api.spotify.com/v1/playlists/${id}/tracks?market=${local.value}`,
      {
        headers: {
          Authorization: `Bearer ${store.accessToken}`,
        },
      },
    );
    playlistData.track = response.data.items.map((el) => el.track);
  } catch (error) {
    error.value = 'Failed to fetch category ' + error.message;
  }
};

onMounted(() => {
  getPlaylistDetail(route.params.id);
  getTracks(route.params.id);
});
watch(
  () => route.params.id,
  (newVal) => {
    getPlaylistDetail(newVal);
  },
);
</script>

<style lang="css" scoped></style>
