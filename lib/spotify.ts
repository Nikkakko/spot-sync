import axios from "axios";
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

export async function getToken() {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "client_credentials",
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
    }
  );

  return response.data;
}

export async function getArtistInfo(artistName: string, access_token: string) {
  /* zaza no */

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${artistName}&type=artist`,
      {
        headers: { Authorization: "Bearer " + access_token },
      }
    );

    return await response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getArtistBio(artistName: string) {
  /* fetch using last.fm api */
  /* https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Cher&api_key=YOUR_API_KEY&format=json */
  const response = await axios.get(
    `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=${process.env.LASTFM_API_KEY}&format=json`
  );
  return await response.data;
}

export async function getArtistAlbums(artistId: string, access_token: string) {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/albums`,
      {
        headers: { Authorization: "Bearer " + access_token },
      }
    );

    return await response.data;
  } catch (error) {
    console.log(error);
  }
}
