<template>
  <div class="l-container">
    <slot />
  </div>
</template>

<script setup> 
definePageMeta({ middleware: ['auth'] })
</script>

<style lang="css" scoped>
.l-container { 
  min-height: 1024px;
  padding-bottom: 0; 
}
</style>
