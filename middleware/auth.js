import { CommonStore } from '@/stores/pinia';

export default defineNuxtRouteMiddleware((to, from) => {
  const store = CommonStore();
  // const router = useRouter()
  console.log('to: ', to);
  console.log('from: ', from);

  if (!store.isUser) {
    return navigateTo('/login');
  }
});
