import SpotifyWebApi from 'spotify-web-api-node';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const code = body.code;
    console.log(code,"code")

    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3001',
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });

    try {
        const data = await spotifyApi.authorizationCodeGrant(code);
        return {
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        };
    } catch (err) {
        throw createError({ statusCode: 400, message: 'Authentication failed' });
    }
});