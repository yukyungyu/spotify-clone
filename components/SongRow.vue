<template>
  <article>
    <div class="tracks mt-4 mt-2 rounded-md">
      <div
        :class="
          route.path.includes('/album') ? 'album-track-header' : 'track-header'
        "
        class="sticky z-2 h-[36px] px-4 border-b border-solid border-[#ffffff1a] mb-3"
      >
        <div>#</div>
        <div>제목</div>
        <div v-if="route.path.includes('/playlist')">앨범</div>
        <div v-if="route.path.includes('/playlist')">추가한 날짜</div>
        <div>
          <span class="blind">재생</span>
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            class="Svg-sc-ytk21e-0 dYnaPI fill-white"
            width="16"
            height="16"
          >
            <path
              d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
            ></path>
            <path
              d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"
            ></path>
          </svg>
        </div>
      </div>
      <div
        v-for="(track, index) in songList"
        :key="track.id"
        class="track-list px-4 py-2 hover:bg-[#ffffff1a] transition hover:text-[white] rounded-md"
      >
        <div
          :class="
            route.path.includes('/album') ? 'album-track-item' : 'track-item'
          "
          class="flex items-center"
        >
          <!-- 트랙넘버 -->
          <div class="relative track-index text-[#b3b3b3]">
            <div class="track-number flex items-center justify-center opacity">
              {{ index + 1 }}
            </div>
            <button
              class="play-btn flex items-center justify-center w-full h-full top-0 text-[white] opacity-0 absolute"
              type="button"
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

          <!-- 재생곡정보 -->
          <div class="flex items-center gap-3">
            <!-- 앨범이미지 -->
            <!-- /playlist -->
            <div v-if="route.path.includes('/playlist')">
              <div
                v-if="track.album?.images.length > 0"
                class="w-[40px] h-[40px] relative flex items-center justify-between"
              >
                <img
                  :src="track.album.images[2].url"
                  :alt="track.album.name"
                  class="track-image w-[40px] h-[40px] rounded-sm opacity"
                />
              </div>
            </div>
            <div class="track-info flex flex-col">
              <div
                class="track-name text-[18px] text-white cursor-pointer hover:text-[white] hover:underline decoration-1"
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

          <!-- 플레이리스트에서만 출력 -->
          <!-- 앨범 -->
          <div v-if="route.path.includes('/playlist')">
            <div class="text-[#b3b3b3]">{{ track.album.name }}</div>
          </div>
          <!-- 추가한 날짜 -->
          <div v-if="route.path.includes('/playlist')">
            <div class="text-[#b3b3b3]">
              {{ formatDate(track.added_at) }}
            </div>
          </div>

          <!-- 재생시간 -->
          <div class="duration-info text-[#b3b3b3]">
            {{ processTime(track.duration_ms) }}
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
const route = useRoute();

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

const formatDate = (inputDate) => {
  const date = new Date(inputDate);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

watch(
  () => [props.data, props.height],
  (newVal) => {
    songList.value = newVal[0];
    size.value.height = newVal[1];

    // if (route.path.includes('/album')) {
    //   console.log('album songList: ', songList.value);
    // } else if (route.path.includes('/playlist')){
    //   console.log('playlist songList: ', songList.value);
    // }
  },
);
</script>

<style lang="css" scoped>
.track-list:hover .track-number {
  opacity: 0;
}
.track-list:hover .play-btn {
  opacity: 1;
}
.track-list:hover .track-image {
  opacity: 0.5;
}

/* 📌 SongRow style
 * /album에서 보는 songrow는 3열
 * /playlist에서 보는 songrow는 5열이므로 각각 grid 스타일 다름
 */
.album-track-item,
.album-track-header {
  display: grid;
  grid-gap: 16px;
  grid-template-columns:
    [index] 16px [first] minmax(120px, 6fr)
    [last] 120px;
}

.track-item,
.track-header {
  display: grid;
  grid-gap: 16px;
  grid-template-columns:
    [index] 16px [first] minmax(120px, 6fr)
    [var1] minmax(120px, 4fr) [var2] minmax(120px, 3fr)
    [last] minmax(120px, 1fr);
}
</style>
