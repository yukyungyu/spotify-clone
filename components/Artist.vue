<template>
  <div>
    <STitle v-if="route.path === '/'">인기 아티스트</STitle>
    <STitle v-else>아티스트</STitle>
  </div>
</template>

<script setup>
const route = useRoute();
</script>

<style lang="css" scoped></style>
