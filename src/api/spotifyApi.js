import Api from "./Api";

class SpotifyApi extends Api {
  oauth(id) {
    const spotifyUrl = id
      ? `spotify/api-using-oauth/${id}`
      : "spotify/api-using-oauth";
    return this.get(spotifyUrl);
  }
}

export default new SpotifyApi();
