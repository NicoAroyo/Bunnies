import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
  MarkerF,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/features/userSlice";
import { PostService } from "../../service/posts/postService";
import "./AddPost.scss";

export const AddPost = () => {
  const user = useSelector(currentUser);
  const [newPost, setNewPost] = useState({});
  const [marker, setMarker] = useState({});
  const [userLocation, setUserLocation] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((response) => {
      const lat = response.coords.latitude;
      const lng = response.coords.longitude;
      setUserLocation({ lat, lng });
    });
  }, []);

  const selectLocation = (e) => {
    const lng = e.latLng.lng();
    const lat = e.latLng.lat();
    setNewPost({ ...newPost, location: { lat, lng } });
    setMarker({ lat, lng });
  };

  const uploadPost = async () => {
    try {
      const postService = new PostService();
      console.log("NEW POST", newPost);
      postService.uploadPost({ ...newPost, userId: user._id });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {user ? (
        <section className="new-post">
          <img className="user-pic" src={user?.imageUrl} />
          <label>content:</label>
          <input
            onChange={(e) =>
              setNewPost({ ...setNewPost, content: e.target.value })
            }
          ></input>
          <label>image:</label>
          <input
            type={"file"}
            onChange={(e) => setNewPost({ ...newPost, files: e.target.files })}
          ></input>
          <img src=""></img>
          <label>select a location</label>
          <div className="map-container">
            <LoadScript googleMapsApiKey="AIzaSyCRznr_S5ccK9D4I0FBaAUWkpZ7H9TX1-M">
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "940px",
                }}
                center={userLocation}
                zoom={15}
                onClick={selectLocation}
              >
                {marker && (
                  <MarkerF
                    position={marker}
                    onClick={() => setMarker(null)}
                  ></MarkerF>
                )}
              </GoogleMap>
            </LoadScript>
          </div>
          <button onClick={uploadPost}>upload</button>
          <button onClick={() => console.log(newPost)}>LOG POST</button>
        </section>
      ) : (
        <h2>Log in to make a post</h2>
      )}
    </>
  );
};
