import React from "react";
import { Default as Card } from "../Card/Card.js";
import Wrapper from "../Wrapper/Wrapper";
import "./RelatedArtists.scss";
import {
  useArtistContext,
  useArtistActionsContext
} from "../../context/ArtistContext";

const RelatedArtists = () => {
  const { relatedArtists } = useArtistContext();
  const { fetchArtist } = useArtistActionsContext();

  return (
    <Wrapper assignClass="related-artists">
      <Card header="Related Artists">
        {relatedArtists ? (
          relatedArtists.map(artist => {
            return (
              <Wrapper
                key={artist.id}
                onClick={() => fetchArtist(artist)}
                height="80"
                title={artist.id}
                styling={{ justifyContent: "space-between" }}
              >
                <img
                  src={artist.images[artist.images.length - 1].url}
                  height="64px"
                  width="64px"
                  alt={`Thumbnail-${artist.id}`}
                />
                <p>{artist.name}</p>
              </Wrapper>
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
