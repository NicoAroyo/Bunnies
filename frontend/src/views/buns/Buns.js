import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { currentUser } from "../../redux/features/userSlice";
import { RelationshipsService } from "../../service/relationships/relationshipsService";
import { UsersService } from "../../service/users/usersService";
import {MdPersonAddAlt1} from "react-icons/md";
import {HiUserRemove} from "react-icons/hi"

export const Buns = () => {
  const user = useSelector(currentUser);
   const [friends, setFriends ]= useState([]);
   const [users , setUsers] = useState([]);
   const [rsIds , setRsIds] = useState([]);
   const navigate = useNavigate();
   
  useEffect(() => {
    (async() => {
      console.log(user);
    const service = new RelationshipsService(); 
    const friendsIds = await service.getFriends(user._id);
    console.log(friendsIds);
    setRsIds(friendsIds);
    
    let friendData = [];
    const userService = new UsersService();
    friendsIds.forEach(async (f) => {
      console.log(f);
      console.log(f.userId2);
      const friend = await userService.getUserById(f.userId2);
      console.log(friend);
      friendData.push(friend);
    });
    console.log(friendData);
    const blockedUsers = service.getBlocked(user._id);
    const usersData = await userService.getUsers();
    console.log("users" + usersData);
    setUsers(usersData);
    setFriends(friendData);
  }) ()
  }, []);

  const removeFriend = async (id) => {
    const idToDelete = rsIds.find((r) => r.userId2 === id);
    console.log(idToDelete);
    const service = new RelationshipsService(); 
   await service.deleteAsync(idToDelete._id); 
  }

  const addFriend = async (id) => {
    const service = new RelationshipsService(); 
    const friendship =  {userId1 : user._id, userId2 : id, type : "friends"};
    await service.postAsync(friendship);
  };

  return (
    <div>
      <Button onClick={() => navigate("/blockedBuns")}>Blocked Buns</Button>
      {friends?.map((friend) => {
        return (
          <div>
            <h3>{friend.firstName}</h3>
            <Button onClick={() => removeFriend(friend._id)}><HiUserRemove/></Button>
          </div>
        );
      })}
      {users?.map((user) => {
        return(
          <div>
            <h3>{user.firstName}</h3>
            <Button onClick={() => addFriend(user._id)}><MdPersonAddAlt1/></Button>
          </div>
        );
      })}
    </div>
  );
};
