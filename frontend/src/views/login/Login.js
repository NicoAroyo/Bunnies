import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { gapi } from "gapi-script";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { AuthenticationService } from "../../service/auth/authService";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, login, logout } from "../../redux/features/userSlice";
import { Button } from "../../components/Button/Button";

const clientId =
  "521406177183-eo7jvfk1egu776rc7vdd76eo34rkqs0g.apps.googleusercontent.com";
const authService = new AuthenticationService();

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const user = useSelector(currentUser);

  //google api
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const loginGoogle = async (response) => {
    const { profileObj } = response;
    const { user } = await authService.login({
      loginType: "google",
      email: profileObj.email,
      firstName: profileObj.givenName,
      lastName: profileObj.familyName,
      imageUrl: profileObj.imageUrl,
      accessToken: response.accessToken,
    });
    dispatch(login({ ...user }));
    navigateHome();
  };

  const loginFacebook = async (response) => {
    console.log(response);
    if (response.status === "unknown") {
      alert("Login failed!");
      return false;
    }
    const user = await authService.login({
      loginType: "facebook",
      email: response.email,
      firstName: response.name.split(" ")[0],
      lastName: response.name.split(" ")[1],
      imageUrl: response.picture.url,
      accessToken: response.accessToken,
    });
    dispatch(login({ ...user }));
    navigateHome();
  };

  const loginLocal = async () => {};

  const navigateHome = () => {
    navigate("/home");
  };

  return (
    <>
      <div className="login-wrapper">
        <div className="login">
          <h2>Login to your account</h2>

          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>

            <button className="btn-login" onClick={loginLocal}>
              Login
            </button>
            <button className="btn-login">Sign Up</button>

            <div className="sign-in-button-container">
              <GoogleLogin
                clientId={clientId}
                buttonText="Sign in with Google"
                onSuccess={loginGoogle}
                onFailure={(err) => console.err(err)}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
              />
              <FacebookLogin
                appId="604669111136315"
                autoLoad={false}
                fields="name,email,picture"
                scope="public_profile,email,user_friends"
                callback={loginFacebook}
                icon="fa-facebook"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
