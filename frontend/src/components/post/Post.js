import React, { useEffect, useRef, useState } from "react";
import { GenericService } from "../../service/genericService";
import { formatDateTime } from "../../utils/core";
import { UserPic } from "../user-pic/UserPic";
import { FaMap, FaRegComment } from "react-icons/fa";
import "./Post.scss";
import { LikeButton } from "../like-button/LikeButton";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../redux/features/userSlice";
import { Comment } from "./comment/Comment";
import { SmallButton } from "../button/Button";
import { useNavigate } from "react-router-dom";
import { MapWithPosts, PostMarker } from "../map-with-posts/MapWithPosts";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

export const Post = ({ post }) => {
  const navigate = useNavigate();
  const [postOwner, setPostOwner] = useState({});
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState(post.comments ?? []);
  const [commentText, setCommentText] = useState();
  const [map, setMap] = useState(false);
  const activeUser = useSelector(currentUser);
  const imageRef = useRef(null);

  useEffect(() => {
    (async () => {
      const userService = new GenericService("users");
      const data = await userService.getByIdAsync(post.userId);
      setPostOwner(data);
    })();
  }, []);

  const likePost = () => {};
  const dislikePost = () => {};
  const openUserProfile = () => {
    navigate(`/profile/${postOwner._id}`);
  };

  const viewMap = (location) => {
    setMap(!map);
    console.log(location);
  };

  const postComment = async () => {
    const postsService = new GenericService("posts");

    try {
      const newComment = {
        content: commentText,
        userId: activeUser?._id,
        date: new Date(),
      };
      await postsService.patchAsync(
        {
          ...post,
          comments: [...post.comments, newComment],
        },
        post._id
      );
      setComments([...comments, newComment]);
      setCommentText("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="post">
      <LoadScript googleMapsApiKey="AIzaSyCRznr_S5ccK9D4I0FBaAUWkpZ7H9TX1-M"></LoadScript>
      <div onClick={openUserProfile} className="post-header">
        <div className="user">
          <UserPic imageurl={postOwner?.imageUrl} />
          <h3>
            {postOwner?.firstName} {postOwner?.lastName}
          </h3>
        </div>
        <p>{formatDateTime(post?.date)}</p>
      </div>
      <p className="post-content">{post?.content}</p>
      {map ? (
        <>
          <GoogleMap
            mapContainerStyle={{
              width: imageRef.current.clientWidth,
              height: imageRef.current.clientHeight,
            }}
            center={post.location}
            zoom={15}
          >
            <PostMarker post={post} />
          </GoogleMap>
        </>
      ) : (
        <img className="post-image" ref={imageRef} src={post?.imageUrl} />
      )}
      <div className="post-footer">
        <LikeButton
          isLiked={true}
          like={() => likePost()}
          dislike={() => dislikePost()}
        />
        <FaRegComment
          onClick={() => setOpen(!open)}
          style={{ cursor: "pointer" }}
        />
        <FaMap
          style={{ cursor: "pointer" }}
          onClick={() => viewMap(post.location)}
        />
      </div>
      <div className="comments">
        {open && (
          <>
            <div className="comment-input-wrapper">
              <input
                className="comment-input"
                placeholder="add a comment"
                onChange={(e) => setCommentText(e.target.value)}
              ></input>
              <button onClick={postComment}>Post</button>
            </div>
            {comments?.map((comment, ind) => {
              return <Comment key={ind} comment={comment} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};
