import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { gapi } from "gapi-script";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import FacebookLogin from "react-facebook-login";

const clientId =
  "521406177183-eo7jvfk1egu776rc7vdd76eo34rkqs0g.apps.googleusercontent.com";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const onSuccess = (res) => {
    console.log("success:", res);
    const { profileObj } = res;
    setProfile({
      loginType: "google",
      email: profileObj.email,
      firstName: profileObj.givenName,
      lastName: profileObj.familyName,
      imageUrl: profileObj.imageUrl,
      accessToken: profileObj.accessToken,
    });
  };

  const onFailure = (err) => {
    console.error("failed:", err);
  };

  const logout = () => {
    setProfile(null);
  };

  const responseFacebook = (response) => {
    console.log(response);
    if (response.status === "unknown") {
      alert("Login failed!");
      setProfile(null);
      return false;
    }
    setProfile({
      loginType: "facebook",
      email: response.email,
      firstName: response.name.split(" ")[0],
      lastName: response.name.split(" ")[1],
      imageUrl: response.picture.url,
      accessToken: response.accessToken,
    });
  };

  return (
    <>
      {!profile ? (
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
              <button className="btn-login">Login</button>
              <button className="btn-login">Sign Up</button>
              <div className="sign-in-button-container">
                <GoogleLogin
                  clientId={clientId}
                  buttonText="Sign in with Google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={"single_host_origin"}
                  isSignedIn={true}
                />
                <FacebookLogin
                  appId="604669111136315"
                  autoLoad={false}
                  fields="name,email,picture"
                  scope="public_profile,email,user_friends"
                  callback={responseFacebook}
                  icon="fa-facebook"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <img src={profile?.imageUrl} alt="user image" />
          <h3>User Logged in</h3>
          <p>
            Name: {profile?.firstName} {profile.lastName}
          </p>
          <p>Email Address: {profile?.email}</p>
          <br />
          <br />
          {profile.loginType === "facebook" ? (
            <button onClick={logout}>logout</button>
          ) : (
            <GoogleLogout
              clientId={clientId}
              buttonText="Log out"
              onLogoutSuccess={logout}
            />
          )}
        </div>
      )}
    </>
  );
};
