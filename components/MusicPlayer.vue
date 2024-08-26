<template>
  <div
    id="musicPlayer"
    class="fixed flex items-center justify-between bottom-0 w-full h-[90px] border-t border-t-[#272727] bg-[#181818]"
  >
    <!-- 재생중인 곡 정보 -->
    <div class="flex items-center w-1/4">
      <div class="flex items-center ml-4">
        <img
          :src="songInfo.album.images[0].url"
          class="rounded-sm shadow-2xl"
          width="55"
          alt="albumCover"
        />
        <div class="ml-4 flex flex-col gap-1">
          <div class="text-[14px] text-white hover:underline cursor-pointer">
            {{ songInfo.name }}
          </div>
          <div
            class="text-[11px] text-gray-300 hover:underline hover:text-white cursor-pointer"
          >
            {{ songInfo.album.artists[0].name }}
          </div>
        </div>
      </div>
    </div>

    <!-- 재생바 -->
    <div class="max-w-[35%] mx-auto w-2/4">
      <!-- 재생버튼 -->
      <div class="flex-col items-center justify-center">
        <div class="buttons flex items-center justify-center h-[30px]">
          <button class="btn-shuffle mx-2" @click="shuffle">
            <Shuffle fillColor="#f8f8f8" :size="25" />
          </button>
          <button class="btn-prev mx-2" @click="skipPrev">
            <SkipBackward fillColor="#f8f8f8" :size="25" />
          </button>
          <button
            v-if="!isPlaying"
            id="playBtn"
            class="btn-play p-1 rounded-full mx-3 bg-[#f8f8f8] hover:scale-105"
            @click="play(songInfo.album.uri, songInfo.uri)"
          >
            <Play fillColor="#181818" :size="25" />
          </button>
          <button
            v-else
            id="pauseBtn"
            class="btn-play p-1 rounded-full mx-3 bg-[#f8f8f8] hover:scale-105"
            @click="pause"
          >
            <Pause fillColor="#181818" :size="25" />
          </button>
          <button class="btn-next mx-2" @click="skipNext">
            <SkipForward fillColor="#f8f8f8" :size="25" />
          </button>
          <button class="btn-repeat mx-2" @click="repeat">
            <Repeat fillColor="#f8f8f8" :size="25" />
          </button>
        </div>
      </div>

      <!-- 진행바 -->
      <div class="flex items-center h-[25px]">
        <div class="text-white text-[12px] pr-2 pt-[11px]">
          isTrackTimeCurrent
        </div>
        <div
          class="w-full relative mt-2 mb-3"
          @mouseenter="isHover = true"
          @mouseleave="isHover = false"
        >
          <input
            type="range"
            class="absolute rounded-full my-2 w-full h-0 z-40 appearance-none bg-opacity-100 focus:outline-none accent-white"
          />
          <div
            class="pointer-events-none mt-[6px] absolute h-[4px] z-10 inset-y-0 left-0 w-0"
            :style="`width: ${range}%;`"
            :class="isHover ? 'bg-green-500' : 'bg-white'"
          />
          <div
            class="absolute h-[4px] z-[-0] mt-[6px] inset-y-0 left-0 w-full bg-gray-500 rounded-full"
          />
        </div>
        <div class="text-white text-[12px] pl-2 pt-[11px] pt-[11px]">
          {{ processTime(songInfo.duration_ms) }}
        </div>
      </div>
    </div>

    <!-- 볼륨 -->
    <div class="flex items-center w-1/4 justify-end pr-10">
      <!-- <MusicPlayerVolume /> -->
      <div class="flex items-center ml-8">
        <PictureInPictureBottomRight
          class="ml-4"
          fillColor="#FFFFFF"
          :size="18"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import PictureInPictureBottomRight from 'vue-material-design-icons/PictureInPictureBottomRight.vue';
import Play from 'vue-material-design-icons/Play.vue';
import Pause from 'vue-material-design-icons/Pause.vue';
import SkipBackward from 'vue-material-design-icons/SkipBackward.vue';
import SkipForward from 'vue-material-design-icons/SkipForward.vue';
import Shuffle from 'vue-material-design-icons/Shuffle.vue';
import Repeat from 'vue-material-design-icons/Repeat.vue';

const {
  $play,
  $pause,
  $prev,
  $next,
  $currentPlaying,
  $currentTrack,
  $browsePosition,
} = useNuxtApp();
import { CommonStore } from '@/stores/pinia';

const script = document.createElement('script');
// web Playback SDK CDN
script.src = 'https://sdk.scdn.co/spotify-player.js';
script.async = true;

const isHover = ref(false);

const store = CommonStore();
const songInfo = computed(() => store.currentSong);

const { isPlaying } = storeToRefs(store);

const processTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// 📌 플레이어 초기화
// Web Playback SDK가 성공적으로 로드되면 자동으로 호출
document.body.appendChild(script);

window.onSpotifyWebPlaybackSDKReady = () => {
  const player = new Spotify.Player({
    name: 'Web Playback SDK',
    getOAuthToken: (cb) => {
      cb(store.accessToken);
    },
    volume: 0.5,
  });

  // console.log('player:', player);

  // Ready,
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
    store.setDevice(device_id);

    // 📌 현재 재생중인 트랙
    $currentTrack();
    // 📌 재생 상태 가져오기
    $currentPlaying();
    // 재생중이면 재생하기
    if (isPlaying) {
    }
  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  player.addListener('initialization_error', ({ message }) => {
    console.error(message);
  });

  player.addListener('authentication_error', ({ message }) => {
    console.error(message);
  });

  player.addListener('account_error', ({ message }) => {
    console.error(message);
  });

  // document.getElementById('playBtn').onclick = function () {
  //   player.togglePlay();
  // };

  player.connect();
};

// 📌 재생
const play = (context_uri, track_uri) => {
  $play(context_uri, track_uri, store.deviceId);
  store.play();
};

// 📌 일시정지
const pause = () => {
  store.pause();
  $pause(store.deviceId);
};

// 📌 이전 곡 재생
const skipPrev = () => {
  $prev(store.deviceId);
  // 이전 곡 정보 전달

  store.play();
};

// 📌 다음 곡 재생
const skipNext = () => {
  $next(store.deviceId);
  // 다음 곡 정보 전달

  store.play();
};

// 📌 셔플
const shuffle = () => {};

// 📌 반복재생
const repeat = () => {};
</script>

<style>
#musicPlayer {
  background: rgba(255, 255, 255, 0.55);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(7.5px);
  -webkit-backdrop-filter: blur(7.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  z-index: 999;
}
.rangeDotHidden[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 0;
  height: 0;
}
</style>
