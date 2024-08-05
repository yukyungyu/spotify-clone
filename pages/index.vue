<template>
  <Album />
  <Artist />
</template>

<script setup>
definePageMeta({ middleware: ['auth'] });
</script>

<style lang="css" scoped></style>
