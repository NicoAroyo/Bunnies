import { GoogleMap, InfoWindow, Marker, MarkerF } from "@react-google-maps/api";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/features/userSlice";
import { PostService } from "../../service/posts/postService";
import { Input, TextArea } from "../../components/input/Input";
import { SmallButton } from "../../components/button/Button";
import { UserPic } from "../../components/user-pic/UserPic";
import { UsersService } from "../../service/users/usersService";
import { RelationshipsService } from "../../service/relationships/relationshipsService";
import Select from "react-select";
import "./AddPost.scss";

export const AddPost = () => {
  const user = useSelector(currentUser);
  const [newPost, setNewPost] = useState({});
  const [marker, setMarker] = useState({});
  const [userLocation, setUserLocation] = useState({});
  const inputFileRef = useRef(null);
  const [openMap, setOpenMap] = useState(false);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((response) => {
      const lat = response.coords.latitude;
      const lng = response.coords.longitude;
      setUserLocation({ lat, lng });
    });

    const service = new UsersService();
    (async () => {
      const userFriends = await service.getUsers();
      console.log(userFriends);
      setFriends(userFriends);
    })();
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
          <div className="new-post-content">
            <div className="new-post-form-group">
              <label>Post content</label>
              <TextArea
                onChange={(e) =>
                  setNewPost({ ...setNewPost, content: e.target.value })
                }
              ></TextArea>
            </div>
            <UserPic imageurl={user?.imageUrl} />
          </div>
          <div className="button-container">
            <SmallButton onClick={() => inputFileRef.current.click()}>
              attach an image
            </SmallButton>
            <SmallButton onClick={() => setOpenMap(!openMap)}>
              select location
            </SmallButton>
          </div>
          <input
            ref={inputFileRef}
            type={"file"}
            onChange={(e) => setNewPost({ ...newPost, files: e.target.files })}
          ></input>
          <img src=""></img>
          {openMap && (
            <div className="map-container">
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "20rem",
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
            </div>
          )}
          <h4 className="add-post-tag-others">Tag Other Buns!</h4>
          <Select
            isMulti
            closeMenuOnSelect={false}
            options={friends?.map((f) => {
              return {
                label: `${f.firstName} ${f.lastName}`,
                value: f._id,
              };
            })}
          ></Select>
          <SmallButton isActive={true} onClick={uploadPost}>
            upload
          </SmallButton>
        </section>
      ) : (
        <h2>Log in to make a post</h2>
      )}
    </>
  );
};
