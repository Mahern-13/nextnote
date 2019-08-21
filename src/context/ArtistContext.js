import React, {
  useContext,
  createContext,
  useMemo,
  useReducer,
  useEffect
} from "react";
import spotifyApi from "../api/spotifyApi";
import { withAsync } from "../utils";
import ticketMasterApi from "../api/ticketMasterApi";
import { useUserContext } from "./UserContext";
const ArtistContext = createContext({});
const ArtistActionsContext = createContext({});

export const useArtistContext = () => useContext(ArtistContext);
export const useArtistActionsContext = () => useContext(ArtistActionsContext);

const initialState = {
  topTracks: [],
  relatedArtists: [],
  currentArtist: null,
  position: null,
  events: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setArtistState":
      return action.payload;
    case "setLocation":
      const location = action.payload._embedded.venues[0].location;
      const { latitude, longitude } = location;
      return { ...state, location: [latitude, longitude] };
    default:
      return state;
  }
};

export const ArtistContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const user = useUserContext();

  const _fetchArtist = async (artist = {}) => {
    console.log("USER DATA IN FETCH ARTIST", user);
    const { id = "4dpARuHxo51G3z768sgnrY", name = "Adele" } = artist;

    const [response, error] = await withAsync(() =>
      Promise.all([
        spotifyApi.oauth(id, user),
        ticketMasterApi.getUpcomingTours(name, user)
      ])
    );

    if (error) {
      console.error(error);
      return;
    }
    const [artistData, tourData] = response;

    const base = "https://open.spotify.com";
    const location = tourData.length
      ? tourData[0]["_embedded"].venues[0].location
      : {};
    const { latitude, longitude } = location;
    console.log("artist data", artistData);
    const payload = {
      ...artistData,
      relatedArtists: artistData.data.relatedArtists.artists.slice(0, 10),
      topTracks: artistData.data.topTracks.tracks.map(track => {
        const src = track.external_urls.spotify;
        const [, urlSecondPart] = src.split(base);
        track.sourceUrl = `${base}/embed${urlSecondPart}`;
        return track;
      }),
      events: tourData.slice(0, 4),
      position:
        latitude && longitude
          ? [parseFloat(latitude), parseFloat(longitude)]
          : []
    };
    dispatch({ type: "setArtistState", payload });
  };

  const actions = useMemo(
    () => ({
      fetchArtist: _fetchArtist,
      dispatch
    }),
    []
  );

  useEffect(() => {
    _fetchArtist();
  }, []);

  return (
    <ArtistContext.Provider value={state}>
      <ArtistActionsContext.Provider value={actions}>
        {props.children}
      </ArtistActionsContext.Provider>
    </ArtistContext.Provider>
  );
};
