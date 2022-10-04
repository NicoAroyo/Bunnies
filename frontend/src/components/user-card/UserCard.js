import React from "react";
import { UserPic } from "../user-pic/UserPic";
import "./UserCard.scss";

export const UserCard = ({ user, children }) => {
  return (
    <div className="user-card">
      <UserPic imageurl={user.imageUrl} />
      <h3>
        {user.firstName} {user.lastName}
      </h3>
      <div>{children}</div>
    </div>
  );
};
