import { updateEnv } from "../utils/updateEnv";
import dotenv from "dotenv";
dotenv.config();
import SpotifyWebApi from "spotify-web-api-node";
import express from "express";

export const setSpotifyAuth = () => {
  return new Promise<void>((resolve, reject) => {
    try {
      const scopes = [
        "ugc-image-upload",
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-read-currently-playing",
        "streaming",
        "app-remote-control",
        "user-read-email",
        "user-read-private",
        "playlist-read-collaborative",
        "playlist-modify-public",
        "playlist-read-private",
        "playlist-modify-private",
        "user-library-modify",
        "user-library-read",
        "user-top-read",
        "user-read-playback-position",
        "user-read-recently-played",
        "user-follow-read",
        "user-follow-modify",
      ];

      const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:8888/callback",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
      });

      const app = express();

      app.get("/login", (req, res) => {
        //@ts-ignore
        res.redirect(spotifyApi.createAuthorizeURL(scopes));
      });

      //@ts-ignore
      app.get("/callback", (req, res) => {
        const error = req.query.error;
        const code = req.query.code;

        if (error) {
          console.error("Callback Error:", error);
          res.send(`Callback Error: ${error}`);
          reject(error); // Reject the promise if there's an error
          return;
        }

        spotifyApi
          //@ts-ignore
          .authorizationCodeGrant(code)
          //@ts-ignore
          .then((data) => {
            const access_token = data.body["access_token"];
            const refresh_token = data.body["refresh_token"];
            const expires_in = data.body["expires_in"];

            spotifyApi.setAccessToken(access_token);
            spotifyApi.setRefreshToken(refresh_token);

            // console.log("access_token:", access_token);
            // console.log("refresh_token:", refresh_token);
            res.send("Success! You can now close the window.");

            // console.log(
            //   `Successfully retrieved access token. Expires in ${expires_in} s.`
            // );

            updateEnv(access_token, "TOKEN");

            setInterval(async () => {
              const data = await spotifyApi.refreshAccessToken();
              const access_token = data.body["access_token"];

              // console.log("The access token has been refreshed!");
              // console.log("access_token:", access_token);
              spotifyApi.setAccessToken(access_token);

              updateEnv(access_token, "TOKEN");
            }, (expires_in / 2) * 1000);

            resolve(); // Resolve the promise after successful authentication
          })
          //@ts-ignore
          .catch((error) => {
            console.error("Error getting Tokens:", error);
            res.send(`Error getting Tokens: ${error}`);
            reject(error); // Reject the promise if there's an error
          });
      });

      app.listen(8888, () =>
        console.log(
          "HTTP Server up. Now go to http://localhost:8888/login in your browser."
        )
      );
    } catch (error) {
      console.log(error);
      reject(error); // Reject the promise for outer try-catch errors
    }
  });
};
