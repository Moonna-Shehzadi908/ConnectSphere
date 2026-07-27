import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMyProfile,
  updateProfile,
  uploadAvatar,
  uploadCover,
} from "../services/profileApi";

import "./ProfilePage.css";
const navigate = useNavigate();
export default function ProfilePage() {
  const [profile, setProfile] =useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [bio, setBio] = useState("");

  const [website, setWebsite] = useState("");

  const [location, setLocation] = useState("");

  const [birthDate, setBirthDate] = useState("");

  // ==========================
  // Load Profile
  // ==========================

  const loadProfile = async () => {
    try {
      const data = await getMyProfile();

      console.log(data);

      setProfile(data);

      setBio(data.profile.bio || "");

      setWebsite(data.profile.website || "");

      setLocation(data.profile.location || "");

      setBirthDate(data.profile.birth_date || "");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // ==========================
  // Upload Avatar
  // ==========================

  const handleAvatar = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    if (!e.target.files?.length) return;

    const formData = new FormData();

    formData.append(
      "avatar",
      e.target.files[0]
    );

    await uploadAvatar(formData);

    loadProfile();
  };

  // ==========================
  // Upload Cover
  // ==========================

  const handleCover = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    if (!e.target.files?.length) return;

    const formData = new FormData();

    formData.append(
      "cover_photo",
      e.target.files[0]
    );

    await uploadCover(formData);

    loadProfile();
  };

  // ==========================
  // Save Profile
  // ==========================

  const handleSave = async () => {

    try {

      setSaving(true);

      const formData = new FormData();

      formData.append("bio", bio);

      formData.append("website", website);

      formData.append("location", location);

      formData.append("birth_date", birthDate);

      await updateProfile(formData);

      alert("Profile Updated Successfully");

      loadProfile();

    } catch (err) {

      console.log(err);

      alert("Update Failed");

    } finally {

      setSaving(false);

    }
  };

  if (loading) {
    return <h2>Loading Profile...</h2>;
  }
  return (

<div className="profilePage">

  {/* =========================
      Cover Section
  ========================== */}
<div className="coverSection">
<button
  className="backButton"
  onClick={() => navigate("/home")}
>
  ← Back
</button>
  <img
    src={
      profile.profile?.cover_photo
        ? `http://127.0.0.1:8000${profile.profile.cover_photo}`
        : "https://placehold.co/1200x250"
    }
    alt="Cover"
    className="coverImage"
  />

  <label className="coverBtn">
    Change Cover
    <input
      type="file"
      accept="image/*"
      hidden
    />
  </label>

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

  <label className="avatarBtn">
    Change Photo
    <input
      type="file"
      accept="image/*"
      hidden
    />
  </label>

  <h2>{profile.username}</h2>

  <p>{profile.email}</p>

</div>

  {/* =========================
      Avatar Section
  ========================== */}

  <div className="profileHeader">

    <img
      className="avatar"
      src={
        profile.profile.avatar
          ? `http://127.0.0.1:8000${profile.profile.avatar}`
          : "https://placehold.co/150?text=Profile"
      }
      alt="Avatar"
    />

    <label className="avatarUpload">

      Change Photo

      <input
        type="file"
        accept="image/*"
        hidden
        onChange={handleAvatar}
      />

    </label>

    <h2>{profile.user.username}</h2>

    <p>{profile.user.email}</p>

  </div>
    {/* =========================
      Edit Profile
  ========================== */}

  <div className="profileCard">

    <h3>Edit Profile</h3>

    <label>Bio</label>

    <textarea
      value={bio}
      onChange={(e) => setBio(e.target.value)}
      placeholder="Tell everyone about yourself..."
      rows={4}
    />

    <label>Website</label>

    <input
      type="text"
      value={website}
      onChange={(e) => setWebsite(e.target.value)}
      placeholder="https://yourwebsite.com"
    />

    <label>Location</label>

    <input
      type="text"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      placeholder="Pakistan"
    />

    <label>Birth Date</label>

    <input
      type="date"
      value={birthDate}
      onChange={(e) => setBirthDate(e.target.value)}
    />

    <button
      className="saveBtn"
      onClick={handleSave}
      disabled={saving}
    >
      {saving ? "Saving..." : "Save Changes"}
    </button>

  </div>
  </div>

);
}