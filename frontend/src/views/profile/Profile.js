import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserPic } from "../../components/user-pic/UserPic";
import { GenericService } from "../../service/genericService";
import { PostService } from "../../service/posts/postService";
import { Post } from "../../components/post/Post";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../redux/features/userSlice";
import "./Profile.scss";

export const Profile = () => {
  const { id } = useParams();
  const [profileOwner, setProfileOwner] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const user = useSelector(currentUser);

  useEffect(() => {
    (async () => {
      const userService = new GenericService("users");
      const data = await userService.getByIdAsync(id);
      console.log(data);
      setProfileOwner(data);

      const postService = new PostService();
      const posts = await postService.getPostsByUser(data._id);
      console.log("POSTS", posts);
      setUserPosts(posts);

      console.log("CURRENT USER", user);
    })();
  }, []);

  return (
    <>
      <main>
        <section className="profile-header">
          <div className="profile-photo-name">
            <UserPic
              style={{ height: "150px", width: "150px" }}
              imageurl={profileOwner.imageUrl}
            />
            <h2>
              {profileOwner.firstName} {profileOwner.lastName}
            </h2>
          </div>
          <div>add friend....</div>
        </section>

        <div>
          <h2>USER POSTS</h2>
          {userPosts.map((post) => {
            return (
              <>
                <Post post={post} />
              </>
            );
          })}
        </div>
      </main>
    </>
  );
};
