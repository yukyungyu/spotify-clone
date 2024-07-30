<template>
    <div class="error d-flex justify-center justify-center">
      <div class="error__content d-flex flex-column justify-center align-center">
        <p>Page not found</p>
        <div class="error__code text-primary-900">{{ error.statusCode }}</div>
        <h2 class="error__text text-h2">Page Not Found</h2>
        <div class="w-100">
          <button block size="large" @click="router.go(-1)">Go back to previous page</button>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
const props = defineProps({
    error: { type: Object, required: true, default: () => {} },
})

const router = useRouter()
</script>
  
<style lang="css" scoped>
.error {
    height: calc(100vh);
}
.error__content {
    width: 414px;
}
.error__code {
    font-size: 160px;
    font-weight: 700;
    line-height: 117px;
    margin-bottom: 30px;
}
.error__text {
    margin-bottom: 30px;
}
</style>
  