import "./mapMenu.scss";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import { GoogleMap, InfoWindow, LoadScript, Marker } from "@react-google-maps/api";


function MapMenu() {
  const initialMarkers = [
    {
        position: {
            lat: 28.625485,
            lng: 79.821091
        },
        label: { color: "white", text: "P1" },
        draggable: true
    },
    {
        position: {
            lat: 28.625293,
            lng: 79.817926
        },
        label: { color: "white", text: "P2" },
        draggable: false
    },
    {
        position: {
            lat: 28.625182,
            lng: 79.81464
        },
        label: { color: "white", text: "P3" },
        draggable: true
    },
];

const [activeInfoWindow, setActiveInfoWindow] = useState("");
const [markers, setMarkers] = useState(initialMarkers);

const containerStyle = {
    width: "100%",
    height: "400px",
}

const center = {
    lat: 28.626137,
    lng: 79.821603,
}

const mapClicked = (event) => { 
    console.log(event.latLng.lat(), event.latLng.lng()) 
}

const markerClicked = (marker, index) => {  
    setActiveInfoWindow(index)
    console.log(marker, index) 
}

const markerDragEnd = (event, index) => { 
    console.log(event.latLng.lat())
    console.log(event.latLng.lng())
}

  return (
    <section>
      <div className="maping">
      <LoadScript googleMapsApiKey='AIzaSyCRznr_S5ccK9D4I0FBaAUWkpZ7H9TX1-M'>
            <GoogleMap 
                mapContainerStyle={containerStyle} 
                center={center} 
                zoom={15}
                onClick={mapClicked}
            >
                {markers.map((marker, index) => (
                    <Marker 
                        key={index} 
                        position={marker.position}
                        label={marker.label}
                        draggable={marker.draggable}
                        onDragEnd={event => markerDragEnd(event, index)}
                        onClick={event => markerClicked(marker, index)} 
                    >
                        {
                            (activeInfoWindow === index)
                            &&
                            <InfoWindow position={marker.position}>
                                <b>{marker.position.lat}, {marker.position.lng}</b>
                            </InfoWindow>
                        }  
                    </Marker>
                ))}
            </GoogleMap>
        </LoadScript>
      </div>
      <div className="filtering">
        <div>
          <h5>publish new post</h5>
          <button>publish new post</button>
          <div className="frinds">
            <h5>frinds</h5>
            <button>frinds</button>
          </div>
        </div>
        <div>
          <table>date from :</table>
          <input type="text"></input>
          <table>date to :</table>
          <input type="text"></input>
        </div>
        <div>
          <table>publishers :</table>
          <input type="text"></input>
        </div>
        <div>
          <table>radius from current location :</table>
          <input type="text"></input>
        </div>
        <div>
          <table>image tags (splut by ',') :</table>
          <input type="text"></input>
        </div>
        <div>
          <table>tagged users (splut by ',') :</table>
          <input type="text"></input>
        </div>
      </div>
    </section>
  );
}
export default MapMenu;
