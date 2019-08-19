import React, { useRef, useEffect } from "react";
import { Default as Card, Secondary as SecondaryCard } from "../Card/Card.js";
import { Wrapper } from "../Wrapper";
import "./TourDates.scss";
import "./moving_marker";

import {
  useArtistContext,
  useArtistActionsContext
} from "../../context/ArtistContext";

/* global L */
const TourDates = ({ artistId }) => {
  //const [events, setEvents] = useState([]);
  //const [position, setPosition] = useState(null);
  const { events, position } = useArtistContext();
  const { dispatch } = useArtistActionsContext();
  // const mapRef = useRef(null);
  // const isMapInitialised = useRef(false);
  // const _initMap = position => {
  //   var map = L.map("map").setView(position, 10);
  //   mapRef.current = map;
  //   var OpenStreetMap_DE = L.tileLayer(
  //     "https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png",
  //     {
  //       maxZoom: 18,
  //       attribution:
  //         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  //     }
  //   ).addTo(map);
  //   // var coordinateArray = [[41.8781, -87.6298]];
  //   // here is the line you draw (if you want to see the animated marker path on the map)
  //   // var myPolyline = L.polyline(coordinateArray);
  //   // myPolyline.setStyle({ color: "transparent" });
  //   // myPolyline.addTo(map);
  //   var eventMarker = L.marker(position).addTo(map);
  //   // var mend = L.marker(coordinateArray[coordinateArray.length - 1]).addTo(map);
  //   // here is the moving marker (6 seconds animation)
  //   // var myIcon = L.icon({
  //   //   iconUrl: "../../assets/flight.png",
  //   //   iconSize: [50, 45]
  //   // });
  //   // var myMovingMarker = L.Marker.movingMarker(coordinateArray, 5000, {
  //   //   autostart: false,
  //   //   icon: myIcon
  //   // });
  //   // setTimeout(function() {
  //   //   map.setView([position], map.getZoom(), {
  //   //     animate: true,
  //   //     pan: {
  //   //       duration: 5
  //   //     }
  //   //   });
  //   //   map.addLayer(myMovingMarker);
  //   //   myMovingMarker.start();
  //   //   setTimeout(function() {
  //   //     map.removeLayer(mstart);
  //   //   }, 5000);
  //   // }, 1000);
  // };

  // // const usePrevious = value => {
  // //   const ref = useRef();
  // //   useEffect(() => {
  // //     ref.current = value;
  // //   }, [value]);

  // //   return ref.current;
  // // };

  // useEffect(() => {
  //   if (position && !isMapInitialised.current) {
  //     isMapInitialised.current = true;
  //     _initMap(position);
  //   }
  // }, [position]);

  // useEffect(() => {
  //   if (position) {
  //     const map = mapRef.current;
  //     // var myMovingMarker = L.Marker.movingMarker(coordinateArray, 5000, {
  //     //   autostart: false,
  //     //   icon: myIcon
  //     // });
  //     map.setView(position, 10);
  //     var eventMarker = L.marker(position).addTo(map);
  //     // map.setView([position], map.getZoom(), {
  //     //   animate: false
  //     //   // pan: {
  //     //   //   duration: 5
  //     //   // }
  //     // });
  //     // map.addLayer(myMovingMarker);
  //     // myMovingMarker.start();
  //     // setTimeout(function() {
  //     //   map.removeLayer(mstart);
  //     // }, 5000);
  //   }
  // }, [position]);

  return (
    <div className="tour-dates" styling={{ flexDirection: "column" }}>
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
                styling={{ justifyContent: "space-between" }}
              >
                <SecondaryCard header={event.name}>
                  <Wrapper>
                    {event.dates.start.localDate +
                      (event.dates.end ? ` to ${event.dates.end}` : "")}
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
        {/* {events.length > 0 && (
          <Map center={position} zoom={10}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"
            />
            <Marker position={position} />
          </Map>
        )} */}
        <div id="map" />
      </div>
    </div>
  );
};

export default TourDates;
