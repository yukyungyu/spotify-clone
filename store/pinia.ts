import { defineStore } from "pinia"

export const useCounterStore = defineStore('common', () => { 
  const commonState = ref({ 
  })
  return {commonState}
})