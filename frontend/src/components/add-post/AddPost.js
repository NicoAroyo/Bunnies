import { GoogleMap, MarkerF } from "@react-google-maps/api";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/features/userSlice";
import { PostService } from "../../service/posts/postService";
import { TextArea } from "../../components/input/Input";
import { SmallButton } from "../../components/button/Button";
import { UserPic } from "../../components/user-pic/UserPic";
import { UsersService } from "../../service/users/usersService";
import Select from "react-select";
import "./AddPost.scss";
import { RelationshipsService } from "../../service/relationships/relationshipsService";

export const AddPost = ({ postToEdit = {} }) => {
  const user = useSelector(currentUser);
  const [post, setPost] = useState(postToEdit);
  const [marker, setMarker] = useState({});
  const [userLocation, setUserLocation] = useState({});
  const inputFileRef = useRef(null);
  const [openMap, setOpenMap] = useState(false);
  const [friends, setFriends] = useState([]);
  const [existingPost, setExistingPost] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((response) => {
      const lat = response.coords.latitude;
      const lng = response.coords.longitude;
      setUserLocation({ lat, lng });

      if (Object.keys(postToEdit).length !== 0) {
        setIsEditMode(true);
        setExistingPost(existingPost);
        setPost(postToEdit);
        setMarker(postToEdit?.location ?? {});
      }

      const service = new RelationshipsService();
      (async () => {
        const userFriends = await service.getFriends(user._id);
        setFriends(userFriends);
      })();
    });
  }, []);

  const selectLocation = (e) => {
    const lng = e.latLng.lng();
    const lat = e.latLng.lat();
    setPost({ ...post, location: { lat, lng } });
    setMarker({ lat, lng });
  };

  const uploadPost = async () => {
    try {
      const postService = new PostService();
      if (isEditMode) {
        console.log("NEW POST", postToEdit);
        await postService.updatePost({ ...post, userId: user._id }, post._id);
      } else {
        await postService.uploadPost({ ...post, userId: user._id });
      }
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
                value={post.content}
                onChange={(e) => setPost({ ...post, content: e.target.value })}
              ></TextArea>
            </div>
            <UserPic imageurl={user?.imageUrl} />
          </div>
          <div className="button-container">
            <SmallButton onClick={() => inputFileRef.current.click()}>
              attach an image
            </SmallButton>
            {post.imageUrl && <p>Image Selected</p>}
            <SmallButton onClick={() => setOpenMap(!openMap)}>
              select location
            </SmallButton>
            {Object.keys(marker).length !== 0 && <p>Location Selected</p>}
          </div>
          <input
            ref={inputFileRef}
            type={"file"}
            onChange={(e) => setPost({ ...post, files: e.target.files })}
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
                {Object.keys(marker).length !== 0 && (
                  <MarkerF
                    position={marker}
                    onClick={() => setMarker({})}
                  ></MarkerF>
                )}
              </GoogleMap>
            </div>
          )}
          <h4 className="add-post-tag-others">Tag Other Buns!</h4>
          <Select
            isMulti
            defaultValue={postToEdit?.tagged}
            onChange={(options) => setPost({ ...post, tagged: options })}
            closeMenuOnSelect={false}
            options={friends?.map((f) => {
              return {
                label: `${f.firstName} ${f.lastName}`,
                value: f._id,
              };
            })}
          ></Select>
          <SmallButton isactive={1} onClick={uploadPost}>
            {isEditMode ? "update" : "upload"}
          </SmallButton>
          <SmallButton isactive={1} onClick={() => console.log(post)}>
            log post
          </SmallButton>
        </section>
      ) : (
        <h2>Log in to make a post</h2>
      )}
    </>
  );
};
