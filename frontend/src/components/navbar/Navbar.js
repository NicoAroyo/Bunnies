import React from "react";
import { GiRabbitHead } from "react-icons/gi";
import { RiChatSmileFill } from "react-icons/ri";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import "./Navbar.scss";
import { Button, SmallButton } from "../button/Button";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, logout } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";

export const Nav = () => {
  const user = useSelector(currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
            <SmallButton>Sign In</SmallButton>
          </>
        ) : (
          <>
            <SmallButton onClick={() => dispatch(logout())}>Logout</SmallButton>
            <img className="profile-image" src={user.imageUrl} />
          </>
        )}
      </div>
    </nav>
  );
};
