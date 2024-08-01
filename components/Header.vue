<template> 
  <header
    class="
    w-[calc(100%-240px)]
    h-[60px]
    fixed
    right-0
    z-20
    bg-[#101010]
    bg-opacity-80
    flex
    items-center
    justify-between
    "  
  >
    <div class="flex items-center ml-6">
      <button type="button" class="rounded-full bg-black p-[1px] cursor-pointer">
        <ChevronLeft fillColor="#FFFFFF" :size="30" />
      </button>
      <button type="button" class="rounded-full bg-black p-[1px] ml-4 cursor-pointer">
        <ChevronRight fillColor="#FFFFFF" :size="30" />
      </button>
    </div>

    <button 
    @click="openMenu = !openMenu" :class="openMenu ? 'bg-[#282828]' : 'bg-black'"
    class="bg-black hover:bg-[#282828] rounded-full p-0.5 mr-8 mt-0.5 cursor-pointer">
      <div class="flex items-center">
        <img 
          class="rounded-full"
          width="27"
          src="https://lh3.googleusercontent.com/fife/ALs6j_EUrRywMTmYnckcI0WHXBd4x1IRzCTAXPJaZBmbsKo23Bmdvv2q9cjkp-egZfrWYEf0AN37amG7PiROlV76CfUG4GuyY_Ph7edbMbuKx--ilQd8rNRKpjYFadYFG-8o6dsFSBpPrORloOZdL9Kydqa_J_ocM-yZ_DfSbKJsjfeQGxY3t-dA0ByRD3_xMDPrBroD90CaVwrl7nAz9GPOK46MhQGGjzf8c8b7RDS3ZxEZleP0k55H_HFIXvffl42mWue_WpJsSQLUWLDEBfo0vV2w2BF7s8e8vCZhrsgfe1gzDlMJ_iwhqwmZq4pJ_C5UxIjP8n96lS2maV6Q3PjB_ZU8Dcsm_K3T_O4yM-LbkCpWfVp2YVZia0LteVLFRTeD4JoOV35wr80ZvqpPVTN_uLz_DbkOQvdn_woNBr6b2hWZw9L4t6ez34A0pvw0KL8MI1bAixz5oMU4u2Y1ebSa1HQ2OepU9OgRs20Aa8OHYxGKpjaJjUrzcI9L5JG_auZfhP2GI6nqNSxffv1xIVigGGLmfAaowQzP8LSHj1TR_6B4oz86KKCzpE57sgh6eeCY5w8oAvbA5krYqrYuHKltAuPdshla8QTKxMtCKx_3RT_yBsBvoo71dRGPDDdsCIAfGxdqoRq98PUfhuIkCYYeCY-aAOZ8amsF23D-6jw1gvtYn8pMhd8dHBKdd3p4o2pWUw_0ParwedsuBvGp-SXIRv42rl2RZAHjqK2_fdWPl0NlRK059tU9lYSBk4nwyv7P2-GIQrFnBfPmX8SsMGkEtSD4kRmNzDimLmuhFglGARQUQSdwZ7vtT56IgSGI8SemJ8NXcdDIoWw3F3XHy74bC2HZDW2EnpfYVu34Aww2ewXuyZd4lz_kWDTfBYE2xQnWevKIgJkI0Omnnt31SEYql4qsnKaedM4bZr-Pj2AjQEOtkPlprRAmh3ZZmeZrxS8nmULbYaJ4b7HR4CvzCNwZPhXFD_lDWEM7_AzJXtFJrtsH62A4a8f0A1L8ncr5lFivl39f7h3BLXfsuvsPI-Ig1D8VocrtKnWGjVNUfE4qD-1-PW2bbJef_DxHLZNbeVdc9rrm2ATQWRDTOsZRwyjnk53tC6KH4xpw76zySxiDJG4n1a5l6jGXTy-0PF9Axs72AWWjKOhnKknFqDtFCPIXYWEYSwPzyyNYjLfbKOg8a9iDiZM-DrVr8yZJvIYsHQjUHMcUY3lh1pqb_sddHv0yXWgeHHUoiJlDSSYhlY2PqYMw0jz1Oy-laBFbUPy-Ivks7B_qWdUbtF3EwgrxK0tz0PHnJ4CCIKLIPNygYEi6B6Ha8KSU3SS6OqSwYtLq739dUTBz3-VVIBOmRDeb1iTOPPi5YPHgQrFpwQV6hO69zGn1BDxXiZWPKlOUJg6O6A=s32-c"
        >
        <div class="text-white text-[14px] ml-1.5 font-semibold">John Weeks Dev</div> 
        <ChevronDown  v-if="!openMenu" @click="openMenu = true" fillColor="#FFFFFF" :size="25" />
        <ChevronUp  v-else @click="openMenu = false" fillColor="#FFFFFF" :size="25" /> 
      </div>
    </button>
    
    <span 
      v-if="openMenu"  
      class="fixed w-[190px] bg-[#282828] shadow-2xl z-50 rounded-sm top-[52px] right-[35px] p-1 cursor-pointer">
      <ul class="text-gray-200 font-semibold text-[14px]">
        <li class="px-3 py-2.5 hover:bg-[#3E3D3D] border-b border-b-gray-600">Profile</li>
        <li class="px-3 py-2.5 hover:bg-[#3E3D3D]">
          <button @click="AUTH_URL">Login</button>
        </li>
      </ul>
    </span>
  </header>   
</template>

<script setup>
import ChevronUp from 'vue-material-design-icons/ChevronUp.vue'
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue'
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'

let openMenu = ref(false)
const config = useRuntimeConfig()  

const AUTH_URL = (e) => {
  e.preventDefault()
  window.location.href =
    `https://accounts.spotify.com/authorize?client_id=${config.public.spotifyClientID}&response_type=code&redirect_uri=${config.public.spotifyURL}`
} 

</script> 