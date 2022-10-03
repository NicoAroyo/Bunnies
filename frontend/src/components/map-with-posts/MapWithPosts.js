import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { PostService } from "../../service/posts/postService";
import { GOOGLE_MAPS_API_KEY } from "../../utils/constants";
import { PostMarker } from "../post-marker/PostMarker";
import { Spinner } from "../spinner/Spinner";
import "./MapWithPosts.js";

export const MapWithPosts = () => {
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

  return !isLoaded ? (
    <Spinner />
  ) : (
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
  );
};
