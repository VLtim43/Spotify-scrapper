import fs from "fs";
import path from "path";

const ensureDirectoryExistence = (filePath: string) => {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    ensureDirectoryExistence(dirname); // recursively ensure parent directories exist
    fs.mkdirSync(dirname);
  }
};

export const writeJSONToFile = <T>(
  type: "savedsongs" | "playlistsongs" | "playlists",
  data: T[],
  playlistname?: string
) => {
  let filename;
  let subdir = ""; // default no subdirectory

  switch (type) {
    case "savedsongs":
      filename = "savedsongs.json";
      break;
    case "playlistsongs":
      if (!playlistname) {
        throw new Error("Playlist name is required for 'playlistsongs' type.");
      }
      filename = `${playlistname}.json`;
      subdir = "playlists"; // set the subdirectory for this case
      break;
    case "playlists":
      filename = "playlists.json";
      break;
    default:
      throw new Error("Invalid type provided to writeJSONToFile.");
  }

  const filePath = path.join(__dirname, "../../data", subdir, filename);

  // Ensure the directory exists
  ensureDirectoryExistence(filePath);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};
