import store from './stores/pinia';

export const play = async (uri, deviceId) => {
  try {
    await $axios.put(
      `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
      {
        context_uri: uri,
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
    console.error(e);
  }
};

export const pause = async () => {
  try {
    await $axios.put('https://api.spotify.com/v1/me/player/pause', {
      headers: {
        Authorization: `Bearer ${store.accessToken}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
