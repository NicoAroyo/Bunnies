import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { currentUser } from "../../redux/features/userSlice";
import { RelationshipsService } from "../../service/relationships/relationshipsService";
import { UsersService } from "../../service/users/usersService";

export const Buns = () => {
   const user = useSelector( currentUser
   );
   const [friends, setFriends ]= useState([]);
   const [users , setUsers] = useState([]);
   const [rsIds , setRsIds] = useState([]);
   const navigate = useNavigate();
   console.log(user);
  useEffect(async() => {
    
    const service = new RelationshipsService(); 
    const friendsIds = await service.getFriends(user._id);
    setRsIds(friendsIds);
    let friendData = [];
    const userService = new UsersService();
    friendsIds.forEach(async (f) => {
      const friend = await userService.getUserById(f.userId2);
      friendData = [...friendData, friend];
    });
    const blockedUsers = service.getBlocked(user._id);
    const usersData = userService.getUsers();
    setUsers(usersData);
    setFriends(friendData);
  }, []);

  const removeFriend = async (id) => {
    const idToDelete = rsIds.find((r) => r.userId2 === id);
<<<<<<< HEAD
    const service = new RelationshipsService(); 
   await service.deleteAsync(idToDelete); 
  }

  const addFriend = async (id) => {
    const service = RelationshipsService(); 
    const friendship =  new {userId1 : user._id, userId2 : id, type : "friends"};
=======
    const service = new RelationshipsService();
    await service.deleteAsync(idToDelete);
  };

  const addFriend = async (id) => {
    const service = new RelationshipsService();
    const friendship = {
      userId1: user._id,
      userId2: id,
      type: "friends",
    };
>>>>>>> 40529f04fea562f310b5f83c3d6478b81e99c916
    await service.postAsync(friendship);
  };

  return (
    <div>
      <Button onClick={() => navigate("/blockedBuns")}>Blocked Buns</Button>
      {friends?.map((friend) => {
        return (
          <div>
            <h3>{friend.firstName}</h3>
            <Button onClick={() => removeFriend(friend._id)}>Remove</Button>
          </div>
        );
      })}
<<<<<<< HEAD
      {users?.filter((item) => !friends.includes(item._id)).map((user) => {
        return(
=======
      {users?.map((user) => {
        return (
>>>>>>> 40529f04fea562f310b5f83c3d6478b81e99c916
          <div>
            <h3>{user.firstName}</h3>
            <Button onClick={() => addFriend(user._id)}>Add friend</Button>
          </div>
        );
      })}
    </div>
  );
};
