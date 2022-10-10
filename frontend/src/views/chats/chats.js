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
  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);
  const [groupOrFriend, setGroupOrFriend] = useState([]);
  const [group, setGroup] = useState([]);

  const client = new W3CWebSocket('ws://127.0.0.1:8000');


  useEffect(() => {
    setUser(userState);
    setUnchangedUser(userState);
  }, [userState]);
  

  const addMassage = (value) => {
     client.send(JSON.stringify({
      type: "message",
      msg: value,
      user: groupOrFriend
    }));


    setMessages([...messages,value ]);
    setMessage("");
  };

  const handleChange = (event) => {
  groupOrFriend([...event])
  }

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
          <option>group or friend</option>
          {friends.map((friend) => (
            <option key={friend._id} value={friend._id} >{friend}</option>
          ))}
          {groups.map((group) => (
            <option key={group._id} value={group._id}>{group}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
