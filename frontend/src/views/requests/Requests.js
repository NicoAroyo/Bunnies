import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { currentUser } from "../../redux/features/userSlice";
import { RelationshipsService } from "../../service/relationships/relationshipsService";
import { UsersService } from "../../service/users/usersService";
import {BsFillCheckCircleFill, BsXCircleFill}  from "react-icons/bs"



export const Requests = () => {

    const user = useSelector(currentUser);
    const [requests , setRequests] = useState([]);
const navigate = useNavigate()

useEffect(() => {
    (async() => {
        const service = new RelationshipsService(); 
        
        const requests = await service.getRequests(user._id);
        console.log(requests);
        setRequests(requests);
  }) ()
  }, []);

  const acceptRequest = async (request) => {
    const service = new RelationshipsService(); 
    request.type = "friends"; 
    await service.patchAsync(request , request._id);
  };

  const deleteRequest = async(id) => {
    const service = new RelationshipsService();
    await service.deleteAsync(id);
  };

  return (
    
    <>
    <h1>Your requests</h1>
    {requests?.map((request) => {
        return (
          <div key= {request._id}>
            <Button onClick={() => acceptRequest(request)}><BsFillCheckCircleFill/></Button>
            <Button onClick={() => deleteRequest(request._id)}><BsXCircleFill /></Button>
          </div>
        );
      })}
    </>
  )
}
