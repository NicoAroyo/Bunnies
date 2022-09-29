import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddPost } from "../../components/add-post/AddPost";
import { Button, SmallButton } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { Modal } from "../../components/modal/Modal";
import { Post } from "../../components/post/Post";
import { UserPic } from "../../components/user-pic/UserPic";
import { currentUser, login } from "../../redux/features/userSlice";
import { PostService } from "../../service/posts/postService";
import "./Home.scss";

export const Home = () => {
  const user = useSelector(currentUser);
  const [showAddPostForm, setShowAddPostForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const storageUser = localStorage.getItem("user");
      if (storageUser) {
        const userObj = JSON.parse(storageUser);
        dispatch(login(userObj));
      }
      const postService = new PostService();
      (async () => {
        const data = await postService.getPosts();
        setPosts(data);
      })();
    } catch (error) {}
  }, []);

  return (
    <main className="home">
      <Modal
        show={showAddPostForm}
        closeModal={() => setShowAddPostForm(false)}
      >
        <AddPost />
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
