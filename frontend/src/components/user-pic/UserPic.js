import React from "react";
import "./UserPic.scss";

export const UserPic = (props) => {
  return <img className="user-picture" {...props} src={props.imageurl} />;
};
