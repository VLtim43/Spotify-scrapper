// import dotenv from "dotenv";
// dotenv.config();
// import SpotifyWebApi from "spotify-web-api-node";

// const spotifyApi = new SpotifyWebApi({
//   clientId: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
// });

// if (process.env.TOKEN) {
//   spotifyApi.setAccessToken(process.env.TOKEN);
// } else {
//   console.error("Access token is undefined");
// }

// export const getSongsFromPlaylist = async (playlistId: string) => {
//   const allTracks = [];
//   let offset = 0;
//   let fetchedCount = 0;
//   let total = 0;

//   do {
//     const {
//       body: { items, limit, total: currentTotal },
//     } = await spotifyApi.getPlaylistTracks(playlistId, {
//       limit: 50,
//       offset,
//     });

//     if (total === 0) total = currentTotal;

//     allTracks.push(...items);
//     offset += limit;
//     fetchedCount += items.length;
//     if (fetchedCount % 150 === 0) {
//       console.log(`Fetched ${fetchedCount} songs out of ${total}`);
//     }
//   } while (fetchedCount < total);

//   console.log(`Fetched ${fetchedCount} tracks out of ${total}`);

//   // Extract relevant data from tracks
//   const tracksObject = allTracks.map(({ track }) => ({
//     name: track?.name,
//     id: track?.id,
//     durationMs: track?.duration_ms,
//     artist: track?.artists[0].name,
//   }));

//   return { tracksObject };
// };

// // Example usage:
// // getSongsFromPlaylist("0VTt6WHFSKg9PHIFI0lOss");
