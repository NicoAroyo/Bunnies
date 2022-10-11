import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/features/userSlice";
import { GroupsService } from "../../service/groups/groupsService";
import { PostService } from "../../service/posts/postService";
import { UsersService } from "../../service/users/usersService";
import { useParams } from "react-router-dom";
import { Post } from "../../components/post/Post";
import { Input } from "../../components/input/Input";
import { UserPic } from "../../components/user-pic/UserPic";
import { Modal } from "../../components/modal/Modal";
import { AddPost } from "../../components/add-post/AddPost";
import "./Groups.scss";

const groupService = new GroupsService();
const postService = new PostService();
const userService = new UsersService();

export const Group = () => {
  const { groupId } = useParams();
  const user = useSelector(currentUser);
  const [groupMembers, setGroupMembers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [content, setContent] = useState("posts");
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [showAddPostForm, setShowAddPostForm] = useState(false);
  const [group, setGroup] = useState({});

  useEffect(() => {
    (async () => {
      const group = await groupService.getAllInformation(groupId);
      if (group.group.admins.includes(user._id.toString())) setIsAdmin(true);
      setGroupMembers(group.dataMembers);
      setRequests(group.dataRequests);
      setAdmins(group.dataAdmins);
      setPosts(group.dataPosts);
      setGroup(group);
    })();
  }, []);

  const renderPosts = () => {
    return (
      <main className="home">
        <Modal
          show={showAddPostForm ? 1 : 0}
          closemodal={() => setShowAddPostForm(false)}
        >
          {showAddPostForm && (
            <AddPost close={() => setShowAddPostForm(false)} />
          )}
        </Modal>
        <div className="feed">
          {user && (
            <div className="add-post">
              <div>
                <h4>Would you like to share something?</h4>
                <Input
                  placeholder={"make a post"}
                  onClick={() => setShowAddPostForm(true)}
                />
              </div>
              <UserPic imageurl={user.imageUrl} />
            </div>
          )}
          {posts?.map((post) => {
            return <Post key={post._id} post={post} />;
          })}
        </div>
      </main>
    );
  };

  const renderMembers = () => {
    //add option to invite friends?
    return (
      <div>
        <div>Memebers</div>
        <div>
          {groupMembers.map((member) => {
            return (
              <>
                <div>
                  {member.firstName} {member.lastName}
                </div>
                {isAdmin && (
                  <div>
                    <div>
                      {/* <SmallButton onClick={() => kickMember(member)}>
                        Kick
                      </SmallButton> */}
                    </div>
                    <div>
                      {/* <SmallButton onClick={() => makeAdmin(member)}>
                        Make Admin
                      </SmallButton> */}
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
    );
  };

  const renderAdmin = () => {
    console.log(group.group);
    return (
      <div>
        {group.group?.creator.includes(user._id.toString()) && (
          <div>
            {admins?.map((admin) => {
              return (
                <div>
                  <div>
                    {admin.firstName} {admin.lastName}
                  </div>
                  {/* <SmallButton onClick={() => removeAdmin(admin)}>
                    you aint no admin now
                  </SmallButton> */}
                </div>
              );
            })}
            <div>Requests</div>
            {requests?.map((request) => {
              return (
                <div>
                  <div>
                    {request.firstName} {request.lastName}
                  </div>
                  {/* <SmallButton onClick={() => acceptRequest(request)}>
                    Accept
                  </SmallButton>
                  <SmallButton onClick={() => rejectRequest(request)}>
                    Reject
                  </SmallButton> */}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div onClick={() => setContent("posts")}>posts</div>
      <div onClick={() => setContent("memebers")}>memebers</div>
      {isAdmin && <div onClick={() => setContent("admin")}>admin controls</div>}
      <main className="group-content">
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
