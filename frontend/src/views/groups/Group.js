import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../redux/features/userSlice";
import { UserCard } from "../../components/user-card/UserCard";
import { SmallButton } from "../../components/button/Button";
import { GroupsService } from "../../service/groups/groupsService";
import { PostService } from "../../service/posts/postService";
import { UsersService } from "../../service/users/usersService";
import { useParams } from "react-router-dom";
import "./Groups.scss";

const groupService = new GroupsService();
const postService = new PostService();
const userService = new UsersService();

export const Group = () => {
  const groupId = useParams();
  const user = useSelector(currentUser);
  const [groupMembers, setGroupMembers] = useState([]);
  const [groupMembersWhoAreFriends, setGroupMemberWhoAreFriends] = useState();
  const [invintations, setInvantations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [content, setContent] = useState("posts");
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState([]);
  const [friendsToInvite, setFriendsToInvite] = useState([]);

  useEffect(() => {
    (async () => {
      const group = await groupService.getById(groupId);
      if (group.admins.includes(user._id.toString())) setIsAdmin(true);
      const memebersWithoutBlocked = group.members.filter(
        (x) =>
          !x.blocked.includes(
            user._id.toString() && !x.blockedBy.includes(user._id.toString())
          )
      );
      const members = memebersWithoutBlocked.map(
        async (member) => await userService.getUserById(member)
      );
      const friendsInGroup = members.filter((x) =>
        user.friends.includes(x._id.toString())
      );
      const membersNotFriends = members.filter(
        (x) => !user.friends.includes(x._id.toString())
      );
      setMemeber(membersNotFriends);
      setGroupMemberWhoAreFriends(friendsInGroup);
      const friendsNIG = user.friends.filter(
        (x) => !group.members.includes(x.toString())
      );
      const friendsNotInGroup = friendsNIG.map(
        async (member) => await userService.getUserById(member)
      );
      setFriendsToInvite(friendsNotInGroup);
      setRequests(group.requests);
    })();
  }, []);

  const renderMembers = () => {
    //add option to invite friends?
    return (
      <div>
        <div>Friends in group</div>
        <div>
          {groupMembersWhoAreFriends.map((friendMember) => {
            return (<div>
              {friendMember.firstName} {friendMember.lastName}
            </div>)(
              isAdmin && (
                <SmallButton onClick={() => kickMember(friendMember)}>
                  Kick
                </SmallButton>
              )
            );
          })}
        </div>
        <div>Other members</div>
        <div>
          {groupMembers.map((member) => {
            return (<div>
              {member.firstName} {member.lastName}
            </div>)(
              isAdmin && (
                <div>
                  <div>
                    <SmallButton onClick={() => kickMember(member)}>
                      Kick
                    </SmallButton>
                  </div>
                  <div>
                    <SmallButton onClick={() => makeAdmin(member)}>
                      Make Admin
                    </SmallButton>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div onClick={() => setContent("posts")}>posts</div>
      <div onClick={() => setContent("members")}>memebers</div>
      {isAdmin && <div onClick={() => setContent("admin")}>admin controls</div>}
      <main className="content">
        {(() => {
          switch (content) {
            case "posts":
              return renderPosts();

            case "memebers":
              return renderMembers();

            case "admin":
              return renderAdmin();
          }
        })()}
      </main>
    </div>
  );
};
