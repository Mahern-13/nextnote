import React from "react";
import { Default as Card } from "../Card/Card.js";
import Wrapper, { Row, Column } from "../Wrapper/Wrapper";
import "./RelatedArtists.scss";
import {
  useArtistContext,
  useArtistActionsContext
} from "../../context/ArtistContext";

const RelatedArtists = () => {
  const { relatedArtists } = useArtistContext();
  const { fetchArtist } = useArtistActionsContext();

  return (
    <Wrapper
      assignClass="related-artists"
      styling={{ padding: "0px", maxWidth: "40%" }}
    >
      <Card header="Related Artists">
        {relatedArtists ? (
          relatedArtists.map(artist => {
            return (
              <Row
                key={artist.id}
                onClick={() => fetchArtist(artist)}
                height="80"
                title={artist.id}
                assignClass="artist"
                styling={{ justifyContent: "space-between" }}
              >
                <Column styling={{ justifyContent: "center" }}>
                  <img
                    src={artist.images[artist.images.length - 1].url}
                    height="64px"
                    width="64px"
                    alt={`Thumbnail-${artist.id}`}
                  />
                </Column>
                <Column
                  styling={{
                    flexWrap: "wrap",
                    justifyContent: "center"
                  }}
                >
                  <p>{artist.name}</p>
                </Column>
              </Row>
            );
          })
        ) : (
          <div>
            We're sorry but there don't appear to be any related artists!
          </div>
        )}
      </Card>
    </Wrapper>
  );
};

export default RelatedArtists;
