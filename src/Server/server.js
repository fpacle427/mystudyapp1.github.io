// // server.js

// const express = require('express');
// const querystring = require('querystring');
// const SpotifyWebApi = require('spotify-web-api-node');

// const app = express();
// const PORT = 3001;

// const spotifyApi = new SpotifyWebApi({
//   clientId: '9adc9badc8ea41e0b9e147f973fda522',
//   clientSecret: 'd03476c942664e9cbce1fe22a9a7d25d',
//   redirectUri: 'http://localhost:3001/callback',
// });

// app.get('/login', (req, res) => {
//   const scopes = ['user-read-private', 'user-read-email'];
//   const state = 'some-state-to-protect-against-csrf';
//   const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
//   res.redirect(authorizeURL);
// });

// app.get('/callback', async (req, res) => {
//   const { code } = req.query;
  
//   try {
//     const data = await spotifyApi.authorizationCodeGrant(code);
//     const accessToken = data.body['access_token'];
    
//     // Handle the accessToken, save it securely, and respond accordingly
//     res.send({ accessToken });
//   } catch (err) {
//     res.status(500).send({ error: 'Internal Server Error' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
