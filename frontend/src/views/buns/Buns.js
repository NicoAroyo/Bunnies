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
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      console.log("USER FROM BUNS", user);

      const service = new RelationshipsService();
      const friends = await service.getFriends(user._id);
      console.log("friends", friends);

      const userService = new UsersService();
      const users = await userService.getUsers();
      console.log("ALL USERS FROM BUNS", users);
      // const users = await service.getRelevantUsers(user._id);

      setUsers(users);
      setFriends(friends);
    })();
  }, [user]);

  const removeFriend = async (id) => {
    const service = new RelationshipsService();
    await service.deleteAsync(id);
    setFriends(friends.filter((f) => f.id !== id));
  };

  const sendFriendRequest = async (id) => {
    // const service = new RelationshipsService();
    // const friendship = { userId1: user._id, userId2: id, type: "request" };
    // await service.postAsync(friendship);
    // setUsers(users.filter((u) => u.id !== id));
    const response = await relationshipsService.sendFriendRequest({
      receiverId: id,
      sender: user,
    });
    setUsers(users.filter((user) => user._id !== id));
  };

  return (
    <div className="buns">
      <div>
        NOT FRIENDS
        {users.map((user) => {
          return (
            <UserCard user={user}>
              <button>send friend req</button>
            </UserCard>
          );
        })}
      </div>
      <div>
        FRIENDS
        {user.friends.map((friend) => {
          return <p>{friend}</p>;
        })}
      </div>

      <div>OUTGOING</div>
      <div>INCOMING</div>
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
