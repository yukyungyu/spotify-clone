import { defineStore } from 'pinia';

export const CommonStore = defineStore('common', {
  state: () => ({
    accessToken: '',
    refreshToken: '',
    isUser: false,
    name: '',
    local: 'ko_KR',
    currentSong: null,
    isPlaying: false,
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
    playTrack(track) {
      this.currentSong = track;
      this.isPlaying = true;
      console.log('재생곡:', this.currentSong);
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
