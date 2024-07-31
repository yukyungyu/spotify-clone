import axios from 'axios'
const router = useRouter()

// const getAccessToken = async () => {
  const config = useRuntimeConfig()

  const clientID = config.public.spotifyClientID
  const clientSecret = config.public.spotifyClientSecret

  const accessToken = ref(null)
  const refreshToken = ref(null)
  const expiresIn = ref(null)

  const basic = btoa(`${clientID}:${clientSecret}`);
  console.log('basic: ', basic)
  const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
  const fetchAuth = async () => {
    try {
      const res = await axios.post('http://localhost:3000/login', { code,})
      console.log(res)

      accessToken.value = res.data.accessToken;
      refreshToken.value = res.data.refreshToken;
      expiresIn.value = res.data.expiresIn;
      // window.history.pushState({}, null, '/');
    } catch {
      console.error('Error fetching access token:', error);
      router.push('/login')
    }
  }
  
  // 토큰 갱신 요청 및 상태 업데이트
  const refreshAuth = async () => {
    try {
      const res = await axios.post('http://localhost:3000/refresh', {
        refresh_token: refreshToken.value,
      })

      accessToken.value = res.data.accessToken;
      expiresIn.value = res.data.expiresIn;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      router.push('/login')
    }
  }

  // 로그인 요청
  fetchAuth()

  // 토큰 갱신 사이드 이펙트 설정
  watch([refreshToken, expiresIn], () => {
    if (!refreshToken.value || !expiresIn.value) return;
    const interval = setInterval(() => {
      refreshAuth();
    }, (expiresIn.value - 60) * 1000);

    onUnmounted(() => clearInterval(interval));
  });
// }