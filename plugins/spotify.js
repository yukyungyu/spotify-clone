const clientID = process.env.spotifyClientID
const clientSecret = process.env.spotifyClientSecret
const refreshToken = process.env.spotifyRefreshToken
const basic = Buffer.from(`${clientID}:${clientSecret}`).toString('base64')
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

// 이렇게 하면 제공된 새로 고침 토큰을 사용하여 Spotify에서 액세스 토큰을 가져와 API에 연결할 수 있음
const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }).toString()
  })
  return response.json()
}

// 주어진 사용자 액세스 토큰의 현재 재생 중인 트랙을 가져온다.
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing'
export const getNowPlaying = async () => {
  const { access_token: accessToken } = await getAccessToken()
  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}