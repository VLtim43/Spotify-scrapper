import { setSpotifyAuth } from "./api/auth";
import { mainInterface } from "./interface/main";

setSpotifyAuth()
  .then(() => {
    mainInterface();
  })
  .catch((error) => {
    console.error("Error during authentication:", error);
  });
