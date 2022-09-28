import React, { useEffect, useState } from "react";
import { UsersService } from "../../service/users/usersService";
import "./Friend.scss";

export const Friend = ({ userId }) => {
  const [user, setUser] = useState({});

  //   useEffect(() => {
  //     (async () => {
  //       const usersService = new UsersService();
  //         const data = await usersService.getUserById(userId);
  //       setUser(data);
  //       console.log(data);
  //     })();
  //   }, []);

  return (
    <div>
      <h2>{user?.firstName}</h2>
    </div>
  );
};
