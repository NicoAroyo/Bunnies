import React, { useEffect } from "react";
import { GiRabbitHead } from "react-icons/gi";
import { RiChatSmileFill } from "react-icons/ri";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { FaMap } from "react-icons/fa";
import { SmallButton } from "../button/Button";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, login, logout } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import "./Navbar.scss";

export const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(currentUser);

  const pageLogout = () => {
    try {
      localStorage.removeItem("user");
      dispatch(logout());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storageUser = localStorage.getItem("user");
    if (storageUser) {
      const userObj = JSON.parse(storageUser);
      dispatch(login(userObj));
    }
  }, []);

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
            <img className="profile-image" src={user.imageUrl} />
          </>
        )}
      </div>
    </div>
  );
};
