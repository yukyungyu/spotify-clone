import { defineStore } from 'pinia';

export const CommonStore = defineStore('common', {
  state: () => ({
    accessToken: '',
    refreshToken: '',
    isUser: false,
    userId: '',
    name: '',
    local: 'ko_KR',
    currentSong: null,
    isPlaying: false,
    deviceId: null,
    currentState: null,
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
    setCurrentState(data) {
      this.currentState = data;
    },
    currentTrack(track) {
      this.currentSong = track;
      console.log('재생곡:', this.currentSong);
    },
    play() {
      this.isPlaying = true;
    },
    pause() {
      this.isPlaying = false;
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
