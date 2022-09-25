import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { currentUser } from "../../redux/features/userSlice";
import { RelationshipsService } from "../../service/relationships/relationshipsService";
import { UsersService } from "../../service/users/usersService";

export const BlockedBuns = () => {
    
   const user = useSelector( currentUser
   );
   const [blocked, setBlocked ]= useState([]);
   const [users , setUsers] = useState([]);
   const [rsIds , setRsIds] = useState([]);
   const navigate = useNavigate();
   
  useEffect(() => {
    (async() => {
    const service = new RelationshipsService(); 
    const blockedIds = await service.getBlocked(user._id);
    setRsIds(blockedIds); 
    let blockedData = [];
    const userService = new UsersService();
     blockedIds.forEach(async(f) => {
      const block = await userService.getUserById(f.userId2);
      blockedData = [...blockedData , block]
    });
    const usersData = userService.getUsers();
    setUsers(usersData);
    setBlocked(blockedData);
}) ();
  }, []);

  const removeBlock = async (id) => {
    const idToDelete = rsIds.find((r) => id === r.userId2);
    const service = new RelationshipsService(); 
   await service.deleteAsync(idToDelete); 
  }

  const addBlock = async (id) => {
    const service = RelationshipsService(); 
    const blocked = {userId1 : user._id, userId2 : id, type : "blocked"};
    await service.postAsync(blocked);
  }

  return (
    <div>
      <Button onClick= {()=> navigate(-1)}>Back to Buns</Button>
      {blocked?.map((block) => {
        return (
          <div>
            <h3>
              {block.firstName}
            </h3>
            <Button onClick={() => removeBlock(block._id)}>Unblock</Button>
          </div>
        );
      })}
      {users?.mapp((user) => {
        return(
          <div>
            <h3>{user.firstName}</h3>
            <Button onClick={() => addBlock(user._id)}>Block</Button>
          </div>
        );
      })}
    </div>
  );
  
    
};