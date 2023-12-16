import axios from 'axios';
import { UserQuery, userQuery } from './validation';
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

export async function getToken() {
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({
      grant_type: 'client_credentials',
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(client_id + ':' + client_secret).toString('base64'),
      },
    }
  );

  return response.data;
}

export async function getArtistInfo(values: UserQuery, access_token: string) {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${values.artistName}&type=artist`,
      {
        headers: { Authorization: 'Bearer ' + access_token },
      }
    );

    return await response.data;
  } catch (error) {
    console.log(error);
  }
}
