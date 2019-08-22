import Api from "./Api";

class SpotifyApi extends Api {
  oauth(artistId, { userId }) {
    const spotifyUrl = artistId
      ? `spotify/api-using-oauth/${artistId}`
      : "spotify/api-using-oauth";
    return this.post(spotifyUrl, {
      userId
    });
  }

  getAccessToken(id) {
    return this.post("spotify/access_token", {
      id
    });
  }
}

export default new SpotifyApi();
