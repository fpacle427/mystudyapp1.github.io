// // spotifyService.js

// export async function getProfile(accessToken) {
//     try {
//       const response = await fetch('https://api.spotify.com/v1/me', {
//         headers: {
//           Authorization: 'Bearer ' + accessToken
//         }
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to fetch user profile');
//       }
  
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//       return null;
//     }
//   }
  