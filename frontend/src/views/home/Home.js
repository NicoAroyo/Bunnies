import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../redux/features/userSlice";

export const Home = () => {
  const user = useSelector(currentUser);

  return (
    <div>
      {(() => {
        if (!user) {
          return <h2>youre not logged in</h2>;
        } else if (user.isAdmin) {
          return <h2>youre an admin</h2>;
        } else {
          return <h2>youre not an admin</h2>;
        }
      })()}
    </div>
  );
};
