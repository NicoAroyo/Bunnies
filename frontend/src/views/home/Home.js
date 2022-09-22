import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddPost } from "../../components/add-post/AddPost";
import { Button } from "../../components/button/Button";
import Map from "../../components/map/Map";
import { Post } from "../../components/post/Post";
import { currentUser, login } from "../../redux/features/userSlice";
import { PostService } from "../../service/posts/postService";
import { MapMenu } from "../mapMenu/mapMenu";
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
        console.log(data);
        setPosts(data);
      })();
      console.log("POSTS", posts);
    } catch (error) {}
  }, []);

  return (
    <main className="home">
      <Button onClick={() => setShowAddPostForm(!showAddPostForm)}>
        Add a post
      </Button>
      {showAddPostForm && <AddPost />}
      <div className="feed">
        {posts?.map((post) => {
          return <Post key={post._id} post={post} />;
        })}
      </div>
    </main>
  );
};
