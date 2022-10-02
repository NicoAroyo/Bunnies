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
import { PostService } from "../../service/posts/postService";
import { Modal } from "../../components/modal/Modal";
import { SmallButton } from "../button/Button";

export const Post = ({ post }) => {
  const navigate = useNavigate();
  const [postOwner, setPostOwner] = useState({});
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState(post.comments ?? []);
  const [commentText, setCommentText] = useState();
  const [map, setMap] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
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

  const likePost = async () => {
    const postService = new PostService();
    const likedPost = {
      ...post,
      likes: [...post.likes, { likedBy: user?._id, type: "heart" }],
    };
    await postService.updatePost(likedPost, likedPost?._id);
  };

  const dislikePost = async () => {
    const postService = new PostService();
    const dislikedPost = {
      ...post,
      likes: post.likes.filter((l) => l.likedBy !== user?._id),
    };
    await postService.updatePost(dislikedPost, dislikedPost?._id);
  };

  const deletePost = async () => {
    const postService = new PostService();
    await postService.deletePost(post);
  };

  const editPost = () => {};

  const openUserProfile = () => {
    navigate(`/profile/${postOwner?._id}`);
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
      <Modal
        show={showDeleteDialog ? 1 : 0}
        closemodal={() => setShowDeleteDialog(false)}
      >
        <div className="delete-dialog">
          <h3>Are you sure you want to delete this beautiful post?</h3>
          <div>
            <SmallButton onClick={() => deletePost()}>
              Yes it belongs in the trash
            </SmallButton>
            <SmallButton onClick={() => setShowDeleteDialog(false)}>
              Noooo
            </SmallButton>
          </div>
        </div>
      </Modal>
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
              <FaTrash onClick={() => setShowDeleteDialog(true)} />
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
            zoom={10}
          >
            <PostMarker post={post} />
          </GoogleMap>
        </>
      ) : (
        <img className="post-image" ref={imageRef} src={post?.imageUrl} />
      )}
      <div className="post-footer">
        <LikeButton
          isLiked={post.likes?.some((l) => l.likedBy === user?._id)}
          like={() => likePost()}
          dislike={() => dislikePost()}
        />
        <FaRegComment
          onClick={() => setOpen(!open)}
          style={{ cursor: "pointer" }}
        />
        <FaMap style={{ cursor: "pointer" }} onClick={() => setMap(!map)} />
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
