import React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from "react-google-maps";

// styles
import useStyles from "./styles";

const BasicMap = withScriptjs(
  withGoogleMap(() => (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{
        lat: parseFloat(21.027763),
        lng: parseFloat(105.834160 ),
      }}
    >
      <Marker position={{ lat: 21.027763, lng: 105.834160 }} />
    </GoogleMap>
  )),
);

export default function Maps() {
  var classes = useStyles();

  return (
    <div className={classes.mapContainer}>
      <BasicMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg"
        loadingElement={<div style={{ height: "inherit", width: "inherit" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </div>
  );
}
