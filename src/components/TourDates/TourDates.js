import React, { useState, useEffect } from "react";
import { Default as Card, Secondary as SecondaryCard } from "../Card/Card.js";
import Wrapper from "../Wrapper/Wrapper";
import ReactMapGL, { Marker } from "react-map-gl";
import TrebleClef from "../../assets/treble-clef.png";
import "./TourDates.scss";

import {
  useArtistContext,
  useArtistActionsContext
} from "../../context/ArtistContext";

const TourDates = () => {
  const [viewport, setViewport] = useState(null);
  const { events, position } = useArtistContext();
  const { dispatch } = useArtistActionsContext();

  useEffect(() => {
    if (position) {
      setViewport(vp => ({
        ...vp,
        latitude: position[0],
        longitude: position[1]
      }));
    }
  }, [position]);

  return (
    <Wrapper className="tour-dates" styling={{ flexDirection: "column" }}>
      <Card header="Upcoming Concerts">
        {events.length > 0 ? (
          events.map(event => {
            return (
              <Wrapper
                key={event.id}
                onClick={() =>
                  dispatch({ type: "setLocation", payload: event })
                }
                height="80"
                title={event.id}
                styling={{ justifyContent: "space-between", width: "300px" }}
              >
                <SecondaryCard header={false}>
                  <Wrapper
                    styling={{ flexDirection: "column", fontSize: "12px" }}
                  >
                    <p>{event.name}</p>
                    <p>{`Starts: ${event.dates.start.localDate}`}</p>
                  </Wrapper>
                </SecondaryCard>
              </Wrapper>
            );
          })
        ) : (
          <p>"Sorry, but there are no events at this time!"</p>
        )}
      </Card>

      <div className="map-container">
        {position && (
          <div id="map">
            <ReactMapGL
              {...viewport}
              width={300}
              height={300}
              zoom={10}
              onViewportChange={vp => {
                setViewport({ ...viewport, ...vp });
              }}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            >
              <Marker
                latitude={position[0]}
                longitude={position[1]}
                anchor="bottom"
              >
                <img
                  style={{ height: "30px", width: "30px" }}
                  alt="clef"
                  src={TrebleClef}
                />
              </Marker>
            </ReactMapGL>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default TourDates;
