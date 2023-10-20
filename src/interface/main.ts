// import inquirer from "inquirer";
// import { getPlaylists } from "../api/getPlaylists";
// // Assuming you have a getSavedSongs function similar to getPlaylists
// import { getSavedSongs } from "../api/getSavedSongs";
// import { writeJSONToFile } from "./saveJSON";
// import { getSongsFromPlaylist } from "../api/getSongsFromPlaylist";
// import { getAllSongsFromPlaylists } from "../api/getAllSongsFromPlaylists";

// export const mainInterface = async () => {
//   // Initialize the main prompt
//   while (true) {
//     const answers = await inquirer.prompt([
//       {
//         type: "list",
//         name: "option",
//         message: `[ ]`,
//         choices: [
//           { name: "Fetch Playlists", value: "fetchPlaylists" },
//           { name: "Fetch Saved Songs", value: "fetchSavedSongs" },
//           {
//             name: "Fetch Songs from all Playlists",
//             value: "fetchSongsFromAllPlaylists",
//           },

//           // {
//           //   name: "Show playlists",
//           //   value: "showPlaylists",
//           // },
//           { name: "Quit", value: "quit" },
//         ],
//       },
//     ]);

//     switch (answers.option) {
//       case "fetchPlaylists":
//         try {
//           const { playlistsObject } = await getPlaylists();
//           writeJSONToFile("playlists", playlistsObject);
//         } catch (error) {
//           console.error(
//             "An error occurred while fetching and saving playlists:",
//             error
//           );
//         }
//         break;

//       case "fetchSavedSongs":
//         try {
//           await getSavedSongs();
//         } catch (error) {
//           console.error(
//             "An error occurred while fetching and saving songs:",
//             error
//           );
//         }
//         break;

//       case "fetchSongsFromAllPlaylists":
//         try {
//           await getAllSongsFromPlaylists();
//         } catch (error) {
//           console.error(
//             "An error occurred while fetching and saving songs:",
//             error
//           );
//         }
//         break;

//       // case "showPlaylists":
//       //   await showPlaylists();
//       //   break;

//       case "quit":
//         process.exit();

//       default:
//         console.log("Invalid option selected.");
//     }
//   }
// };
