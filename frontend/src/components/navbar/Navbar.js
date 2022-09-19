import React from "react";
import "./Navbar.scss";
import { Navigate } from "react-router-dom";
import { Container } from "react-dom";
// import {Logo} from "../../images/Logo.jpg"
import { useEffect } from "react";

import { VscAccount } from "react-icons/vsc";
import {GiRabbitHead} from "react-icons/gi"
import {RiChatSmileFill} from "react-icons/ri"
import{BsFillGrid1X2Fill} from "react-icons/bs"

export const Nav = (props) => {
  return (
    <nav className="navbar" sticky="top">
      <a href="/" className="logo">
        <img src="https://im.ge/i/1qNPwT"></img>
      </a>
      <ul>
        <li> <a href="/buns" className="link"><GiRabbitHead/></a></li>
        <li> <a href="/chats" className="link"><RiChatSmileFill></RiChatSmileFill></a></li>
        <li> <a href="/timeline" className="link"><BsFillGrid1X2Fill/></a></li>
      </ul>
     
      {/* <ul> */}
      {/* {props?.children?.map((children) => {
        return(
          <>
          <li>
          <a href={children.pathname}></a>
          </li>
          </>
        )
      })}
      
      </ul> */}
    </nav>
  );
};

