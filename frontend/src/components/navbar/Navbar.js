import React from "react";
import { GiRabbitHead } from "react-icons/gi";
import { RiChatSmileFill } from "react-icons/ri";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { SmallButton } from "../button/Button";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, logout } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import "./Navbar.scss";

export const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(currentUser);

  const pageLogout = () => {
    try {
      localStorage.removeItem("token");
      dispatch(logout());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="navbar" sticky="top">
      <a href="/" className="logo">
        <img src={`${process.env.PUBLIC_URL}/images/logo.jpg`} />
      </a>
      <ul>
        <li>
          <a href="/buns" className="link">
            <GiRabbitHead />
          </a>
        </li>
        <li>
          <a href="/chats" className="link">
            <RiChatSmileFill></RiChatSmileFill>
          </a>
        </li>
        <li>
          <a href="/timeline" className="link">
            <BsFillGrid1X2Fill />
          </a>
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
            <img className="profile-image" src={user.imageUrl} />
          </>
        )}
      </div>
    </nav>
  );
};
