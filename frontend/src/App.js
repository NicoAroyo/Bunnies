import React from "react";
import { Login } from "./views/login/Login";
import { MapMenu } from "./views/mapMenu/mapMenu";
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

export const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/map-menu" element={<MapMenu />}></Route>
        <Route path="/file" element={<FileUpload />}></Route>
        <Route path="/buns" element={<Buns />}></Route>
        <Route path="/blockedBuns" element={<BlockedBuns/>}> </Route>
        <Route path="/map" element={<MapWithPosts />}></Route>
        <Route path="/map-start-view" element={<mapAllPosts />}></Route>
        <Route path="/profile/:id" element={<Profile />}></Route>
      </Routes>
    </>
  );
};
