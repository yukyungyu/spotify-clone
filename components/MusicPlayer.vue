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
          <button
            class="btn-shuffle mx-2"
            @click="shuffle"
            aria-label="랜덤재생하기"
          >
            <Shuffle fillColor="#f8f8f8" :size="25" />
          </button>
          <button
            class="btn-prev mx-2"
            @click="skipPrev"
            aria-label="이전곡으로 건너뛰기"
          >
            <SkipBackward fillColor="#f8f8f8" :size="25" />
          </button>
          <button
            v-if="!isPlaying"
            id="playBtn"
            class="btn-play p-1 rounded-full mx-3 bg-[#f8f8f8] hover:scale-105"
            @click="play(songInfo.album.uri, songInfo.uri)"
            aria-label="재생하기"
          >
            <Play fillColor="#181818" :size="25" />
          </button>
          <button
            v-else
            id="pauseBtn"
            class="btn-play p-1 rounded-full mx-3 bg-[#f8f8f8] hover:scale-105"
            @click="pause"
            aria-label="일시정지하기"
          >
            <Pause fillColor="#181818" :size="25" />
          </button>
          <button
            class="btn-next mx-2"
            @click="skipNext"
            aria-label="다음곡으로 건너뛰기"
          >
            <SkipForward fillColor="#f8f8f8" :size="25" />
          </button>
          <button class="btn-repeat mx-2" @click="repeat" aria-label="반복하기">
            <Repeat fillColor="#f8f8f8" :size="25" />
          </button>
        </div>
      </div>

      <!-- 진행바 -->
      <div class="flex items-center h-[25px]">
        <div class="text-white text-[12px] pr-2 pt-[11px]">
          <!-- {{ processTime(store.currentState.progress_ms) }} -->
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
    <div class="flex items-center w-1/4 justify-end pr-10 gap-4">
      <!-- 기기에 연결하기 -->
      <button
        class="btn-connect flex items-center"
        data-active="false"
        aria-pressed="false"
        aria-label="기기에 연결하기"
      >
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
            d="M6 2.75C6 1.784 6.784 1 7.75 1h6.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 14.25 15h-6.5A1.75 1.75 0 0 1 6 13.25V2.75zm1.75-.25a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h6.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25h-6.5zm-6 0a.25.25 0 0 0-.25.25v6.5c0 .138.112.25.25.25H4V11H1.75A1.75 1.75 0 0 1 0 9.25v-6.5C0 1.784.784 1 1.75 1H4v1.5H1.75zM4 15H2v-1.5h2V15z"
          ></path>
          <path
            d="M13 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-1-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
          ></path>
        </svg>
      </button>
      <button class="btn-volume flex items-center" aria-label="볼륨 조절하기">
        <MusicPlayerVolume />
      </button>
    </div>
  </div>
</template>

<script setup>
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
  $currentState,
  $currentTrack,
  $browsePosition,
  $shuffle,
  $repeat,
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

const currentState = reactive({});

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
    store.deviceId = device_id;

    $currentState(store.deviceId);

    if (store.currentState !== '') {
      isPlaying.value = store.is_playing;
    } else {
      isPlaying.value = false;
    }

    // $browsePosition(store.currentState.progress_ms, store.deviceId);
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

onMounted(() => {});

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
const shuffleMode = ref(false);
const shuffle = () => {
  $shuffle(shuffleMode.value);
  shuffleMode.value = !shuffleMode.value;
};

/* 📌 반복재생
 * track: 현재 트랙 반복
 * context: 현재 컨텍스트를 반복
 * off: 반복 종료
 */
const repeatMode = ['track', 'context', 'off'];
let currentModeIndex = 0;
const repeat = () => {
  currentModeIndex = (currentModeIndex + 1) % repeatMode.length;
  const mode = repeatMode[currentModeIndex];

  // console.log('current mode: ', mode);
  $repeat(mode);
};
</script>

<style>
#musicPlayer {
  background: rgba(255, 255, 255, 0.55);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(7.5px);
  -webkit-backdrop-filter: blur(7.5px);
  border-radius: 28px 28px 0 0;
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
