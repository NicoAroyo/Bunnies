import React, { useEffect, useState } from "react";
import { GenericService } from "../../service/genericService";
import { formatDateTime } from "../../utils/core";
import { UserPic } from "../user-pic/UserPic";
import { AiOutlineComment } from "react-icons/ai";
import "./Post.scss";
import { LikeButton } from "../like-button/LikeButton";

export const Post = ({ post }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    (async () => {
      const userService = new GenericService("users");
      const data = await userService.getByIdAsync(post.userId);
      setUser(data);
    })();
  }, []);

  const likePost = () => {};
  const dislikePost = () => {};
  const openUserProfile = () => {};
  const openComments = () => {};

  return (
    <div className="post">
      <div onClick={openUserProfile} className="post-header">
        <div className="user">
          <UserPic imageurl={user?.imageUrl} />
          <h3>
            {user?.firstName} {user?.lastName}
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
          onClick={openComments}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};
