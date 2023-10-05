import SpotifyWebApi from "spotify-web-api-node";
import express, { Request, Response } from "express";
import { updateEnv } from "../utils/updateEnv";
import "dotenv/config";

export const setSpotifyAuth = async () => {
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

    app.get("/login", (req: Request, res: Response) => {
      //@ts-ignore
      res.redirect(spotifyApi.createAuthorizeURL(scopes));
    });

    app.get("/callback", async (req: Request, res: Response) => {
      const error = req.query.error as string;
      const code = req.query.code as string;

      if (error) {
        console.error("Callback Error:", error);
        res.send(`Callback Error: ${error}`);
        return;
      }

      try {
        const data = await spotifyApi.authorizationCodeGrant(code);
        const { access_token, refresh_token, expires_in } = data.body;

        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);

        // console.log("access_token:", access_token);
        // console.log("refresh_token:", refresh_token);
        // res.send("Success! You can now close the window.");

        // console.log(
        //   `Successfully retrieved access token. Expires in ${expires_in} s.`
        // );

        updateEnv(access_token, "TOKEN");

        setInterval(async () => {
          try {
            const data = await spotifyApi.refreshAccessToken();
            const new_access_token = data.body["access_token"];

            console.log("The access token has been refreshed!");
            console.log("access_token:", new_access_token);
            spotifyApi.setAccessToken(new_access_token);

            updateEnv(new_access_token, "TOKEN");
          } catch (refreshError) {
            console.error("Error refreshing the access token:", refreshError);
          }
        }, (expires_in / 2) * 1000);
      } catch (tokenError) {
        console.error("Error getting Tokens:", tokenError);
        res.send(`Error getting Tokens: ${tokenError}`);
      }
    });

    app.listen(8888, () => {
      console.log(
        "HTTP Server up. Now go to http://localhost:8888/login in your browser."
      );
    });
  } catch (setupError) {
    console.error("Error in setSpotifyAuth:", setupError);
  }
};

setSpotifyAuth();
