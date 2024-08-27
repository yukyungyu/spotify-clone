import { CommonStore } from '@/stores/pinia';

export default defineNuxtPlugin(async (nuxtApp) => {
  const store = CommonStore();
  const { $axios } = useNuxtApp();

  // 📌 put - 재생하기
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
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${store.accessToken}`,
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  // 📌 정지하기
  // spotify 공식 api 문서에서는 url과 header만 있으면 된다고 나와있지만 401 에러 발생, data로 빈 객체를 넣어주어야 정상작동함
  const pause = async (deviceId) => {
    try {
      await $axios.put(
        `https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${store.accessToken}`,
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  // 📌 post - 이전으로 건너뛰기
  const prev = async (deviceId) => {
    try {
      await $axios.post(
        `https://api.spotify.com/v1/me/player/previous?device_id=${deviceId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${store.accessToken}`,
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  // 📌 post - 다음으로 건너뛰기
  const next = async (deviceId) => {
    try {
      await $axios.post(
        `https://api.spotify.com/v1/me/player/next?device_id=${deviceId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${store.accessToken}`,
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  // 📌 get - 사용자가 현재 재생 중인 트랙에서 주어진 위치 찾기
  const browsePosition = async (positionMs, deviceId) => {
    try {
      await $axios.get(
        `https://api.spotify.com/v1/me/player/seek?position_ms=${positionMs}?device_id=${deviceId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${store.accessToken}`,
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  // 📌 get - 재생 상태 가져오기
  const currentPlaying = async (deviceId) => {
    try {
      const response = await $axios.get(
        `https://api.spotify.com/v1/me/player?market=KR`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${store.accessToken}`,
          },
        },
      );
      console.log('response:', response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  // 📌 get - 현재 재생중인 트랙 가져오기
  const currentTrack = async (deviceId) => {
    try {
      const response = await $axios.get(
        `https://api.spotify.com/v1/me/player/currently-playing?market=KR&deviceId=${deviceId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${store.accessToken}`,
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  // 📌 put - 반복모드 설정
  const repeat = async (mode) => {
    try {
      const response = await $axios.put(
        `https://api.spotify.com/v1/me/player/repeat?state=${mode}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${store.accessToken}`,
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  // 📌 put - 랜덤재생
  const shuffle = async (mode) => {
    try {
      const response = await $axios.put(
        `https://api.spotify.com/v1/me/player/shuffle?state=${mode}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${store.accessToken}`,
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  nuxtApp.provide('play', play);
  nuxtApp.provide('pause', pause);
  nuxtApp.provide('prev', prev);
  nuxtApp.provide('next', next);
  nuxtApp.provide('browsePosition', browsePosition);
  nuxtApp.provide('currentPlaying', currentPlaying);
  nuxtApp.provide('currentTrack', currentTrack);
  nuxtApp.provide('repeat', repeat);
  nuxtApp.provide('shuffle', shuffle);
});
