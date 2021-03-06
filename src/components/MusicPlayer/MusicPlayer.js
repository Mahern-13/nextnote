import React from "react";
import { Default as Card } from "../Card/Card";
import Wrapper from "../Wrapper/Wrapper";
import "./MusicPlayer.scss";
import { useArtistContext } from "../../context/ArtistContext";

const MusicPlayer = () => {
  const { topTracks } = useArtistContext();

  return (
    <Wrapper assignClass="music-player" styling={{ padding: "0px" }}>
      <Card header="Top Ten Tracks">
        {topTracks.map(track => {
          return (
            <iframe
              key={track.id}
              src={track.sourceUrl}
              height="80"
              title={track.id}
              allowtransparency="true"
              allow="encrypted-media"
            />
          );
        })}
      </Card>
    </Wrapper>
  );
};

export default MusicPlayer;
