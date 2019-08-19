import React from "react";
import "./ArtistBrowser.scss";
import MusicPlayer from "../MusicPlayer";
import RelatedArtists from "../RelatedArtists";
import SearchForm from "../SearchForm";
import ArtistInfo from "../ArtistInfo";
import TourDates from "../TourDates";
import { Wrapper } from "../Wrapper";

const Column = ({ children }) => (
  <Wrapper styling={{ flexDirection: "column" }}>{children}</Wrapper>
);
const Row = props => <Wrapper {...props}>{props.children}</Wrapper>;

const ArtistBrowser = () => {
  return (
    <Wrapper>
      <Row>
        <Column styling={{ flexDirection: "column" }}>
          <TourDates />
        </Column>
      </Row>
      <Row styling={{ flexGrow: "2" }}>
        <Column>
          <SearchForm />
          <ArtistInfo />
          <Row styling={{ width: "100%" }}>
            <MusicPlayer />
            <RelatedArtists />
          </Row>
        </Column>
      </Row>
    </Wrapper>
  );
};

export default ArtistBrowser;
