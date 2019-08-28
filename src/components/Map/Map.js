import React, { useState } from "react";
import ReactMapGL, {
  Marker,
  FlyToInterpolator,
  TRANSITION_EVENTS,
  Popup
} from "react-map-gl";
import { Row, Column } from "../Wrapper/Wrapper";
import PhoneIcon from "../Icons/Phone";
import StadiumIcon from "../Icons/Stadium";
import TrebleClef from "../../assets/treble-clef.png";
import { trimPhoneNumber } from "../../utils/index";

const popupDataStyles = {
  padding: "2px 0px",
  alignItems: "center",
  justifyContent: "center"
};

const Map = ({ city, viewport, setViewport }) => {
  const [showPopup, setPopup] = useState(false);

  return (
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
  );
};

export default Map;
