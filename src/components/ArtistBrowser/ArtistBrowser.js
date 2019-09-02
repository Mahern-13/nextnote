import React from "react";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import RelatedArtists from "../RelatedArtists/RelatedArtists";
import SearchForm from "../SearchForm/SearchForm";
import ArtistInfo from "../ArtistInfo/ArtistInfo";
import TourDates from "../TourDates/TourDates";
import Wrapper, { Row, Column } from "../Wrapper/Wrapper";

const ArtistBrowser = () => {
  return (
    <Wrapper>
      <Row styling={{ flex: "1 0 auto", justifyContent: "center" }}>
        <TourDates />
      </Row>
      <Row styling={{ flex: "3 0 auto", justifyContent: "center" }}>
        <Column styling={{ width: "90%" }}>
          <SearchForm />
          <ArtistInfo />
          <Row>
            <MusicPlayer />
            <RelatedArtists />
          </Row>
        </Column>
      </Row>
    </Wrapper>
  );
};

export default ArtistBrowser;
