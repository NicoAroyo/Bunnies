import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../redux/features/userSlice";
import { UserCard } from "../../components/user-card/UserCard";
import { SmallButton } from "../../components/button/Button";
import { GroupsService } from "../../service/groups/groupsService";
import { PostService } from "../../service/posts/postService";
import { UsersService } from "../../service/users/usersService";
import { useParams } from "react-router-dom";

const groupService = new GroupsService();
const postService = new PostService();
const userService = new UsersService();

export const Group = () => {
  const groupId = useParams();
  const user = useSelector(currentUser);
  const [groupMembers, setGroupMembers] = useState([]);
  const [invintations, setInvantations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [content, setContent] = useState("posts");
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {})();
  }, []);

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
              return renderMmebers();

            case "admin":
              return renderAdmin();
          }
        })()}
      </main>
    </div>
  );
};
