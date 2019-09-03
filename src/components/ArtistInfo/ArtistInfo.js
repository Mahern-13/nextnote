import React from "react";
import "../Button/Button.scss";
import { Primary as Card } from "../Card/Card";
import Wrapper, { Row, Column } from "../Wrapper/Wrapper";
import "./ArtistInfo.scss";
import { useArtistContext } from "../../context/ArtistContext";

const ArtistInfo = () => {
  const { currentArtist } = useArtistContext();
  return !currentArtist ? null : (
    <Wrapper assignClass="artist-info">
      {Object.keys(currentArtist).length > 0 && (
        <Card header={currentArtist.name}>
          <Row
            assignClass="artist-info-content"
            styling={{ justifyContent: "space-between" }}
          >
            <img
              src={currentArtist.images[0].url}
              height="200px"
              width="200px"
              alt={`Thumbnail-${currentArtist.id}`}
            />
            <Row styling={{ justifyContent: "center", flex: "2 0 auto" }}>
              <Column>
                <p>{`Total Followers: ${currentArtist.followers.total}`}</p>
                <a
                  href={currentArtist.external_urls.spotify}
                  className="button button-default button-lg"
                >
                  Go to Spotify
                </a>
              </Column>
            </Row>
          </Row>
        </Card>
      )}
    </Wrapper>
  );
};

export default ArtistInfo;
