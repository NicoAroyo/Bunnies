import React from "react";
import { Login } from "./views/login/Login";
import MapMenu from "./views/mapMenu/mapMenu";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./views/navbar/Navbar";
import { Home } from "./views/home/Home";
import { FileUpload } from "./views/test/FileUpload";

export const App = () => {
  return (
    <>
      {/* <Navbar></Navbar> */}
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/map-menu" element={<MapMenu />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/file" element={<FileUpload />}></Route>
      </Routes>
    </>
  );
};
