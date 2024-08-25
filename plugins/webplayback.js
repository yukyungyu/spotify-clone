import { CommonStore } from '@/stores/pinia';

export default defineNuxtPlugin(async (nuxtApp) => {
  const store = CommonStore();
  const { $axios } = useNuxtApp();

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${store.accessToken}`,
  };

  /* 예시 URI
   * Context_uri: 재생할 컨텍스트의 spotify uri로 type이 album이어야한다.
   * offset: { uri: track_uri } - 재생할 곡의 track_uri
   */
  const play = async (context_uri, track_uri, deviceId) => {
    try {
      await $axios.put(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
          context_uri: context_uri,
          offset: { uri: track_uri },
          position_ms: 0,
        },
        {
          headers: headers,
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const pause = async (deviceId) => {
    try {
      await $axios.put(
        `https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`,
        {
          headers: headers,
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  nuxtApp.provide('play', play);
  nuxtApp.provide('pause', pause);
});
