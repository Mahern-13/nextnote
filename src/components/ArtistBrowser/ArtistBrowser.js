import React from "react";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import RelatedArtists from "../RelatedArtists/RelatedArtists";
import SearchForm from "../SearchForm/SearchForm";
import ArtistInfo from "../ArtistInfo/ArtistInfo";
import TourDates from "../TourDates/TourDates";
import Wrapper, { Row, Column } from "../Wrapper/Wrapper";
import "./ArtistBrowser.scss";

const ArtistBrowser = () => {
  return (
    <Wrapper assignClass="row-content-container">
      <Row assignClass="events-content-row">
        <TourDates />
      </Row>
      <Row assignClass="artist-content-row">
        <Column assignClass="artist-browser-content">
          <SearchForm />
          <ArtistInfo />
          <Row assignClass="music-artists-container">
            <MusicPlayer />
            <RelatedArtists />
          </Row>
        </Column>
      </Row>
    </Wrapper>
  );
};

export default ArtistBrowser;
