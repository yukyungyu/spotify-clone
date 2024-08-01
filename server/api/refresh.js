import SpotifyWebApi from 'spotify-web-api-node';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { refreshToken } = body;

    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3001', // Update to your redirect URI
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        refreshToken,
    });

    try {
        const data = await spotifyApi.refreshAccessToken();
        return {
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in,
        };
    } catch (err) {
        throw createError({ statusCode: 400, message: 'Token refresh failed' });
    }
});