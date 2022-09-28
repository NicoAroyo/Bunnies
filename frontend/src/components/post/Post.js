import React, { useEffect, useRef, useState } from "react";
import { GenericService } from "../../service/genericService";
import { formatDateTime } from "../../utils/core";
import { UserPic } from "../user-pic/UserPic";
import { FaEdit, FaMap, FaRegComment, FaTrash } from "react-icons/fa";
import "./Post.scss";
import { LikeButton } from "../like-button/LikeButton";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/features/userSlice";
import { Comment } from "./comment/Comment";
import { useNavigate } from "react-router-dom";
import { PostMarker } from "../map-with-posts/MapWithPosts";
import { GoogleMap } from "@react-google-maps/api";

export const Post = ({ post }) => {
  const navigate = useNavigate();
  const [postOwner, setPostOwner] = useState({});
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState(post.comments ?? []);
  const [commentText, setCommentText] = useState();
  const [map, setMap] = useState(false);
  const activeUser = useSelector(currentUser);
  const imageRef = useRef(null);
  const user = useSelector(currentUser);

  useEffect(() => {
    (async () => {
      const userService = new GenericService("users");
      const data = await userService.getByIdAsync(post.userId);
      setPostOwner(data);
    })();
  }, []);

  const likePost = () => {};
  const dislikePost = () => {};
  const deletePost = () => {};
  const editPost = () => {};

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
      <div className="post-header">
        <div onClick={openUserProfile} className="user">
          <UserPic imageurl={postOwner?.imageUrl} />
          <h3>
            {postOwner?.firstName} {postOwner?.lastName}
          </h3>
        </div>
        <div className="post-date-options">
          <p>{formatDateTime(post?.date)}</p>
          {(user?.isAdmin === true || postOwner?._id === user?._id) && (
            <>
              <FaTrash onClick={deletePost} />
              <FaEdit onClick={editPost} />
            </>
          )}
        </div>
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
