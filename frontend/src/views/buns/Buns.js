import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { currentUser, login } from "../../redux/features/userSlice";
import { RelationshipsService } from "../../service/relationships/relationshipsService";
import { MdPersonAddAlt1 } from "react-icons/md";
import { HiUserRemove } from "react-icons/hi";
import { Header } from "../../components/header/Header";
import { UsersService } from "../../service/users/usersService";
import "./Buns.scss";
import { UserCard } from "../../components/user-card/UserCard";

const relationshipsService = new RelationshipsService();

export const Buns = () => {
  const user = useSelector(currentUser);
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [sent, setSent] = useState([]);
  const [received, setReceived] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      console.log("USER FROM BUNS", user);

      const service = new RelationshipsService();
      const friends = await service.getRelationships({
        userId: user._id,
        relationship: "friends",
      });
      console.log("FRIENDS FROM BUNS", friends);
      setFriends(friends);

      const sent = await service.getRelationships({
        userId: user._id,
        relationship: "requestsSent",
      });
      setSent(sent);

      const received = await service.getRelationships({
        userId: user._id,
        relationship: "requestsReceived",
      });
      setReceived(received);
      console.log("RECEIVED FRIEND REQUESTS", received);

      const userService = new UsersService();
      const users = await userService.getUsers();
      console.log("ALL USERS FROM BUNS", users);

      setUsers(users);
    })();
  }, [user]);

  const removeFriend = async (id) => {
    // const service = new RelationshipsService();
    // await service.deleteAsync(id);
  };

  const sendFriendRequest = async (id) => {
    const response = await relationshipsService.sendFriendRequest({
      receiverId: id,
      sender: user,
    });
    setUsers(users.filter((user) => user._id !== id));
  };

  const acceptFriendRequest = async (senderId) => {
    const x = await relationshipsService.acceptFriendRequest({
      receiver: user,
      senderId,
    });
    console.log("AFTER ACCEPTING", x);
  };

  const withdrawFriendRequest = async (receiverId) => {
    const x = await relationshipsService.withdrawFriendRequest({
      receiverId,
      sender: user,
    });
    console.log("AFTER WITHDRAWING", x);
  };

  return (
    <div className="buns">
      <div>
        NOT FRIENDS
        {users?.map((u) => {
          return (
            !u.friends?.some((f) => f !== u?._id) &&
            u?._id != user?._id && (
              <UserCard user={u}>
                <button onClick={() => sendFriendRequest(u._id)}>
                  send friend req
                </button>
              </UserCard>
            )
          );
        })}
      </div>
      <div>
        FRIENDS
        {friends.map((friend) => {
          return (
            <UserCard user={friend}>
              <button onClick={() => removeFriend(friend._id)}>
                remove friend
              </button>
            </UserCard>
          );
        })}
      </div>

      <div>
        OUTGOING FRIEND REQUESTS
        {sent.map((req) => {
          return (
            <UserCard user={req}>
              <button onClick={() => withdrawFriendRequest(req?._id)}>
                withdraw
              </button>
            </UserCard>
          );
        })}
      </div>
      <div>
        RECEIVED FRIEND REQUESTS
        {received.map((req) => {
          return (
            <UserCard user={req}>
              <button onClick={() => acceptFriendRequest(req?._id)}>
                accept
              </button>
            </UserCard>
          );
        })}
      </div>
    </div>
    // <div>
    //   <Button onClick={() => navigate("/requests")}>Requests</Button>
    //   <Button onClick={() => navigate("/blockedBuns")}>Blocked Buns</Button>
    //   <div>
    //     <Header>Friends list</Header>
    //     {friends?.map((item) => {
    //       // if (Object.keys(friend).length !== 0) {

    //       return (
    //         item !== null && (
    //           <div key={item?.id}>
    //             <div>{item?.friend?.firstName}</div>
    //             <Button onClick={() => removeFriend(item.id)}>
    //               <HiUserRemove />
    //             </Button>
    //           </div>
    //         )
    //       );
    //     })}
    //   </div>
    //   <div>
    //     <Header>Add friend</Header>
    //     {users?.map((user) => {
    //       return (
    //         user !== null && (
    //           <div key={user._id}>
    //             <h3>{user.firstName}</h3>
    //             <Button onClick={() => sendFriendRequest(user._id)}>
    //               <MdPersonAddAlt1 />
    //             </Button>
    //           </div>
    //         )
    //       );
    //     })}
    //   </div>
    // </div>
  );
};
