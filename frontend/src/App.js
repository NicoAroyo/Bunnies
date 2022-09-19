import React from "react";
import { Login } from "./views/login/Login";
import MapMenu from "./views/mapMenu/mapMenu";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
<<<<<<< HEAD

=======
import { Navbar } from "./views/navbar/Navbar";
import { Home } from "./views/home/Home";
import { FileUpload } from "./views/test/FileUpload";
>>>>>>> 002a584ed2a0cfa3fe50a35333bd728b7c8d384d


export const App = () => {
  return (
    <>
   
     
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/map-menu" element={<MapMenu />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/file" element={<FileUpload />}></Route>
      </Routes>
    </>
  );
};
