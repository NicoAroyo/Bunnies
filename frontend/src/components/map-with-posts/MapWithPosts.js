import {
  GoogleMap,
  InfoWindowF,
  LoadScript,
  MarkerF,
} from "@react-google-maps/api";

import React, { useEffect, useState } from "react";
import { PostService } from "../../service/posts/postService";
import { Post } from "../post/Post";
import "./MapWithPosts.js";

export const MapWithPosts = () => {
  const [userLocation, setUserLocation] = useState({});
  const [posts, setPosts] = useState([]);

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

  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyCRznr_S5ccK9D4I0FBaAUWkpZ7H9TX1-M">
        <GoogleMap
          mapContainerStyle={{
            width: "100vw",
            height: "100vh",
          }}
          center={userLocation}
          zoom={15}
        >
          {posts?.map((post) => {
            return <> {post.location && <PostMarker post={post} />}</>;
          })}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export const PostMarker = ({ post }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <MarkerF onClick={() => setShowInfo(!showInfo)} position={post.location}>
      {showInfo ? (
        <InfoWindowF
          position={post.location}
          onCloseClick={() => setShowInfo(false)}
        >
          <Post post={post} />
        </InfoWindowF>
      ) : (
        <InfoWindowF
          position={post.location}
          onCloseClick={() => setShowInfo(false)}
        >
          <img
            onClick={() => setShowInfo(!showInfo)}
            style={{ height: "100px", width: "100px", cursor: "pointer" }}
            src={post.imageUrl}
          />
        </InfoWindowF>
      )}
    </MarkerF>
  );
};
