import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ArtistBrowser from "./components/ArtistBrowser";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ArtistBrowser} />
      </Switch>
    </BrowserRouter>
  );
}
