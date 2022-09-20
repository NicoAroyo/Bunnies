import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { gapi } from "gapi-script";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { AuthenticationService } from "../../service/auth/authService";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, login, logout } from "../../redux/features/userSlice";
import { Button } from "../../components/button/Button";
import { Nav } from "../../components/navbar/Navbar";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const submitLogin = async () => {
    const authenticationService = new AuthenticationService();
    try {
      const response = await authenticationService.login({ email, password });
      if (response.ok) {
        localStorage.setItem("token", response.accessToken);
        dispatch(login({ ...response.user }));
        navigate("/");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <div className="login">
          <h2>Login to your account</h2>

          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="form-input"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          <div className="button-container">
            <button className="btn-login" onClick={submitLogin}>
              Login
            </button>
            <button className="btn-login" onClick={() => navigate("/sign-up")}>
              don't have an account?? Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
