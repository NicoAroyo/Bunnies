import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddPost } from "../../components/add-post/AddPost";
import { Button } from "../../components/button/Button";
import Map from "../../components/map/Map";
import { currentUser, login } from "../../redux/features/userSlice";
import { PostService } from "../../service/posts/postService";
import { MapMenu } from "../mapMenu/mapMenu";

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
    <main>
      <Button onClick={() => setShowAddPostForm(!showAddPostForm)}>
        Add a post
      </Button>
      {showAddPostForm && <AddPost />}
      {posts?.map((post) => {
        return (
          <div>
            <img src={post?.imageUrl} />
            <p>src: {post?.imageUrl}</p>
            <p>content: {post?.content}</p>
            <p>
              location: {post?.location.lat}, {post?.location.lng}
            </p>
            <p>content: {post?.userId}</p>
            <p>content: {post?.date}</p>
            <p>content: {post?.privacy}</p>
          </div>
        );
      })}
    </main>
  );
};
