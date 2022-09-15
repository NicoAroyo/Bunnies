import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { gapi } from "gapi-script";
import { GoogleLogin, GoogleLogout } from "react-google-login";

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
    setProfile(res.profileObj);
  };

  const onFailure = (err) => {
    console.log("failed:", err);
  };

  const logout = () => {
    setProfile(null);
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
              <button>Login</button>
              <button>Sign Up</button>
              <div className="sign-in-button-container">
                <GoogleLogin
                  clientId={clientId}
                  buttonText="Sign in with Google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={"single_host_origin"}
                  isSignedIn={true}
                />
                <button>sign in with facebook</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <img src={profile?.imageUrl} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile?.name}</p>
          <p>Email Address: {profile?.email}</p>
          <br />
          <br />
          <GoogleLogout
            clientId={clientId}
            buttonText="Log out"
            onLogoutSuccess={logout}
          />
        </div>
      )}
    </>
  );
};
