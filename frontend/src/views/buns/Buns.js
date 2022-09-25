import React, { useEffect, useState } from "react";
<<<<<<< HEAD
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
   
  useEffect(async() => {
    const service = new RelationshipsService(); 
    const friendsIds = await service.getFriends(user._id);
    setRsIds(friendsIds); 
    let friendData = [];
    const userService = new UsersService();
     friendsIds.forEach(async(f) => {
      const friend = await userService.getUserById(f.userId2);
      friendData = [...friendData , friend]
    });
    const blockedUsers = service.getBlocked(user._id);
    const usersData = userService.getUsers();
    setUsers(usersData);
    setFriends(friendsData);
  }, []);

  const removeFriend = async (id) => {
    const idToDelete = rsIds.find(id === userId2);
    const service = new RelationshipsService(); 
   await service.deleteAsync(idToDelete); 
  }

  const addFriend = async (id) => {
    const service = RelationshipsService(); 
    const friendship = {userId1 : user._id, userId2 : id, type : "friends"};
    await service.postAsync(friendship);
  }

  return (
    <div>
      <Button onClick= {()=> navigate("/blockedBuns")}>Blocked Buns</Button>
      {friends?.map((friend) => {
        return (
          <div>
            <h3>
              {friend.firstName}
            </h3>
            <Button onClick={() => removeFriend(friend._id)}>Remove</Button>
          </div>
        );
      })}
      {users?.mapp((user) => {
        return(
          <div>
            <h3>{user.firstName}</h3>
            <Button onClick={() => addFriend(user._id)}>Add friend</Button>
          </div>
        );
      })}
    </div>
  );
  
=======
import { GenericService } from "../../service/genericService";
import { PostService } from "../../service/posts/postService";

export const Buns = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      const service = new GenericService("users");
      const data = await service.getAllAsync();
      console.log(data);
      setUsers(data);
    })();
  }, []);
  return (
    <>
      <main>
        <h1>OUR BUNS:</h1>
        {users.map((user) => {
          return (
            <>
              <div>
                <h2>{user.firstName}</h2>
                <img src={user.imageUrl} alt="profile photo" />
                <button>Add Friend</button>
              </div>
            </>
          );
        }, [])}
      </main>
    </>
  );
>>>>>>> b078f933a43fa82850ebb275e0dc2faf37511b15
};
