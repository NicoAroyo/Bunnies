import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/Button";
import "./chats.scss";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { UsersService } from "../../service/users/usersService";
import { RelationshipsService } from "../../service/relationships/relationshipsService";
import { UserPic } from "../../components/user-pic/UserPic";
import { currentUser, login } from "../../redux/features/userSlice";


export const Chats = () => {
  const [user, setUser] = useState(useSelector(currentUser));
  const userState = useSelector(currentUser);
  const [unchangedUser, setUnchangedUser] = useState(useSelector(currentUser));
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);
  const [rsIds, setRsIds] = useState([]);
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);

  //const client = new W3CWebSocket('ws://127.0.0.1:8000');

  useEffect(() => {
    setUser(userState);
    setUnchangedUser(userState);
  }, [userState]);



  const addMassage = (value) => {
  //  client.send(JSON.stringify({
    //  type: "message",
    //  msg: value,
    //  user: this.state.userName
   // }));
    setMessages([...messages,value ]);
    setMessage("");
  };

  const handleChange = () => {};

  return (
    <div>
      <div className="viewMessage">
        <h1>
          {messages.map((message) => (
            <div className="proMessage">
              <UserPic
                imageurl={user?.imageUrl}
                style={{ height: "40px", width: "40px" }}
              />
              <p>{message}</p>
            </div>
          ))}
        </h1>
      </div>

      <div className="allsend">
        <div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete="off"
            className="textMess"
          ></input>
        </div>
        <div className="btnSend">
          <Button onClick={() => addMassage(message)}>Send a message</Button>
        </div>
      </div>
      <div className="groups">
        <select onChange={() => handleChange()} className="comboboxGroup">
          <option>group</option>
          {rsIds.map((friend) => (
            <option>{friend}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
