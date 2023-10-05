import inquirer from "inquirer";
import { setSpotifyAuth } from "../api/auth";

export const mainInterface = async () => {
  // Initialize the main prompt
  while (true) {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "option",
        message: `[ songs locally saved]`,
        choices: [
          // { name: "Set Authenticaded user", value: "setUser" },
          { name: "Fetch songs", value: "fetchSavedSongs" },
          { name: "Quit", value: "quit" },
        ],
      },
    ]);

    if (answers.option === "fetchSavedSongs") {
      setSpotifyAuth();
    } else if (answers.option === "quit") {
      process.exit();
    }
  }
};
