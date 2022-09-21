import { gapi } from "gapi-script";
import React, { useEffect, useReducer, useState } from "react";
import ReactFacebookLogin from "react-facebook-login";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/features/userSlice";
import { AuthenticationService } from "../../service/auth/authService";
import "./Login.scss";

const clientId =
  "521406177183-eo7jvfk1egu776rc7vdd76eo34rkqs0g.apps.googleusercontent.com";

export const SignUp = () => {
  const [newUser, setNewUser] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const loginGoogle = (response) => {
    // console.log(response);
    const { profileObj } = response;
    const googleUser = {
      email: profileObj.email,
      firstName: profileObj.givenName,
      lastName: profileObj.familyName,
      imageUrl: profileObj.imageUrl,
    };
    setNewUser({ ...googleUser });
  };

  const loginFacebook = (response) => {
    // console.log(response);
    const facebookUser = {
      email: response.email,
      firstName: response.name.split(" ")[0],
      lastName: response.name.split(" ")[1],
      imageUrl: response.picture.url,
    };
    setNewUser({ ...facebookUser });
  };

  const signup = async () => {
    if (
      !newUser.firstName ||
      !newUser.lastName ||
      !newUser.email ||
      !newUser.password ||
      !newUser.confirmPassword ||
      newUser.password !== newUser.confirmPassword
    ) {
      alert("Invalid Inputs");
    } else {
      try {
        const authService = new AuthenticationService();
        delete newUser.confirmPassword;
        const response = await authService.signUp({ ...newUser });
        console.log(response);
        if (response.ok && response.user) {
          localStorage.setItem(JSON.stringify(response.user));
          dispatch(login({ ...response.user }));
          navigate("/");
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <div className="login">
          <h2>Sign Up to Bunnies</h2>

          <div className="form group signup-name">
            <div className="name">
              <label>First Name</label>
              <input
                className="form-input"
                value={newUser?.firstName}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstName: e.target.value })
                }
              ></input>
            </div>

            <div className="name">
              <label>Last Name</label>
              <input
                className="form-input"
                value={newUser?.lastName}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastName: e.target.value })
                }
              ></input>
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              className="form-input"
              value={newUser?.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            ></input>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              className="form-input"
              type="password"
              value={newUser?.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            ></input>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              className="form-input"
              type="password"
              value={newUser?.confirmPassword}
              onChange={(e) =>
                setNewUser({ ...newUser, confirmPassword: e.target.value })
              }
            ></input>
          </div>

          <button className="btn-login btn-signup" onClick={signup}>
            Sign Me Up!
          </button>

          <div className="sign-in-button-container">
            <GoogleLogin
              clientId={clientId}
              buttonText="Sign in with Google"
              onSuccess={loginGoogle}
              onFailure={(err) => console.err(err)}
              cookiePolicy={"single_host_origin"}
              // isSignedIn={true}
            />
            <ReactFacebookLogin
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
    </>
  );
};
