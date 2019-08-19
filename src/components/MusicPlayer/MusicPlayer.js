import React, { useState, useEffect } from "react";
import { Default as Card } from "../Card/Card.js";
import { Wrapper } from "../Wrapper";
import "./MusicPlayer.scss";
import spotifyApi from "../../api/spotifyApi";
import { withAsync } from "../../utils";
import { useArtistContext } from "../../context/ArtistContext";

const MusicPlayer = props => {
  const { topTracks } = useArtistContext();

  return (
    <Wrapper assignClass="music-player">
      <Card header="Top Ten Tracks">
        {topTracks.map(track => {
          return (
            <iframe
              key={track.id}
              src={track.sourceUrl}
              height="80"
              title={track.id}
            />
          );
        })}
      </Card>
    </Wrapper>
  );
};

export default MusicPlayer;
