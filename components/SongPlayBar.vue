<template>
  <article class="song_play_bar px-4 py-4 flex justify-between">
    <div class="song_play_bar_bg"></div>
    <div class="flex items-center gap-5">
      <button @click="$emit('play')" class="play">재생</button>
      <button v-if="type !== 'artist'" @click="$emit('heart')">
        <HeartOutline :size="30" />
      </button>
      <button
        v-else
        @click="$emit('follow')"
        class="py-2 px-5 text-sm rounded-[25px] border-2 border-[#9c9c9c] hover:scale-105 ease-linear duration-75 hover:border-[#fff]"
      >
        <span> 팔로우하기</span>
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

const props = defineProps({
  type: {
    type: String,
    default: '',
  },
});

const type = ref(props.type);
const emit = defineEmits(['play', 'heart', 'follow', 'option', 'playlist']);
</script>

<style lang="css" scoped>
@import url('@/assets/css/components/song_play_bar.css');
</style>
