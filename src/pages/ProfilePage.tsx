import { useEffect, useState } from "react";
import { getMyProfile } from "../services/profileApi";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getMyProfile();
      setProfile(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Profile...</h2>;
  }

  return (
    <div className="profilePage">

      <div className="coverSection">

        <img
          src={
            profile.profile?.cover_photo
              ? `http://127.0.0.1:8000${profile.profile.cover_photo}`
              : "https://placehold.co/1200x250"
          }
          alt="Cover"
          className="coverImage"
        />

      </div>

      <div className="profileInfo">

        <img
          src={
            profile.profile?.avatar
              ? `http://127.0.0.1:8000${profile.profile.avatar}`
              : "https://placehold.co/150"
          }
          alt="Avatar"
          className="avatar"
        />

        <h2>{profile.username}</h2>

        <p>{profile.email}</p>

        <p>{profile.profile?.bio}</p>

        <p>{profile.profile?.website}</p>

        <p>{profile.profile?.location}</p>

      </div>

    </div>
  );
}