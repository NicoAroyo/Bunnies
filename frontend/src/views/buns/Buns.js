import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../../redux/features/userSlice";
import { RelationshipsService } from "../../service/relationships/relationshipsService";
import { UsersService } from "../../service/users/usersService";
import { UserCard } from "../../components/user-card/UserCard";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineTravelExplore } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { RiUserReceivedFill } from "react-icons/ri";
import "./Buns.scss";
import { SmallButton } from "../../components/button/Button";

const relationshipsService = new RelationshipsService();

export const Buns = () => {
  const user = useSelector(currentUser);
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [content, setContent] = useState("friends");
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
      setSentRequests(sent);

      const received = await service.getRelationships({
        userId: user._id,
        relationship: "requestsReceived",
      });
      setReceivedRequests(received);
      console.log("RECEIVED FRIEND REQUESTS", received);

      const userService = new UsersService();
      const users = await userService.getUsers();
      const usersWithoutBlocked = users.filter(
        (x) =>
          !user.blocked.includes(
            x._id.toString() && !user.blockedBy.includes(x._id.toString())
          )
      );
      console.log("no blocked", usersWithoutBlocked);
      console.log("ALL USERS FROM BUNS", users);

      setUsers(usersWithoutBlocked);
    })();
  }, [user]);

  const removeFriend = async (removedFriend) => {
    const response = await relationshipsService.removeFriend({
      id1: removedFriend._id,
      id2: user._id,
    });
    setFriends(friends.filter((f) => f._id !== removedFriend._id));
    setUsers([...users, removedFriend]);
  };

  const sendFriendRequest = async (requestReceiver) => {
    const response = await relationshipsService.sendFriendRequest({
      receiverId: requestReceiver._id,
      sender: user,
    });
    setUsers(users.filter((user) => user._id !== requestReceiver._id));
    setSentRequests([...sentRequests, requestReceiver]);
  };

  const acceptFriendRequest = async (sender) => {
    const response = await relationshipsService.acceptFriendRequest({
      receiver: user,
      senderId: sender._id,
    });
    console.log("AFTER ACCEPTING", response);
    setFriends([...friends, sender]);
    setReceivedRequests(receivedRequests.filter((r) => r._id !== sender._id));
  };

  const rejectFriendRequest = async (sender) => {
    const response = await relationshipsService.rejectFriendRequest({
      receiver: user,
      senderId: sender._id,
    });
    console.log("AFTER REJECTING", response);
    setReceivedRequests(receivedRequests.filter((r) => r._id !== sender._id));
  };

  const withdrawFriendRequest = async (receiver) => {
    const x = await relationshipsService.withdrawFriendRequest({
      receiverId: receiver._id,
      sender: user,
    });
    setUsers([...users, receiver]);
    setSentRequests(sentRequests.filter((s) => s._id !== receiver._id));
    console.log("AFTER WITHDRAWING", x);
  };

  const renderFriends = () => {
    return friends.map((item) => {
      return (
        <UserCard user={item}>
          <SmallButton isactive={1} onClick={() => removeFriend(item)}>
            Remove
          </SmallButton>
        </UserCard>
      );
    });
  };

  const renderDiscover = () => {
    return users?.map((item) => {
      return (
        // !item.friends?.some((f) => f !== item?._id) &&
        !item.requestsReceived.some((r) => r !== item?._id) &&
        !item.requestsSent.some((r) => r !== item?._id) &&
        !item?._id != user?._id && (
          <UserCard user={item}>
            <SmallButton isactive={1} onClick={() => sendFriendRequest(item)}>
              Add Friend
            </SmallButton>
          </UserCard>
        )
      );
    });
  };

  const renderOutgoingFriendRequests = () => {
    return sentRequests.map((item) => {
      return (
        <UserCard user={item}>
          <SmallButton isactive={1} onClick={() => withdrawFriendRequest(item)}>
            Cancel
          </SmallButton>
        </UserCard>
      );
    });
  };

  const renderIncomingFriendRequests = () => {
    return receivedRequests.map((req) => {
      return (
        <UserCard user={req}>
          <SmallButton isactive={1} onClick={() => acceptFriendRequest(req)}>
            Accept
          </SmallButton>
          <SmallButton onClick={() => rejectFriendRequest(req)}>
            Reject
          </SmallButton>
        </UserCard>
      );
    });
  };

  return (
    <div className="buns">
      <div className="side-menu">
        <div
          className={`${content === "requests" && "active"} menu-option`}
          onClick={() => setContent("requests")}
        >
          <RiUserReceivedFill />
          <p>Friend Requests</p>
        </div>
        <div
          className={`${content === "outgoing" && "active"} menu-option`}
          onClick={() => setContent("outgoing")}
        >
          <IoMdSend />
          <p>Outgoing Requests</p>
        </div>
        <div
          className={`${content === "friends" && "active"} menu-option`}
          onClick={() => setContent("friends")}
        >
          <FaUserFriends />
          <p>Friends</p>
        </div>
        <div
          className={`${content === "discover" && "active"} menu-option`}
          onClick={() => setContent("discover")}
        >
          <MdOutlineTravelExplore />
          <p>Discover</p>
        </div>
      </div>
      <main className="content">
        {(() => {
          switch (content) {
            case "friends":
              return renderFriends();

            case "discover":
              return renderDiscover();

            case "outgoing":
              return renderOutgoingFriendRequests();

            case "requests":
              return renderIncomingFriendRequests();
          }
        })()}
      </main>
    </div>
  );
};
