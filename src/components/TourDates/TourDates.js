import React, { useState, useEffect } from "react";
import { Default as Card } from "../Card/Card";
import Wrapper, { Row, Column } from "../Wrapper/Wrapper";
import Map from "../Map/Map";
import "./TourDates.scss";
import { useArtistContext } from "../../context/ArtistContext";

const TourDates = () => {
  const [viewport, setViewport] = useState({
    zoom: 8,
    width: 300,
    height: 300
  });
  const { events } = useArtistContext();

  const [city, setCity] = useState(null);

  const setMapCity = event => {
    const venue = event._embedded.venues[0];
    const { latitude, longitude } = venue.location;
    setCity([parseFloat(latitude), parseFloat(longitude), venue]);
  };

  useEffect(() => {
    if (events.length) {
      setMapCity(events[0]);
    } else {
      setCity(null);
    }
  }, [events]);

  useEffect(() => {
    if (city) {
      setViewport(prev => ({
        ...prev,
        latitude: city[0],
        longitude: city[1]
      }));
    }
  }, [city]);

  return (
    <Column className="tour-dates" styling={{ alignItems: "center" }}>
      <Card header="Upcoming Concerts">
        {events.length ? (
          events.map(event => {
            return (
              <Row
                key={event.id}
                onClick={() => setMapCity(event)}
                height="80"
                title={event.id}
                assignClass="event"
                styling={{
                  alignSelf: "center"
                }}
              >
                <Card header={false}>
                  <Column styling={{ padding: "5px", fontSize: "12px" }}>
                    <Row
                      styling={{
                        justifyContent: "flex-start"
                      }}
                    >
                      {event.name}
                    </Row>
                    <Row
                      styling={{
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <p>{`Date: ${event.dates.start.localDate}`}</p>
                      <a
                        href={event.url}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="button button-secondary button-sm"
                        style={{ marginLeft: "10px" }}
                      >
                        Buy Tickets
                      </a>
                    </Row>
                  </Column>
                </Card>
              </Row>
            );
          })
        ) : (
          <Wrapper>
            <p>"Sorry, but there are no events at this time!"</p>
          </Wrapper>
        )}
      </Card>
      <Map viewport={viewport} city={city} setViewport={setViewport} />
    </Column>
  );
};

export default TourDates;
