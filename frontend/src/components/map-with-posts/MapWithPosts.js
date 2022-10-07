import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { PostService } from "../../service/posts/postService";
import { GOOGLE_MAPS_API_KEY } from "../../utils/constants";
import { PostMarker } from "../post-marker/PostMarker";
import { Spinner } from "../spinner/Spinner";
import "./MapWithPosts.js";
import "./MapWithPosts.scss";

export const MapWithPosts = () => {
  const [buttonText, setButtonText] = useState("=>");
  const [userLocation, setUserLocation] = useState({});
  const [posts, setPosts] = useState([]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((response) => {
      const lat = response.coords.latitude;
      const lng = response.coords.longitude;
      setUserLocation({ lat, lng });
    });
    (async () => {
      const postService = new PostService();
      const data = await postService.getPosts();
      console.log(data);
      setPosts(data);
    })();
  }, []);

 const handleClick = () => {
    const wrapper = document.getElementById('wrapper');
    wrapper.classList.toggle('is-nav-open')
    setButtonText("<=")
  }   


  return !isLoaded ? (
    <Spinner />
  ) : (
  <div>   
     <div  className="map">
      <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "97vh",
      }}
      center={userLocation}
      zoom={15}
    >
      {posts?.map((post) => {
        return <> {post.location && <PostMarker post={post} />}</>;
      })}
    </GoogleMap>
    </div>
     <div id="wrapper" className="wrapper">
      <div  className="wrapper" >
        <div className="nav">
          <button className="nav__icon" type="menu-fold" onClick={() =>handleClick()} >{buttonText}</button>
          <div className="nav__body">
          <p>Data from:</p>
          <input type="text"></input>
          <p>Data to:</p>
          <input type="text"></input>
          <p>publishhers:</p>
          <input type="text"></input>
          <p>Redius from current location:</p>
          <input type="text"></input>
          <p>Image tags(splut by ","):</p>
          <input type="text"></input>
          <p>Tagged users(splut by ","):</p>
          <input type="text"></input>
          <button>Search</button>
          </div>
        </div>
      </div>
  </div>

    </div>  
   );
};
