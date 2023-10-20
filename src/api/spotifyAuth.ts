import { setSpotifyAuth } from "./auth";

setSpotifyAuth()
  .then(() => {
    console.log("Authentication Successful");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Authentication Failed:", err);
    process.exit(1);
  });
