<template>
  <section>
    <SongThumbnail :data="playlistData.info" />
    <SongPlayBar
      @play="handlePlay"
      @heart="handleHeart"
      @option="handleOption"
      @playlist="handlePlaylist"
    />
    <SongRow :data="playlistData.track" />
    <footer />
  </section>
</template>

<script setup> 
import { CommonStore } from '@/stores/pinia';
const route = useRoute();
const store = CommonStore();
const { $axios } = useNuxtApp(); 

const playlistData = reactive({
  info: [],
  track: [],
});

// 📌 플레이리스트 디테일 가져오기
const getPlaylistDetail = async (id) => {
  try {
    const response = await $axios.get(
      `https://api.spotify.com/v1/playlists/${id}?market=${store.local}`,
      {
        headers: {
          Authorization: `Bearer ${store.accessToken}`,
        },
      },
    );
    playlistData.info = response.data;
    // playlistData.track = response.data.tracks.items

    playlistData.track = response.data.tracks.items.map((item) => ({
      ...item.track,
      added_at: item.added_at,
    }));
    // console.log('playlistData.track:', playlistData.track);
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
