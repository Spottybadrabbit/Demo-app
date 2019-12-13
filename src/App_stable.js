import React, { useState, useEffect, Component  } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import  { GeolocateControl } from 'react-map-gl';
import Geocoder from "react-map-gl-geocoder";
import * as data1 from "./data/out.json";
import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'

/*const geolocateStyle = {
  float: 'right',
  margin: '10px',
  padding: '10px'
};*/

/*const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: 10
};*/

/*</ReactMapGL><Geocoder
          mapRef={this.mapRef}
          onResult={this.handleOnResult}
          onViewportChange={viewport => {setViewport(viewport)
          position='top-left'
        />*/
const geolocateStyle = {
  position: 'absolute',
  top: 10 ,
  right: 10,
};
const TOKEN = process.env.REACT_APP_TOKEN 


export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 32.7763,
    longitude: -96.7969,
    width: "100vw",
    height: "100vh",
    zoom: 10,
  });
  //mapRef = React.createRef()

  
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

  /*handleViewportChange = (viewport) => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }*/

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  /*handleGeocoderViewportChange = (viewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 }

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    })
  }*/

  //render(); {
    return (
      <ReactMapGL
        {...viewport }
        //ref={this.mapRef}
        //{...this.state.viewport}

        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        //onViewportChange={this.handleViewportChange}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        onViewportChange={viewport => {setViewport(viewport);}}


        <Geocoder
          mapRef={this.mapRef}
          onViewportChange={this.handleGeocoderViewportChange}
          mapboxApiAccessToken={TOKEN}
        />
      
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
    )
 //}
}


