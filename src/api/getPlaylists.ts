import dotenv from "dotenv";
dotenv.config();
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

process.env.TOKEN
  ? spotifyApi.setAccessToken(process.env.TOKEN)
  : console.error("Access token is undefined");

export const getPlaylists = async () => {
  const allPlaylists = [];
  let offset = 0;
  let fetchedCount = 0;
  let total = 0;

  do {
    const {
      body: { items, limit, total: currentTotal },
    } = await spotifyApi.getUserPlaylists("cool-hippo43", {
      limit: 50,
      offset,
    });

    if (total === 0) total = currentTotal;

    allPlaylists.push(...items);
    offset += limit;
    fetchedCount += items.length;
  } while (fetchedCount < total);

  console.log(`Fetched ${fetchedCount} playlists out of ${total}`);

  const playlistsObject = allPlaylists.map(({ name, id, tracks }) => ({
    name,
    id,
    totalTracks: tracks.total,
  }));
  return { playlistsObject };
};
