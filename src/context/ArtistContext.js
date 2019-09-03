import React, {
  useContext,
  createContext,
  useMemo,
  useReducer,
  useEffect,
  useCallback
} from "react";
import { Primary as Card } from "../components/Card/Card";
import Wrapper, { Row } from "../components/Wrapper/Wrapper";
import { Default as Button } from "../components/Button/Button";

import spotifyApi from "../api/spotifyApi";
import { withAsync, withTries } from "../utils";
import ticketMasterApi from "../api/ticketMasterApi";
import { useUserContext } from "./UserContext";
import { withStateMerge } from "./contextUtils";
const ArtistContext = createContext({});
const ArtistActionsContext = createContext({});

export const useArtistContext = () => useContext(ArtistContext);
export const useArtistActionsContext = () => useContext(ArtistActionsContext);

const initialState = {
  topTracks: [],
  relatedArtists: [],
  currentArtist: null,
  events: [],
  fetchDataError: false
};

const reducer = withStateMerge((state, action) => {
  switch (action.type) {
    case "setArtistState":
      return action.payload;
    case "FETCH_DATA_ERROR":
      return {
        fetchDataError: action.payload
      };
    default:
      return state;
  }
});

const _getTours = async name => {
  const [response, error] = await withTries(
    () => ticketMasterApi.getUpcomingTours(name),
    500
  );
  if (error) {
    return [];
  }
  return response;
};

const fetchPayload = async (artist, user) => {
  const { id, name } = artist;
  const [response, error] = await withAsync(() =>
    Promise.all([spotifyApi.oauth(id, user), _getTours(name)])
  );

  if (error) {
    console.error(error);

    return {
      fetchDataError: true
    };
  }

  const [artistData, tourData] = response;

  if (artistData.data && artistData.data.error === "refresh_token_failed") {
    window.location.href = "http://localhost:3000/spotify/login";
    return {};
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

  return payload;
};

export const ArtistContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const user = useUserContext();

  const _fetchArtist = useCallback(
    async (artist = { id: "4dpARuHxo51G3z768sgnrY", name: "Adele" }) => {
      dispatch({ type: "FETCH_DATA_ERROR", payload: false });
      const payload = await fetchPayload(artist, user);
      if (payload.fetchDataError) {
        dispatch({ type: "FETCH_DATA_ERROR", payload: artist });
        return;
      }
      dispatch({ type: "setArtistState", payload });
    },
    [user]
  );

  const actions = useMemo(
    () => ({
      fetchArtist: _fetchArtist,
      dispatch
    }),
    [_fetchArtist]
  );

  useEffect(() => {
    _fetchArtist();
  }, [_fetchArtist]);

  return (
    <ArtistContext.Provider value={state}>
      <ArtistActionsContext.Provider value={actions}>
        {state.fetchDataError ? (
          <Wrapper
            styling={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%)`
            }}
          >
            <Card header={<b>Error</b>}>
              <Row
                styling={{
                  padding: "15px",
                  marginRight: "-15px",
                  flexWrap: "wrap"
                }}
              >
                <h3 style={{ marginRight: "15px" }}>
                  There was a problem while fetching data.
                </h3>
                <Button
                  buttonSize="LARGE"
                  onClick={() => _fetchArtist(state.fetchDataError)}
                  text="Retry"
                  styling={{ margin: "0px 15px" }}
                ></Button>
              </Row>
            </Card>
          </Wrapper>
        ) : (
          props.children
        )}
      </ArtistActionsContext.Provider>
    </ArtistContext.Provider>
  );
};
