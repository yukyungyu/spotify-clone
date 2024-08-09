<template>
  <div
    id="musicPlayer"
    class="fixed flex items-center justify-between bottom-0 w-full h-[90px] border-t border-t-[#272727] bg-[#181818]"
  >
    <!-- 재생중인 곡 정보 -->
    <div class="flex items-center w-1/4">
      <div class="flex items-center ml-4">
        <img class="rounded-sm shadow-2xl" src="" width="55" alt="albumCover" />
        <div class="ml-4 flex flex-col gap-1">
          <div class="text-[14px] text-white hover:underline cursor-pointer">
            currentTrack.name
          </div>
          <div
            class="text-[11px] text-gray-300 hover:underline hover:text-white cursor-pointer"
          >
            currentTrack.name
          </div>
        </div>
      </div>
    </div>

    <!-- 재생바 -->
    <div class="max-w-[35%] mx-auto w-2/4">
      <!-- 재생버튼 -->
      <div class="flex-col items-center justify-center">
        <div class="buttons flex items-center justify-center h-[30px]">
          <button class="mx-2">
            <SkipBackward fillColor="#f8f8f8" :size="25" />
          </button>
          <button class="p-1 rounded-full mx-3 bg-[#f8f8f8] hover:scale-105">
            <Play v-if="!isPlaying" fillColor="#181818" :size="25" />
            <Pause v-else fillColor="#181818" :size="25" />
          </button>
          <button class="mx-2">
            <SkipForward fillColor="#f8f8f8" :size="25" />
          </button>
        </div>
      </div>

      <!-- 진행바 -->
      <div class="flex items-center h-[25px]">
        <div
          v-if="isTrackTimeCurrent"
          class="text-white text-[12px] pr-2 pt-[11px]"
        >
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
        <div
          v-if="isTrackTimeTotal"
          class="text-white text-[12px] pl-2 pt-[11px] pt-[11px]"
        >
          isTrackTimeTotal
        </div>
      </div>
    </div>

    <!-- 볼륨 -->
    <div class="flex items-center w-1/4 justify-end pr-10">
      <MusicPlayerVolume />
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

const isHover = ref(false);
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
