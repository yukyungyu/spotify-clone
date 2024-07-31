require("dotenv").config()
const express = require('express')
const cors = require("cors")
const bodyParser = require("body-parser")

const SpotifyWebApi = require('sporify-web-api-node')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', function (req, res) {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: process.env.spotifyClientID,
        clientSecret: process.env.spotifyClientSecret,
        scope: ['user-read-private', 'user-read-email', 'user-library-read', 'user-top-read']
    })
    console.log('login')
    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
        res.send('Hello World!');
    }).catch(err => {
        res.sendStatus(400)
    })
});
app.post('/refresh', function (req, res) {
    const code = req.body.code
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: process.env.spotifyClientID,
        clientSecret: process.env.spotifyClientSecret,
        refreshToken,
        scope: ['user-read-private', 'user-read-email', 'user-library-read', 'user-top-read']
    })
    console.log('refresh')
    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
        res.send('Hello World!');
    }).catch(err => {
        res.sendStatus(400)
    })
});

module.exports = {
    path: '/api',
    handler: app
}