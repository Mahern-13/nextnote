import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ArtistBrowser from "../components/ArtistBrowser/ArtistBrowser";
import { ArtistContextProvider } from "../context/ArtistContext";
import spotifyApi from "../api/spotifyApi";
import { withAsync } from "../utils";
import { useUserActionsContext } from "../context/UserContext";
const Home = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const setUser = useUserActionsContext();
  useEffect(() => {
    (async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const didAuth = urlParams.has("spotify_auth");
      const id = urlParams.get("id");
      console.log("did auth?", didAuth);

      if (didAuth && id) {
        localStorage.setItem("userId", id);
        const [response, error] = await withAsync(() =>
          spotifyApi.getAccessToken(id)
        );

        if (error) {
          setIsAuthenticating(false);
          return;
        }
        const { auth_data } = response.data;
        setIsAuthenticated(true);
        console.log("result", response, error);
        localStorage.setItem("auth_data", JSON.stringify(auth_data));
        spotifyApi.setToken(auth_data.access_token);
        setUser({
          ...auth_data,
          userId: id
        });
        setIsAuthenticating(false);
      } else {
        console.log("in authenticating", props);
        const authDataFromStorage = localStorage.getItem("auth_data");
        if (authDataFromStorage) {
          const data = JSON.parse(authDataFromStorage);
          const userId = localStorage.getItem("userId");
          spotifyApi.setToken(data.access_token);
          console.log("auth data found!", data, userId);
          setUser({
            ...data,
            userId
          });
          // TODO: verify tokens
          setIsAuthenticated(true);
          setIsAuthenticating(false);

          return;
        }
      }
    })();
  }, []);

  if (isAuthenticating) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? (
    <ArtistContextProvider>
      <ArtistBrowser />
    </ArtistContextProvider>
  ) : (
    <Redirect to="/login" />
  );
};

export default Home;
