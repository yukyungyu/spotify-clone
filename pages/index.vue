<template>
  <Artist icon />
  <Album icon />
  <Playlist icon />
</template>

<script setup>
definePageMeta({ middleware: 'auth' });
</script>

<style lang="css" scoped></style>
