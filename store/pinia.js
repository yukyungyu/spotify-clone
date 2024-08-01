import { defineStore } from 'pinia';
import { LocalStorage } from 'pinia-plugin-persistedstate';
import { defineStore } from "pinia"

export const CommonStore = defineStore('common',{ 
  state: () => ({
    accessToken: '',
    refreshToken: '',
    
  }), 
  actions: {
    login(token) {
      this.accessToken = token.accessToken;
      this.refreshToken = token.refreshToken;
    }
  },
  persist: {
    storage: LocalStorage,
    paths: ['accessToken', 'refreshToken'], 
  },
})