import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserPic } from "../../components/user-pic/UserPic";
import { GenericService } from "../../service/genericService";

export const Profile = () => {
  const { id } = useParams();
  const [profileOwner, setProfileOwner] = useState({});

  useEffect(() => {
    (async () => {
      const userService = new GenericService("users");
      const data = await userService.getByIdAsync(id);
      console.log(data);
      setProfileOwner(data);

      //TODO:
      //display all users posts in chronological order.
      //create a backend route that gets all the posts of a user
    })();
  });

  return (
    <>
      <main>
        <UserPic
          style={{ height: "150px", width: "150px" }}
          imageurl={profileOwner.imageUrl}
        />
      </main>
    </>
  );
};
