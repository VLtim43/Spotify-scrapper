import fs from "fs";
import path from "path";
import { getSongsFromPlaylist } from "../api/getSongsFromPlaylist";

export const getSongsFromAllPlaylists = async () => {
  const filePath = path.join(__dirname, "../../data/playlists.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const playlists = JSON.parse(rawData);

  for (const playlist of playlists) {
    const { name, id } = playlist;
    console.log(`Fetching songs for playlist: ${name}`);
    getSongsFromPlaylist(id, name);
  }
};
