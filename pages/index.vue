<template>
  <Album :date="false" />
  <Artist />
  <Playlist />
</template>

<script setup>
definePageMeta({ middleware: 'auth' });
</script>

<style lang="css" scoped></style>
