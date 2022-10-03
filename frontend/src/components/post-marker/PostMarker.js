import { InfoWindowF, MarkerF } from "@react-google-maps/api";
import React, { useState } from "react";
import { Post } from "../post/Post";
import "./PostMarker.scss";

export const PostMarker = ({ post }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <MarkerF onClick={() => setShowInfo(!showInfo)} position={post.location}>
      {showInfo ? (
        <InfoWindowF
          options={{ closeBoxURL: "", enableEventPropagation: true }}
          position={post.location}
          onCloseClick={() => setShowInfo(false)}
        >
          <Post post={post} />
        </InfoWindowF>
      ) : (
        <InfoWindowF
          options={{ closeBoxURL: "", enableEventPropagation: true }}
          position={post.location}
          onCloseClick={() => setShowInfo(false)}
        >
          <img
            onClick={() => setShowInfo(!showInfo)}
            style={{
              height: "100px",
              width: "100px",
              marginLeft: "25px",
              cursor: "pointer",
            }}
            src={post.imageUrl}
          />
        </InfoWindowF>
      )}
    </MarkerF>
  );
};
