import React, { useEffect, useState } from "react";
import { GenericService } from "../../service/genericService";
import { PostService } from "../../service/posts/postService";

export const Buns = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      const service = new GenericService("users");
      const data = await service.getAllAsync();
      console.log(data);
      setUsers(data);
    })();
  }, []);
  return (
    <>
      <main>
        <h1>OUR BUNS:</h1>
        {users.map((user) => {
          return (
            <>
              <div>
                <h2>{user.firstName}</h2>
                <img src={user.imageUrl} alt="profile photo" />
                <button>Add Friend</button>
              </div>
            </>
          );
        }, [])}
      </main>
    </>
  );
};
