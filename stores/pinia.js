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
    deviceId: null,
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
    setDevice(deviceId) {
      this.deviceId = deviceId;
    },
    playTrack(track) {
      this.currentSong = track;
      this.isPlaying = true;
      console.log('재생곡:', this.currentSong);
    },
    togglePlay() {
      this.isPlaying = !this.isPlaying;
      // console.log('this.isPlaying:', this.isPlaying);
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
