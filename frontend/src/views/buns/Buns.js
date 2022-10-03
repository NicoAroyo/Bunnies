import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { currentUser } from "../../redux/features/userSlice";
import { RelationshipsService } from "../../service/relationships/relationshipsService";
import { MdPersonAddAlt1 } from "react-icons/md";
import { HiUserRemove } from "react-icons/hi";
import { Header } from "../../components/header/Header";

export const Buns = () => {
  const user = useSelector(currentUser);
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      console.log(user);
      const service = new RelationshipsService();
      const friends = await service.getFriends(user._id);
      console.log("friends", friends);
      const users = await service.getRelevantUsers(user._id);
      setUsers(users);
      setFriends(friends);
    })();
  }, []);

  const removeFriend = async (id) => {
    const service = new RelationshipsService();
    await service.deleteAsync(id);
  };

  const addFriend = async (id) => {
    const service = new RelationshipsService();
    const friendship = { userId1: user._id, userId2: id, type: "request" };
    await service.postAsync(friendship);
  };

  return (
    <div>
      <Button onClick={() => navigate("/requests")}>Requests</Button>
      <Button onClick={() => navigate("/blockedBuns")}>Blocked Buns</Button>
      <div>
        <Header>Friends list</Header>
        {friends?.map((item) => {
          // if (Object.keys(friend).length !== 0) {

          return (
            item !== null && (
              <div key={item?.id}>
                <div>{item?.friend?.firstName}</div>
                <Button onClick={() => removeFriend(item.id)}>
                  <HiUserRemove />
                </Button>
              </div>
            )
          );
        })}
      </div>
      <div>
        <Header>Add friend</Header>
        {users?.map((user) => {
          return (
            user !== null && (
              <div key={user._id}>
                <h3>{user.firstName}</h3>
                <Button onClick={() => addFriend(user._id)}>
                  <MdPersonAddAlt1 />
                </Button>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};
