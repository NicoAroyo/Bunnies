import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/features/userSlice";
import { PostService } from "../../service/posts/postService";
import { GOOGLE_MAPS_API_KEY } from "../../utils/constants";
import { PostMarker } from "../post-marker/PostMarker";
import { Spinner } from "../spinner/Spinner";
import { Button, SmallButton } from "../button/Button";
import { useNavigate } from "react-router-dom";
import "./MapWithPosts.scss";
import { Modal } from "../modal/Modal";
import { AddPost } from "../add-post/AddPost";
import { calculateDistance } from "../../utils/core";
import { Input } from "../input/Input";

export const MapWithPosts = () => {
  const navigate = useNavigate();
  const [isPublishNewPost, setIsPublishNewPost] = useState(false);
  const user = useSelector(currentUser);
  const [filters, setFilters] = useState({});
  const [userLocation, setUserLocation] = useState({});
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((response) => {
      const lat = response.coords.latitude;
      const lng = response.coords.longitude;
      setUserLocation({ lat, lng });
      console.log({ lat, lng });
    });
    (async () => {
      const postService = new PostService();
      const data = await postService.getPosts();
      console.log(data);
      setPosts(data);
      setFilteredPosts(data);
    })();
  }, []);

  const applyFilters = () => {
    console.log("FILTERS", filters);

    const { dateFrom, dateTo, tags, tagged, radius, publisher } = filters;
    let fps = posts;
    if (dateFrom) fps = fps.filter((p) => p.date >= dateFrom);
    if (dateTo) fps = fps.filter((p) => p.date <= dateTo);
    if (radius && radius !== 0) {
      fps = fps.filter(
        (p) =>
          p.location && calculateDistance(p.location, userLocation) < radius
      );
    }
    if (tags && tags[0].length)
      fps = fps.filter(
        (p) => p.tags && tags.every((t) => p.tags.some((x) => x === t))
      );
    if (tagged && tagged[0].length)
      fps = fps.filter(
        (p) =>
          p.tagged &&
          tagged.every((t) =>
            p.tagged.some((x) => x.label.toLowerCase().includes(t))
          )
      );
    if (publisher)
      fps = fps.filter((p) =>
        p?.publishedBy?.toLowerCase().includes(publisher)
      );

    console.log(fps);

    setFilteredPosts(fps);
  };

  return (
    <div className="map-with-posts">
      <Modal
        show={isPublishNewPost ? 1 : 0}
        closemodal={() => setIsPublishNewPost(false)}
      >
        <AddPost close={() => setIsPublishNewPost(false)}></AddPost>
      </Modal>
      <div className="map-menu">
        <SmallButton onClick={() => setIsPublishNewPost(true)}>
          Publish new post
        </SmallButton>
        <SmallButton onClick={() => navigate("/buns")}>Friends</SmallButton>
        <h2>Filter:</h2>
        <p>by date:</p>
        <div className="form-group">
          <label>From</label>
          <Input
            type="date"
            onChange={(e) =>
              setFilters({ ...filters, dateFrom: e.target.value })
            }
          ></Input>
        </div>

        <div className="form-group">
          <label>To</label>
          <Input
            type="date"
            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
          ></Input>
        </div>

        <div className="form-group">
          <p>By Publisher name:</p>
          <Input
            placeholder={"name"}
            onChange={(e) =>
              setFilters({ ...filters, publisher: e.target.value })
            }
          ></Input>
        </div>

        <div className="form-group">
          <p>By Radius from your location: (in km)</p>
          <Input
            type={"number"}
            onChange={(e) => setFilters({ ...filters, radius: e.target.value })}
          ></Input>
        </div>

        <div className="form-group">
          <p>By tagged users (split by ",")</p>
          <Input
            placeholder={"name"}
            onChange={(e) =>
              setFilters({ ...filters, tagged: e.target.value.split(",") })
            }
          ></Input>
        </div>

        <div className="form-group">
          <p>By post tags (split by ",")</p>
          <Input
            placeholder={"name"}
            onChange={(e) =>
              setFilters({ ...filters, tags: e.target.value.split(",") })
            }
          ></Input>
        </div>
        <SmallButton isactive={1} onClick={applyFilters}>
          Apply Filters
        </SmallButton>
      </div>

      <div className="map">
        {!isLoaded ? (
          <Spinner />
        ) : (
          <GoogleMap
            onClick={(e) => console.log(e.latLng.lat(), e.latLng.lng())}
            mapContainerStyle={{
              width: "100vw",
              height: "100vh",
            }}
            center={userLocation}
            zoom={10}
          >
            <MarkerF
              position={userLocation}
              icon={{
                url: `${process.env.PUBLIC_URL}/images/you-are-here-icon.svg`,
                scaledSize: new window.google.maps.Size(60, 60),
              }}
            ></MarkerF>
            {filteredPosts?.map((post) => {
              return post.location && <PostMarker key={post._id} post={post} />;
            })}
          </GoogleMap>
        )}
      </div>
    </div>
  );
};
