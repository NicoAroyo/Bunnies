import './mapMenu.css';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


  
 function MapMenu () {

    return<section>
    <div className='maping'>
       <h1>Map</h1>
    </div>
    <div  className='filtering'>
    <div>
        <h5>publish new post</h5>
        <button>publish new post</button>
        <div className='frinds'>
            <h5>frinds</h5>
            <button>frinds</button>
        </div>
        
    </div>
    <div>
        <table>date from :</table>
        <input type="text" ></input>
        <table>date to :</table>
        <input type="text" ></input>
    </div>
    <div>
        <table>publishers :</table>
        <input type="text" ></input>
    </div>
    <div>
        <table>radius from current location :</table>
        <input type="text" ></input>
    </div>
    <div>
        <table>image tags (splut by ',') :</table>
        <input type="text" ></input>
    </div>
       <div>
        <table>tagged users (splut by ',') :</table>
        <input type="text" ></input>
    </div>
    </div>
 </section>
  }
export default MapMenu;