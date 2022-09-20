import "./mapMenu.scss";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { GoogleMap, InfoWindow, LoadScript, Marker,} from "@react-google-maps/api";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MapComponent from "../../components/map/map";



export const MapMenu = () => {


  return (
    <section>
      <div className="maping right">
      <MapComponent  className="right"/>
      </div>
      <div className="filtering">
        <div className="dobtn">
          <h5>publish new post</h5>
          <button className="btn">new post<img src={''}/></button>
          <div className="frinds">
            <h5>frinds</h5>
            <button className="btn">Frinds<img src={''}/></button>
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
};
