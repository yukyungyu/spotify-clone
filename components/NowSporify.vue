<template>
    <section class="flexed-line justify-center mt-5">
    <!-- Spotify Icon Component here -->
    <!-- <SpotifyIcon /> -->
    <!-- This uses Nuxt.js component auto discovery -->
    <div class="flex items-center text-yellow-600 text-xs ml-2">
      <span>{{ currentTrackStr }}</span>
    </div>
    </section>
</template>
  
<script>
import { getNowPlaying } from '../plugins/spotify'
export default {
    data () {
        return { currentTrackStr: '지금은 재생 중인 항목이 없습니다.' }
    },
    watch: {
        '$route.path' () { this.currentTrack() }
    },
    beforeMount () { 
        this.currentTrack() 
    },
    methods: {
        async currentTrack () {
            try {
                const response = await getNowPlaying()
                if (response.status === 200) {
                const { item, is_playing: np } = await response.json()
                this.currentTrackStr = `${np ? 'Now playing:' : 'Last played:'} ${item.name} by ${item.artists.map(artist => artist.name).join(', ')}.`
                }
            } catch (e) {
                this.currentTrackStr = '데이터를 가져올 수 없습니다.'
            }
        }
    }
}
</script>