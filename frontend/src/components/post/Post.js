import React, { useEffect, useState } from "react";
import { GenericService } from "../../service/genericService";
import { formatDateTime } from "../../utils/core";
import { UserPic } from "../user-pic/UserPic";
import { AiOutlineComment } from "react-icons/ai";
import "./Post.scss";
import { LikeButton } from "../like-button/LikeButton";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../redux/features/userSlice";
import { Comment } from "./comment/Comment";

export const Post = ({ post }) => {
  const [postOwner, setPostOwner] = useState({});
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState(post.comments ?? []);
  const [commentText, setCommentText] = useState();
  const activeUser = useSelector(currentUser);

  useEffect(() => {
    (async () => {
      const userService = new GenericService("users");
      const data = await userService.getByIdAsync(post.userId);
      setPostOwner(data);
    })();
  }, []);

  const likePost = () => {};
  const dislikePost = () => {};
  const openUserProfile = () => {};
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
      <img className="post-image" src={post?.imageUrl} />
      <div className="post-footer">
        <LikeButton
          isLiked={true}
          like={() => likePost()}
          dislike={() => dislikePost()}
        />
        <AiOutlineComment
          onClick={() => setOpen(!open)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="comments">
        {open && (
          <>
            <div>
              <input
                placeholder="add a comment"
                onChange={(e) => setCommentText(e.target.value)}
              ></input>
              <button onClick={postComment}>enter</button>
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
