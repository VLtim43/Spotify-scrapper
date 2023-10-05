import inquirer from "inquirer";
import { getPlaylists } from "../api/getPlaylists";
// Assuming you have a getSavedSongs function similar to getPlaylists
import { getSavedSongs } from "../api/getSavedSongs";
import { writeJSONToFile } from "./saveJSON";
import { showPlaylists } from "./showPlaylists";

export const mainInterface = async () => {
  // Initialize the main prompt
  while (true) {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "option",
        message: `[ ]`,
        choices: [
          { name: "Fetch playlists", value: "fetchPlaylists" },
          { name: "Fetch saved songs", value: "fetchSavedSongs" },
          // {
          //   name: "Show playlists",
          //   value: "showPlaylists",
          // },
          { name: "Quit", value: "quit" },
        ],
      },
    ]);

    switch (answers.option) {
      case "fetchPlaylists":
        try {
          const { playlistsObject } = await getPlaylists();
          writeJSONToFile("playlists", playlistsObject);
        } catch (error) {
          console.error(
            "An error occurred while fetching and saving playlists:",
            error
          );
        }
        break;

      case "fetchSavedSongs":
        try {
          const { songObjects } = await getSavedSongs();
          writeJSONToFile("savedsongs", songObjects);
        } catch (error) {
          console.error(
            "An error occurred while fetching and saving songs:",
            error
          );
        }
        break;

      // case "showPlaylists":
      //   await showPlaylists();
      //   break;

      case "quit":
        process.exit();

      default:
        console.log("Invalid option selected.");
    }
  }
};
