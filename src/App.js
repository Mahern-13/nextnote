import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ArtistBrowser from "./components/ArtistBrowser/ArtistBrowser";
import { UserContextProvider } from "./context/UserContext";
import { ArtistContextProvider } from "./context/ArtistContext";
export default function App() {
  return (
    <UserContextProvider>
      <ArtistContextProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={ArtistBrowser} />
          </Switch>
        </BrowserRouter>
      </ArtistContextProvider>
    </UserContextProvider>
  );
}
