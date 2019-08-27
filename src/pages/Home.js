import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import ArtistBrowser from "../components/ArtistBrowser/ArtistBrowser";
import { ArtistContextProvider } from "../context/ArtistContext";
import { Secondary as Card } from "../components/Card/Card";
import Wrapper, { Row } from "../components/Wrapper/Wrapper";

import ScaleLoader from "react-spinners/ScaleLoader";

import spotifyApi from "../api/spotifyApi";
import { withAsync } from "../utils";
import { useUserActionsContext } from "../context/UserContext";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const setUser = useUserActionsContext();
  useEffect(() => {
    (async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const didAuth = urlParams.has("spotify_auth");
      const id = urlParams.get("id");

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
        localStorage.setItem("auth_data", JSON.stringify(auth_data));
        setUser({
          ...auth_data,
          userId: id
        });
        setIsAuthenticating(false);
      } else {
        const authDataFromStorage = localStorage.getItem("auth_data");
        if (authDataFromStorage) {
          const data = JSON.parse(authDataFromStorage);
          const userId = localStorage.getItem("userId");
          setUser({
            ...data,
            userId
          });
          // TODO: verify tokens
          setIsAuthenticated(false);
          setIsAuthenticating(false);

          return;
        }
      }
      setIsAuthenticated(true);
      setIsAuthenticating(false);
    })();
  }, [setUser]);

  if (isAuthenticating) {
    return (
      <Wrapper assignClass="loading-notice">
        <Card header={false}>
          <Row styling={{ alignItems: "center" }}>
            <h2>Loading</h2>
            <ScaleLoader css={{ margin: "0 0 0 10px" }} color="#fff" />
          </Row>
        </Card>
      </Wrapper>
    );
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
