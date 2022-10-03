import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/Button";
import "./chats.scss";
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

  useEffect(() => {
    setUser(userState);
    setUnchangedUser(userState);
  }, [userState]);

  useEffect(() => {
    (async () => {
      const service = new RelationshipsService();
      const friendsIds = await service.getFriends(userState.id);
      console.log(friendsIds);
      setRsIds(friendsIds);
    })();
<<<<<<< HEAD
  })([]);
=======
  });
>>>>>>> b0e6703865c02d5b50c829a66245add4776b659d

  const addMassage = () => {
    setMessages([...messages, message]);
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
          <Button onClick={() => addMassage()}>Send a message</Button>
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
