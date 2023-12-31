import dotenv from "dotenv";
dotenv.config();
import SpotifyWebApi from "spotify-web-api-node";
import { getArtistGenres } from "./getGenres";
import { writeJSONToFile } from "../interface/saveJSON";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

if (process.env.TOKEN) {
  spotifyApi.setAccessToken(process.env.TOKEN);
} else {
  console.error("Access token is undefined");
}

export const getSongsFromPlaylist = async (
  playlistId: string,
  playlistName: string
) => {
  const allTracks = [];
  let offset = 0;

  const { body: initialBody } = await spotifyApi.getPlaylistTracks(playlistId, {
    limit: 50,
  });
  const total = initialBody.total;
  let fetchedCount = 0;

  do {
    const { body } = await spotifyApi.getPlaylistTracks(playlistId, {
      limit: 50,
      offset,
    });

    allTracks.push(...body.items);
    offset += body.limit;
    fetchedCount += body.items.length;

    // if (fetchedCount % 15 === 0) {
    //   console.log(`Fetched ${fetchedCount} songs out of ${total}`);
    // }
  } while (fetchedCount < total);

  const songObjects = await Promise.all(
    allTracks.map(async (fetchedTrack) => {
      if (!fetchedTrack.track) {
        return null;
      }

      const {
        added_at: addedAtRaw,
        track: {
          name,
          id: spotifyId,
          album: { images },
          artists: [{ name: artistName, id: artistId }],
        },
      } = fetchedTrack;

      const addedAt = new Date(addedAtRaw).toISOString();
      const imageUrl = images[0]?.url;
      //   const genres = await getArtistGenres(artistId);

      return {
        artist: artistName,
        name,
        spotifyId,
        addedAt,
        isUrl: false,
        isDownloaded: false,
        url: null,
        imageUrl,
      };
    })
  );

  writeJSONToFile("playlistsongs", songObjects, playlistName);
  return { songObjects, fetchedCount };
};
