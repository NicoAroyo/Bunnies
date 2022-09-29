import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/Button";
import "./chats.scss";
export const Chats = () => {
    const [message, setMessage] = useState("");


  

    const addMassage =() => {
    
    }


    return (
      <div>
         <div className="viewMessage" >
         <div className="message">
        <h1>img -</h1>
        <h1>{message}</h1>
      </div>
         </div>


        <div className="allsend">
         <div>
           <input type="text" onChange={(e) =>setMessage(e.target.value)}  autoComplete="off" className="textMess" ></input> 
        </div>
        <div className="btnSend">
       <Button onClick={() => addMassage()}>Send a message</Button>
       </div>
        </div>
      
      </div>
    );
  };