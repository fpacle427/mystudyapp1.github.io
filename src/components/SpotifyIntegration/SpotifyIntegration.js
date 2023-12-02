// // SpotifyPlayer.js

// import React, { useEffect, useRef } from 'react';
// import SpotifyWebPlayer from 'spotify-web-playback-sdk';

// const SpotifyPlayer = ({ token }) => {
//   const playerRef = useRef();

//   useEffect(() => {
//     if (!playerRef.current) return;

//     const player = new SpotifyWebPlayer({
//       name: 'React Spotify Player',
//       getOAuthToken: cb => {
//         cb(token);
//       },
//       volume: 0.5, // Set your desired volume here
//     });

//     player.connect().then(success => {
//       if (success) {
//         console.log('The Web Playback SDK successfully connected to Spotify!');
//       }
//     });

//     return () => {
//       player.disconnect();
//     };
//   }, [token]);

//   return <div ref={playerRef}></div>;
// };

// export default SpotifyPlayer;
