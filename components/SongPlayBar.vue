<template>
  <article class="song_play_bar my-5 flex justify-between">
    <div class="flex items-center gap-5">
      <button @click="$emit('play')" class="play">재생</button>
      <button @click="$emit('heart')">
        <HeartOutline :size="30" />
      </button>
      <button @click="$emit('option')">
        <DotsHorizontal :size="30" />
      </button>
    </div>
    <div class="flex items-center gap-5">
      <span class="text-sm">목룍</span>
      <button @click="$emit('playlist')">
        <PlayListMusic :size="30" />
      </button>
    </div>
  </article>
</template>

<script setup>
import HeartOutline from 'vue-material-design-icons/HeartOutline.vue';
import PlayListMusic from 'vue-material-design-icons/PlayListMusic.vue';
import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue';

const emit = defineEmits(['play', 'heart', 'option', 'playlist']);
</script>

<style lang="css" scoped>
@import url('@/assets/css/components/song_play_bar.css');
</style>
