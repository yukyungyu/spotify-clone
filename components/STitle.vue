<template>
  <div class="px-2 pt-10 pb-5 flex items-end justify-between">
    <h2 class="text-2xl font-bold text-white">
      <slot />
    </h2>
    <button
      v-if="route.path === '/'"
      class="text-sm text-gray-500"
      type="button"
      @click="this.$emit('click')"
    >
      모두 표시
    </button>
  </div>
</template>

<script setup>
const route = useRoute();
const emit = defineEmits(['click']);
</script>

<style lang="css" scoped></style>
