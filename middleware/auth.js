import { CommonStore } from '@/stores/pinia'; 

export default defineNuxtRouteMiddleware((to, from) => { 
  const store = CommonStore();
  // const router = useRouter()

  if (!store.isUser) {
    return navigateTo('/login'); 
  }
});