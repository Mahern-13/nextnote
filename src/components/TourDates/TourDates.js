import React, { useState, useEffect } from "react";
import { Default as Card } from "../Card/Card";
import Wrapper, { Row, Column } from "../Wrapper/Wrapper";
import ReactMapGL, {
  Marker,
  FlyToInterpolator,
  TRANSITION_EVENTS,
  Popup
} from "react-map-gl";
import PhoneIcon from "../Icons/Phone";
import StadiumIcon from "../Icons/Stadium";
import TrebleClef from "../../assets/treble-clef.png";
import "./TourDates.scss";

import { useArtistContext } from "../../context/ArtistContext";

const popupDataStyles = {
  padding: "2px 0px",
  alignItems: "center",
  justifyContent: "center"
};

const TourDates = () => {
  const [viewport, setViewport] = useState({
    zoom: 8,
    width: 300,
    height: 300
  });
  const { events } = useArtistContext();

  const [city, setCity] = useState(null);
  const [showPopup, setPopup] = useState(false);

  const setMapCity = event => {
    const venue = event._embedded.venues[0];
    const { latitude, longitude } = venue.location;
    setCity([parseFloat(latitude), parseFloat(longitude), venue]);
  };

  useEffect(() => {
    if (events.length) {
      setMapCity(events[0]);
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

  const trimPhoneNumber = el =>
    el.match(/(\(|\d)([0-9]|[A-Z]|[()-\s])+\d{2}\)?/)[0].trim();

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
                    <Row>{event.name}</Row>
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

      <div className="map-container">
        {city && (
          <ReactMapGL
            {...viewport}
            transitionDuration={1000}
            transitionInterpolator={new FlyToInterpolator()}
            transitionInterruption={TRANSITION_EVENTS.BREAK}
            onViewportChange={viewport => {
              setViewport(viewport);
            }}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          >
            {showPopup && (
              <Popup
                latitude={city[0]}
                longitude={city[1]}
                closeButton={false}
                closeOnClick={false}
                onClose={() => setPopup(false)}
                anchor="top"
                dynamicPosition={false}
              >
                <Column>
                  <Row styling={popupDataStyles}>
                    <StadiumIcon size="25px" />
                    <div className="venue-name">{city[2].name}</div>
                  </Row>
                  <Row styling={popupDataStyles}>
                    {city[2].city.name}, {city[2].country.countryCode}
                  </Row>
                  {city[2].boxOfficeInfo && (
                    <Row styling={popupDataStyles}>
                      <PhoneIcon size="28" />
                      {trimPhoneNumber(city[2].boxOfficeInfo.phoneNumberDetail)}
                    </Row>
                  )}
                </Column>
              </Popup>
            )}
            <Marker
              latitude={city[0]}
              longitude={city[1]}
              offsetLeft={-15}
              offsetTop={-30}
            >
              <img
                style={{ height: "30px", width: "30px" }}
                alt="clef"
                src={TrebleClef}
                onMouseEnter={() => setPopup(true)}
                onMouseLeave={() => setPopup(false)}
              />
            </Marker>
          </ReactMapGL>
        )}
      </div>
    </Column>
  );
};

export default TourDates;
