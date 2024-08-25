<template>
  <article>
    <div
      class="mini-tracks mt-4 mt-2 rounded-md"
      :class="`h-[${size?.height}px]`"
    >
      <div
        v-for="track in songList"
        :key="track.id"
        class="mini-track-list px-4 py-2 hover:bg-[#ffffff1a] transition hover:text-[white] rounded-md"
      >
        <div class="minit-rack-item flex items-center">
          <!-- track info -->
          <div class="flex items-center justify-between grow">
            <div class="flex items-center gap-3">
              <div
                v-if="track.album?.images.length > 0"
                class="w-[40px] h-[40px] relative flex items-center justify-between"
              >
                <img
                  :src="track.album.images[2].url"
                  :alt="track.album.name"
                  class="mini-track-image w-[40px] h-[40px] rounded-sm"
                />
                <button
                  class="mini-play-btn flex items-center justify-center w-full h-full text-[white] opacity-0 absolute"
                  type="button"
                  @click="playTrack(track)"
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
              <div class="mini-track-info flex flex-col">
                <div
                  class="mini-track-name text-[18px] text-[#b3b3b3] cursor-pointer hover:text-[white] hover:underline decoration-1"
                >
                  {{ track.name }}
                </div>
                <div
                  class="artist-name text-[14px] text-gray-400 mt-1 cursor-pointer hover:underline decoration-1"
                >
                  {{ track.artists[0].name }}
                </div>
              </div>
            </div>
            <div class="duration-info text-gray-400">
              {{ processTime(track.duration_ms) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { CommonStore } from '@/stores/pinia';
const store = CommonStore();

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
    required: true,
  },
  height: {
    type: Number,
    default: 0,
  },
});

const songList = ref([]);
const size = ref({ width: '', height: '' });

const processTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

watch(
  () => [props.data, props.height],
  (newVal) => {
    songList.value = newVal[0];
    size.value.height = newVal[1];
  },
);

// 📌 MucisPlayer 컴포넌트에 곡 정보 전달
const playTrack = (track) => {
  store.playTrack(track);
  store.togglePlay();
};
</script>

<style lang="css" scoped>
.mini-track-list:hover .mini-play-btn {
  opacity: 1;
}
.mini-track-list:hover .mini-track-image {
  opacity: 0.5;
}
</style>
