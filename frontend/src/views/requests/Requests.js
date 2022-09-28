import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect , useState  } from 'react'
import { useNavigate } from 'react-router-dom'
import { RelationshipsService } from '../../service/relationships/relationshipsService'
import { currentUser } from '../../redux/features/userSlice'
import { Button } from '../../components/button/Button'
import {BsFillCheckCircleFill, BsXCircleFill}  from "react-icons/bs"


const user = useSelector(currentUser);
const [requests , setRequests] = useState();
const navigate = useNavigate()

useEffect(() => {
    (async() => {
        const service = new RelationshipsService(); 
        const request = await service.getRequests(user._id);
        setRequests(requests);
  }) ()
  }, []);

export const Requests = () => {
  return (
    
    <>
    <h1>Your requests</h1>
    {
        requests?.map((request) => {
            return(
                <div>
                    <Button><BsFillCheckCircleFill/></Button>
                    <Button><BsXCircleFill/></Button>
                </div>
            );
        })
    }
    </>
  )
}
