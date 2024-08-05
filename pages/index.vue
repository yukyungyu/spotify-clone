<template>
  <Album />
  <Artist />
</template>

<script setup>
definePageMeta({ middleware: ['auth'] });
// import { useRoute, useRouter } from 'vue-router';
// const route = useRoute();
// const router = useRouter();
// const store = CommonStore();

// onMounted(() => {
//   console.log('로그인?', store.isUser);
//   if (!store.isUser && route.path === '/') {
//     router.push('/login');
//   }
// });
</script>

<style lang="css" scoped></style>
