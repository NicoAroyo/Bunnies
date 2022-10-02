import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/Button";
import "./chats.scss";
import { UserPic } from "../../components/user-pic/UserPic";
import { currentUser, login } from "../../redux/features/userSlice";
export const Chats = () => {
    const [user, setUser] = useState(useSelector(currentUser));
    const userState = useSelector(currentUser);
    const [unchangedUser, setUnchangedUser] = useState(useSelector(currentUser));
    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState(
        [ 
         {}
        ]);

    useEffect(() => {
        setUser(userState);
        setUnchangedUser(userState);
      }, [userState]);

    const addMassage =() => {
        const newMessages = {
            
        }
      setMessages([...messages,newMessages]);
    }


    return (
      <div>
         <div className="viewMessage" >
         <div className="message">
         <UserPic
            imageurl={user?.imageUrl}
            style={{ height: "40px", width: "40px" }}
          />
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
        <div className="groups">
        <select className="comboboxGroup">
          <option>group</option>
            </select>
        </div>
      </div>
    );
  };