<template> 
  <div class="mx-10 my-10 flex items-end justify-between">
    <h2 class="text-2xl">
      <slot />
    </h2>
    <button class="text-sm text-gray-300" type="button" @click="this.$emit('click')">모두 표시</button>
  </div>
</template>

<script setup>   
const emit = defineEmits(['click'])

</script>

<style lang="css" scoped>

</style>