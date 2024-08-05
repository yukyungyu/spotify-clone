<template>
  <div>
    <STitle v-if="route.path === '/'">인기 아티스트</STitle>
    <STitle v-else>아티스트</STitle>
    <SList :data="artist" />
  </div>
</template>

<script setup>
const route = useRoute();

const artist = ref([]);
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

watch(
  () => props.data,
  (newVal) => {
    artist.value = newVal;
  },
);
</script>

<style lang="css" scoped></style>
