import React from "react";
import { UserPic } from "../user-pic/UserPic";
import "./UserCard.scss";

export const UserCard = ({ user, children }) => {
  return (
    <div className="user-card">
      <img
        src={
          user.imageUrl || `${process.env.PUBLIC_URL}/images/default-pic.jpg`
        }
      />
      <div>
        <p>
          {user.firstName} {user.lastName}
        </p>
        {children}
        {/* <div>{children}</div> */}
      </div>
    </div>
  );
};

export const UserCardSmall = ({ user, children }) => {
  return (
    <div className="user-card-small">
      <UserPic imageurl={user.imageUrl} />
      <h3>
        {user.firstName} {user.lastName}
      </h3>
      <div>{children}</div>
    </div>
  );
};
