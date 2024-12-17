<template>
  <div v-if="myPlayList.length > 0">
    <ul class="w-full">
      <li class="w-full" v-for="(item, index) in myPlayList" :key="index">
        <NuxtLink :to="{ path: `/playlist/${item.id}` }">
          <div
            class="playlist gap-4 cursor-pointer py-2 rounded-md text-white relative hover:bg-[#ffffff1a]"
          >
            <div
              class="playlist-img rounded-md overflow-hidden w-[48px] h-[48px] size-fit relative"
            >
              <img
                :src="item.images[0].url"
                class="w-full h-full object-cover"
                :alt="item.name"
              />
              <div>
                <button
                  class="play-btn flex items-center justify-center w-full h-full top-0 text-[white] opacity-0 absolute"
                  type="button"
                  aria-label="재생하기"
                >
                  <svg
                    data-encore-id="icon"
                    role="img"
                    aria-hidden="true"
                    class="Svg-sc-ytk21e-0 bneLcE zOsKPnD_9x3KJqQCSmAq w-[16px] h-[16px] fill-white"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div
              class="playlist-info py-2 flex flex-col justify-between gap-1 truncate text-white hover:text-rose-400"
            >
              <p>{{ item.name }}</p>
              <p class="text-zinc-400 text-sm">{{ item.owner.display_name }}</p>
            </div>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { CommonStore } from '@/stores/pinia';

const { $axios } = useNuxtApp();
const store = CommonStore();
const myPlayList = ref([]);

const getMyPlayList = async () => {
  try {
    const response = await $axios.get(
      `https://api.spotify.com/v1/users/${store.userId}/playlists?offset=0&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${store.accessToken}`,
        },
      },
    );
    myPlayList.value = response.data.items;
  } catch (error) {
    console.log('error: ' + error.message);
  }
};

onMounted(() => {
  if (store.isUser) {
    getMyPlayList();
  }
});
</script>

<style scoped>
.playlist {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: 48px;
}
.playlist:hover .play-btn {
  opacity: 1;
}
.playlist:hover .playlist-img > img {
  opacity: 0.5;
}
</style>
