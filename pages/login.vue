<template>
    <div class="login-card flex flex-col items-center text-center p-10">
        <div class="logo">
            <RouterLink to="/">
                <img width="125" src="@/assets/images/icons/spotify-logo.png" />
            </RouterLink>
        </div>
        <h1 class="text-white mt-4 text-[32px] font-bold">Spotify에 로그인하기</h1>
        <div class="button-group flex flex-col gap-2 mt-8">
            <button @click="loginWithApple">
                <span class="login-logo apple-logo"></span>
                <span class="login-text">Apple로 계속하기</span>
            </button>
            <button @click="loginWithGoogle">
                <span class="login-logo google-logo"></span>
                <span class="login-text">Google로 계속하기</span>
            </button>
            <button @click="loginWithFacebook">
                <span class="login-logo facebook-logo"></span>
                <span class="login-text">Facebook으로 계속하기</span>
            </button>
        </div>
        <div class="divider w-screen p-10">
            <div class="h-px bg-white bg-[#121212]"></div>
        </div>
        <button @click="loginWithSpotify">Spotify로 로그인</button>
        <p class="text-gray-300 text-[14px]">
            계정이 없나요?
            <a class="text-white ml-1 underline" href="https://www.spotify.com/kr-ko/signup?flow_id=43bb4eed-49dd-48ed-ad7f-afcc25e39f84%3A1722340880&forward_url=https%3A%2F%2Fwww.spotify.com%2Fkr-ko%2Fpremium%2F%3Futm_source%3Dkr_brand_none_text%26utm_medium%3Dpaidsearch%26utm_campaign%3Dalwayson_kr_kr_premiumbusiness_koreasearch%2Bdesktop%2Bcore_brand%2Btext%2Bexact%2Bkr%2Bgoogle%26gad_source%3D1%26gclid%3DCj0KCQjw-5y1BhC-ARIsAAM_oKnU49vtDmK7HbvdjdWpdtnM6TGhRUuVpHom8Jj5XUBTdls1hdn-NmMaAnN6EALw_wcB%26flow_ctx%3D43bb4eed-49dd-48ed-ad7f-afcc25e39f84%253A1722340880">
                Spotify에 가입하기
            </a>
        </p>
    </div>
</template>
<script setup>
</script>
<style>
.button-group > button {
    background-color: transparent;
    border: 1px solid #878787;
    border-radius: 50px;
    color: white;
    width: 320px;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    transition: border 0.2s ease-in-out;

    display: flex;
    flex-direction: row;
    column-gap: 10px;
    align-items: center;
}
.button-group > button:hover {
    border: 1px solid rgba(255, 255, 255);
}
.button-group .login-logo {
    display: block;
    width: 1.5rem;
    height: 1.5rem;
}
.button-group .apple-logo {
    background: url("https://accounts.scdn.co/sso/images/new-apple-icon.e356139ea90852da2e60f1ff738f3cbb.svg") center center no-repeat;
}
.button-group .google-logo {
    background: url("https://accounts.scdn.co/sso/images/new-google-icon.72fd940a229bc94cf9484a3320b3dccb.svg") center center no-repeat;
}
.button-group .facebook-logo {
    background: url('https://accounts.scdn.co/sso/images/new-facebook-icon.eae8e1b6256f7ccf01cf81913254e70b.svg') center center no-repeat;;
}
.button-group .login-text {
    font-size: 1rem;
    color: #fff;
    text-transform: none;
    letter-spacing: normal;
    margin: auto;
    font-weight: 500;
}
</style>