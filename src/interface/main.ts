import inquirer from "inquirer";
import { getPlaylists } from "../api/getPlaylists";
import { writeJSONToFile } from "./saveJSON";

export const mainInterface = async () => {
  // Initialize the main prompt
  while (true) {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "option",
        message: `[ songs locally saved]`,
        choices: [
          { name: "Fetch songs", value: "fetchSavedSongs" },
          { name: "Quit", value: "quit" },
        ],
      },
    ]);

    if (answers.option === "fetchSavedSongs") {
      getPlaylists().then(({ playlistsObject }) => {
        writeJSONToFile("playlists.json", playlistsObject);
      });
    } else if (answers.option === "quit") {
      process.exit();
    }
  }
};
