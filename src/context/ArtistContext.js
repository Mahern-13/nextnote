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
  events: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setArtistState":
      return action.payload;
    default:
      return state;
  }
};

export const ArtistContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const user = useUserContext();

  const _fetchArtist = async (
    artist = { id: "4dpARuHxo51G3z768sgnrY", name: "Adele" }
  ) => {
    const { id, name } = artist;

    const [response, error] = await withAsync(() =>
      Promise.all([
        spotifyApi.oauth(id, user),
        ticketMasterApi.getUpcomingTours(name)
      ])
    );

    if (error) {
      console.error(error);
      return;
    }

    const [artistData, tourData] = response;

    if (artistData.data && artistData.data.error === "refresh_token_failed") {
      window.location.href = "http://localhost:3000/spotify/login";
      return;
    }

    const base = "https://open.spotify.com";

    const payload = {
      ...artistData.data,
      relatedArtists: artistData.data.relatedArtists.artists.slice(0, 10),
      topTracks: artistData.data.topTracks.tracks.map(track => {
        const src = track.external_urls.spotify;
        const [, urlSecondPart] = src.split(base);
        track.sourceUrl = `${base}/embed${urlSecondPart}`;
        return track;
      }),
      events: tourData
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
