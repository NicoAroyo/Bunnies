import React from "react";
import { Login } from "./views/login/Login";
import  MapMenu  from "./views/mapMenu/mapMenu";
import "./App.scss";
import { Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/map-menu" element={<MapMenu/>}></Route>
      </Routes>
    </>
  );
};
