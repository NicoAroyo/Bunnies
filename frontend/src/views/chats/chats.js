import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/Button";
import "./chats.scss";
export const Chats = () => {
 
    return (
      <div>
         <div className="viewMessage" >
            <div className="message">
                  <h4>img - </h4>
            <h3>hello chets</h3>
            </div>
         </div>


        <div className="allsend">
         <div>
           <input type="text" className="textMess" ></input> 
        </div>
        <div className="btnSend">
       <Button>Send a message</Button>
       </div>
        </div>
      
      </div>
    );
  };