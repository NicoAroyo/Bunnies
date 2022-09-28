import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserPic } from "../../components/user-pic/UserPic";
import { GenericService } from "../../service/genericService";
import { PostService } from "../../service/posts/postService";
import { Post } from "../../components/post/Post";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../redux/features/userSlice";
import "./Profile.scss";
import { RelationshipsService } from "../../service/relationships/relationshipsService";
import { Friend } from "../../components/friend/Friend";
import { ProfileService } from "../../service/profile/profileService";
import { SmallButton } from "../../components/button/Button";

export const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const [content, setContent] = useState("posts");
  const user = useSelector(currentUser);

  useEffect(() => {
    (async () => {
      const profileService = new ProfileService();
      const profile = await profileService.getProfile(id);
      setProfile(profile);

      console.log(profile.user);
      console.log(user);
    })();
  }, []);

  return (
    <>
      <main>
        <section className="profile-header">
          <UserPic
            style={{ height: "150px", width: "150px" }}
            imageurl={profile?.user?.imageUrl}
          />

          <div className="profile-header-details">
            <div className="profile-header-top">
              <h2>
                {profile?.user?.firstName} {profile?.user?.lastName}
              </h2>

              {user?._id === profile?.user?._id ? (
                <SmallButton>edit profile</SmallButton>
              ) : (
                <div className="button-container">
                  <SmallButton>add friend</SmallButton>
                  <SmallButton>message</SmallButton>
                </div>
              )}
            </div>

            <div className="profile-header-bottom">
              <h4>100 posts</h4>
              <h4>20 friends</h4>
            </div>
          </div>
        </section>

        <hr />
        <div className="profile-nav">
          <SmallButton
            isActive={content === "posts"}
            onClick={() => setContent("posts")}
          >
            posts
          </SmallButton>
          <SmallButton
            isActive={content === "friends"}
            onClick={() => setContent("friends")}
          >
            friends
          </SmallButton>
          <SmallButton
            isActive={content === "groups"}
            onClick={() => setContent("groups")}
          >
            groups
          </SmallButton>
        </div>

        <section className="profile-content">
          {(() => {
            switch (content) {
              case "posts":
                return (
                  <div className="profile-posts">
                    {profile?.posts?.map((post) => (
                      <Post post={post} />
                    ))}
                  </div>
                );

              case "friends":
                return <div>FRIENDS</div>;

              case "groups":
                return <div>GROUPS</div>;

              default:
                break;
            }
          })()}
        </section>
      </main>
    </>
  );
};
