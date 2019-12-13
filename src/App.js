import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup, GeolocateControl } from "react-map-gl";
import * as data1 from "./data/out.json";


const geolocateStyle = {
  float: 'right',
  margin: '5px',
  padding: '5px'
};

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 32.7763,
    longitude: -96.7969,
    width: "100vw",
    height: "100vh",
    zoom: 10
  });
  const [selectedPoint, setSelectedPoint] = useState(null);
  // console.log(Data1[0].latitude)
  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPoint(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
        {data1.features.map(point => (
          <Marker
            key={point.properties.cty_row_id}
            latitude={point.geometry.coordinates[1]}
            longitude={point.geometry.coordinates[0]}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedPoint(point);
              }}
            >
              <img src="/icons8-marker-100.png" alt="Auction Area" />
            </button>
          </Marker>
        ))}

        {selectedPoint ? (
          <Popup
            latitude={selectedPoint.geometry.coordinates[1]}
            longitude={selectedPoint.geometry.coordinates[0]}
            onClose={() => {
              setSelectedPoint(null);
            }}
          >
              <div>
                <h2>Owner: {selectedPoint.properties.owner}</h2>
                <p>Address: {selectedPoint.properties.mail_address1}</p>
                <p>County: {selectedPoint.properties.county_name}</p>
                <p>Municipality: {selectedPoint.properties.muni_name}</p>
                <p>City: {selectedPoint.properties.addr_city}</p>
                <p>Market Value Land: {selectedPoint.properties.mkt_val_land}</p>
                <p>Market Value Building: {selectedPoint.properties.mkt_val_bldg} </p>
                <p>Acerage: {selectedPoint.properties.acreage_calc}</p>
                <p>Land Use Class: {selectedPoint.properties.land_use_class}</p>
                <p>Mailing Address 1: {selectedPoint.properties.mail_address1}</p>
                <p>Mailing Address 3: {selectedPoint.properties.mail_address3}</p>
                <p>Owner Occupied: {selectedPoint.properties.owner_occupied}</p>
                <p>Building SqFt: {selectedPoint.properties.bldg_sqft}</p>
                <p>Year Built: {selectedPoint.properties.legal_desc1}</p>
                <p>Legal Description 1: {selectedPoint.properties.legal_desc1}</p>
                <p>Updated: {selectedPoint.properties.last_updated}</p>
              </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}
