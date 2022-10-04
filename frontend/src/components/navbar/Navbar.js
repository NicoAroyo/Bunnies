import React from "react";
import { GiRabbitHead } from "react-icons/gi";
import { RiChatSmileFill } from "react-icons/ri";
import { FaMap } from "react-icons/fa";
import { SmallButton } from "../button/Button";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, logout } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { UserPic } from "../user-pic/UserPic";

export const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(currentUser);

  const pageLogout = () => {
    try {
      localStorage.removeItem("access-token");
      dispatch(logout());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="navbar" sticky="top">
      <button onClick={() => navigate("/")} className="logo">
        <img src={`${process.env.PUBLIC_URL}/images/logo.jpg`} />
      </button>
      <ul>
        <li>
          <button onClick={() => navigate("buns")} className="link">
            <GiRabbitHead />
          </button>
        </li>
        <li>
          <button onClick={() => navigate("/chats")} className="link">
            <RiChatSmileFill></RiChatSmileFill>
          </button>
        </li>
        <li>
          <button onClick={() => navigate("/map")} className="link">
            <FaMap />
          </button>
        </li>
      </ul>
      <div className="login-logout">
        {!user ? (
          <>
            <SmallButton onClick={() => navigate("/login")}>Login</SmallButton>
            <SmallButton onClick={() => navigate("sign-up")}>
              Sign Up
            </SmallButton>
          </>
        ) : (
          <>
            <SmallButton onClick={pageLogout}>Logout</SmallButton>
            <SmallButton onClick={() => navigate(`profile/${user._id}`)}>
              Check profile
            </SmallButton>
            <UserPic imageurl={user.imageUrl} />
          </>
        )}
      </div>
    </div>
  );
};
