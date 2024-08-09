<template>
  <section>
    <div class="top-container">
      <div class="thumbnail">
        <img src="" alt="playlist_thumnail" />
      </div>
      <div class="playlist-info">
        <p>플레이리스트</p>
        <h3 class="playlist-title"></h3>
        <div class="playlist-tag"></div>
        <div class="playlist-else"></div>
      </div>
    </div>
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

// 📌 get PlaylistDetail, tracks
const getPlaylistDetail = async (id) => {
  try {
    const response = await $axios.get(
      `https://api.spotify.com/v1/playlists/${id}/tracks?market=${local.value}`,
      {
        headers: {
          Authorization: `Bearer ${store.accessToken}`,
        },
      },
    );
    playlistData.info = response.data.items;
    playlistData.track = response.data.items.map((el) => el.track);
  } catch (error) {
    error.value = 'Failed to fetch category ' + error.message;
  }
};

onMounted(() => {
  getPlaylistDetail(route.params.id);
});
watch(
  () => route.params.id,
  (newVal) => {
    getPlaylistDetail(newVal);
  },
);
</script>

<style lang="css" scoped></style>
