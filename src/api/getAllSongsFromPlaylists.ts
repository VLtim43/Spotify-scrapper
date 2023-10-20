import fs from "fs";
import path from "path";
import { getSongsFromPlaylist } from "./getSongsFromPlaylist";

export const getAllSongsFromPlaylists = async () => {
  const filePath = path.join(__dirname, "../../data/playlists.json");

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    console.log("playlists.json does not exist. Exiting...");
    return;
  }

  const rawData = fs.readFileSync(filePath, "utf-8");
  const playlists = JSON.parse(rawData);

  for (const playlist of playlists) {
    const { name, id } = playlist;
    console.log(`Fetching songs for playlist: ${name}`);
    getSongsFromPlaylist(id, name);
  }
};

getAllSongsFromPlaylists();
