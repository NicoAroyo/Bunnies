import React, { useEffect, useState } from "react";
import { GenericService } from "../../../service/genericService";
import { UserPic } from "../../user-pic/UserPic";
import "./Comment.scss";

export const Comment = ({ comment }) => {
  const [commentOwner, setCommentOwner] = useState({});
  useEffect(() => {
    (async () => {
      const userService = new GenericService("users");
      const data = await userService.getByIdAsync(comment.userId);
      setCommentOwner(data);
    })();
  }, []);
  return (
    <div className="comment">
      <UserPic
        style={{ width: "30px", height: "30px" }}
        imageurl={commentOwner?.imageUrl}
      />
      <div className="text">
        <h4>
          {commentOwner?.firstName} {commentOwner?.lastName}
        </h4>
        <p>{comment?.content}</p>
      </div>
    </div>
  );
};
