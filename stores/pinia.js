import { defineStore } from 'pinia';

export const CommonStore = defineStore('common', {
  state: () => ({
    accessToken: '',
    refreshToken: '',
    isUser: false,
    name: '',
    local: 'ko_KR',
  }),
  actions: {
    login(token) {
      this.isUser = token.isUser;
      this.accessToken = token.accessToken;
      this.refreshToken = token.refreshToken;
    },
    logOut() {
      this.isUser = false;
      this.accessToken = '';
      this.refreshToken = '';
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
