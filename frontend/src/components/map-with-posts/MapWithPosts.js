import {
  GoogleMap,
  InfoWindowF,
  LoadScript,
  MarkerF,
} from "@react-google-maps/api";

import React, { useEffect, useState } from "react";
import { PostService } from "../../service/posts/postService";

export const MapWithPosts = () => {
  const [userLocation, setUserLocation] = useState();
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
      <GoogleMap
        mapContainerStyle={{
          width: "100vw",
          height: "100vh",
        }}
        center={userLocation}
        zoom={15}
      >
        {posts?.map((post) => {
          return (
            <>
              <PostMarker post={post} />
            </>
          );
        })}
      </GoogleMap>
    </>
  );
};

export const PostMarker = ({ post }) => {
  const [showInfo, setShowInfo] = useState(true);
  return (
    <MarkerF onClick={() => setShowInfo(!showInfo)} position={post.location}>
      {showInfo && (
        <InfoWindowF position={post.location}>
          <img
            style={{ height: "100px", width: "100px" }}
            src={post.imageUrl}
          />
        </InfoWindowF>
      )}
    </MarkerF>
  );
};
