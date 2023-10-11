// import inquirer from "inquirer";
// import fs from "fs";
// import path from "path";

// THIS DOES NOT WORK WITH BUN

// export async function showPlaylists() {
//   const filePath = path.join(__dirname, "../../data/playlists.json");

//   if (!fs.existsSync(filePath)) {
//     console.log("No playlists found.");
//     return;
//   }

//   try {
//     const fileContent = fs.readFileSync(filePath, "utf-8");
//     const jsonData = JSON.parse(fileContent);

//     if (Array.isArray(jsonData)) {
//       const playlistNames = jsonData.map(
//         (playlist, index) => `[${index + 1}] ${playlist.name}`
//       );

//       playlistNames.push("[ return ~]");

//       const playlistAnswer = await inquirer.prompt([
//         {
//           type: "list",
//           name: "selectedPlaylist",
//           message: "Select a playlist:",
//           choices: playlistNames,
//         },
//       ]);

//       if (playlistAnswer.selectedPlaylist === "[ return ~]") {
//         console.log("Returning...");
//         return;
//       } else {
//         const selectedPlaylistNumberMatch =
//           playlistAnswer.selectedPlaylist.match(/\[ (\d+) \]/);

//         if (selectedPlaylistNumberMatch) {
//           const selectedPlaylistNumber = parseInt(
//             selectedPlaylistNumberMatch[1],
//             10
//           );

//           console.log("Selected playlist number:", selectedPlaylistNumber);
//         } else {
//           console.log("Invalid option selected.");
//         }
//       }
//     } else {
//       console.log("JSON data is not an array.");
//     }
//   } catch (err) {
//     console.error("Error reading the file:", err);
//   }
// }
