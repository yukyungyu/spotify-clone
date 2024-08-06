<template>
  <div
    id="musicPlayer"
    class="fixed flex items-center justify-between bottom-0 w-full z-50 h-[90px] border-t border-t-[#272727] bg-[#181818]"
  >
    <!-- 재생중인 곡 정보 -->
    <div class="flex items-center w-1/4">
      <div class="flex items-center ml-4"></div>
      <div class="flex items-center ml-8"></div>
    </div>
    <!-- 재생바 -->
    <div class="max-w-[35%] mx-auto w-2/4 mb-3"></div>
    <!-- 볼륨 -->
    <div class="flex items-center w-1/4 justify-end pr-10">
      <MusicPlayerVolume />
    </div>
  </div>
</template>

<script setup></script>

<style>
#musicPlayer {
  background: rgba(255, 255, 255, 0.55);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(7.5px);
  -webkit-backdrop-filter: blur(7.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
</style>
