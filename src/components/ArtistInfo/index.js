import React from "react";
import { Default as Button } from "../Button/Button.js";
import { Primary as Card } from "../Card/Card.js";
import { Wrapper } from "../Wrapper";

import { useArtistContext } from "../../context/ArtistContext";

const ArtistInfo = props => {
  const { currentArtist } = useArtistContext();
  return !currentArtist ? null : (
    <Wrapper assignClass="artist-info">
      {Object.keys(currentArtist).length > 0 && (
        <Card header={currentArtist.name}>
          <Wrapper>
            <img
              src={currentArtist.images[0].url}
              height="200px"
              width="200px"
              alt={`Thumbnail-${currentArtist.id}`}
            />
            <Wrapper styling={{ flexDirection: "column" }}>
              <p>{`Total Followers: ${currentArtist.followers.total}`}</p>
              <a href={currentArtist.external_urls.spotify}>
                <Button
                  disabled={false}
                  text="Go to Spotify"
                  onClick={() => {}}
                  buttonSize="LARGE"
                />
              </a>
            </Wrapper>
          </Wrapper>
        </Card>
      )}
    </Wrapper>
  );
};

export default ArtistInfo;
