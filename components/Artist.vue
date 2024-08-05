<template>
  <div v-if="route.path === '/'">
    <STitle>인기 아티스트</STitle>
  </div>
  <div v-else>
    <STitle>아티스트</STitle>
  </div>
</template>

<script setup>
const route = useRoute();
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="css" scoped></style>
