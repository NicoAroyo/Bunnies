import React, { useEffect } from "react";
import { Login } from "./views/login/Login";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { Nav } from "./components/navbar/Navbar";
import { Home } from "./views/home/Home";
import { FileUpload } from "./views/test/FileUpload";
import { Buns } from "./views/buns/Buns";
import { SignUp } from "./views/login/SignUp";
import { MapWithPosts } from "./components/map-with-posts/MapWithPosts";
import { Profile } from "./views/profile/Profile";
import { BlockedBuns } from "./views/buns/BlockedBuns";
import { EditProfile } from "./views/profile/EditProfile";
import { LoadScript } from "@react-google-maps/api";
import { Chats } from "./views/chats/chats";
import { Requests } from "./views/requests/Requests";
import { useDispatch } from "react-redux";
import { AuthenticationService } from "./service/auth/authService";
import { login } from "./redux/features/userSlice";

export const App = () => {
  ///
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (!token) {
      return;
    }
    (async () => {
      const service = new AuthenticationService();
      const response = await service.getUser();
      console.log("FROM APP", response);
      dispatch(login({ ...response }));
    })();
  }, []);

  return (
    <>
      <LoadScript
        loadingElement={<></>}
        googleMapsApiKey="AIzaSyCRznr_S5ccK9D4I0FBaAUWkpZ7H9TX1-M"
      ></LoadScript>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/file" element={<FileUpload />}></Route>
        <Route path="/buns" element={<Buns />}></Route>
        <Route path="/blockedBuns" element={<BlockedBuns />}></Route>
        <Route path="/map" element={<MapWithPosts />}></Route>
        <Route path="/map-start-view" element={<mapAllPosts />}></Route>
        <Route path="/profile/:id" element={<Profile />}></Route>
        <Route path="/edit-profile" element={<EditProfile />}></Route>
        <Route path="/chats" element={<Chats />}></Route>
        <Route path="/requests" element={<Requests />}></Route>
      </Routes>
    </>
  );
};
