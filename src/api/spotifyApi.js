import Api from "./Api";

class SpotifyApi extends Api {
  oauth(artistId, { userId, access_token }) {
    const spotifyUrl = artistId
      ? `spotify/get-spotify-data/${artistId}`
      : "spotify/get-spotify-data";
    return this.post(spotifyUrl, {
      userId,
      access_token
    });
  }

  getAccessToken(id) {
    return this.post("spotify/access_token", {
      id
    });
  }
}

export default new SpotifyApi();
