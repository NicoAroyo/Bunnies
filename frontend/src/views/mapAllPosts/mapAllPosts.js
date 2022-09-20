import MapComponent from "../../components/map/map";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

export const MapAllPosts = () => {
    return (
      <section>
        <div>
           <MapComponent/>  
        </div>
      </section>
    );
  };