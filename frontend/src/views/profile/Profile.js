import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { formatDateTime } from "../../utils/core";
import { FaBaby, FaGraduationCap } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";

export const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const [content, setContent] = useState("posts");
  const activeUser = useSelector(currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const profileService = new ProfileService();
      const profile = await profileService.getProfile(id);
      console.log(profile);
      setProfile(profile);
    })();
  }, [id]);

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

              {activeUser?._id === profile?.user?._id ? (
                <SmallButton onClick={() => navigate("/edit-profile")}>
                  edit profile
                </SmallButton>
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
            <p className="profile-bio">{profile?.user?.bio}</p>
          </div>

          <div className="profile-props">
            {profile?.user?.workplace && (
              <div className="property-group">
                <MdOutlineWork />
                <h4>{profile?.user?.workplace}</h4>
              </div>
            )}
            {profile?.user?.education && (
              <div className="property-group">
                <FaGraduationCap />
                <h4>{profile?.user?.education}</h4>
              </div>
            )}
            {profile?.user?.birthDate && (
              <div className="property-group">
                <FaBaby />
                <h4>{formatDateTime(profile?.user?.birthDate)}</h4>
              </div>
            )}
          </div>
        </section>

        <hr />
        <div className="profile-nav">
          <SmallButton
            isactive={content === "posts" ? 1 : 0}
            onClick={() => setContent("posts")}
          >
            posts
          </SmallButton>
          <SmallButton
            isactive={content === "friends" ? 1 : 0}
            onClick={() => setContent("friends")}
          >
            friends
          </SmallButton>
          <SmallButton
            isactive={content === "groups" ? 1 : 0}
            onClick={() => setContent("groups")}
          >
            groups
          </SmallButton>
        </div>

        <section className="profile-content">
          {(() => {
            switch (content) {
              case "posts":
                return profile.posts?.length === 0 ? (
                  <h3>No Posts to display</h3>
                ) : (
                  <div className="profile-posts">
                    {profile?.posts?.map((post) => (
                      <Post key={post._id} post={post} />
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
