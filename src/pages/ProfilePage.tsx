import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./ProfilePage.css";

import {
  getMyProfile,
  updateProfile,
  uploadAvatar,
  uploadCover,
} from "../services/profile";

import defaultProfile from "../assets/profile icone.webp";

interface Profile {
  id: number;
  username: string;
  email: string;

  profile: {
    bio: string;
    website: string;
    location: string;
    birth_date: string;

    avatar: string | null;
    cover_photo: string | null;
  };
}

export default function ProfilePage() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<Profile | null>(null);

  const [loading, setLoading] = useState(true);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    bio: "",
    website: "",
    location: "",
    birth_date: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getMyProfile();

      setProfile(data);

      setFormData({
        bio: data.profile?.bio || "",
        website: data.profile?.website || "",
        location: data.profile?.location || "",
        birth_date: data.profile?.birth_date || "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
    // ===========================
  // Handle Form Input
  // ===========================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ===========================
  // Save Profile
  // ===========================

  const handleSave = async () => {
    try {
      const fd = new FormData();

      fd.append("bio", formData.bio);
      fd.append("website", formData.website);
      fd.append("location", formData.location);
      fd.append("birth_date", formData.birth_date);

      await updateProfile(fd);

      await loadProfile();

      alert("Profile updated successfully.");
    } catch (err: any) {
    console.log(err.response);

    if (err.response?.data) {
        alert(JSON.stringify(err.response.data));
    } else {
        alert(err.message);
    }
}
  };

  // ===========================
  // Upload Avatar
  // ===========================

  const handleAvatar = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.length) return;

    try {
      const fd = new FormData();

      fd.append("avatar", e.target.files[0]);

      await uploadAvatar(fd);

      await loadProfile();
    } catch (err) {
      console.error(err);
    }
  };

  // ===========================
  // Upload Cover
  // ===========================

  const handleCover = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.length) return;

    try {
      const fd = new FormData();

      fd.append("cover_photo", e.target.files[0]);

      await uploadCover(fd);

      await loadProfile();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>Loading Profile...</h2>;
  }  return (
    <div className="profilePage">

      {/* ================= BACK BUTTON ================= */}

      <button
        className="backBtn"
        onClick={() => navigate("/home")}
      >
        ← Back to Feed
      </button>

      {/* ================= COVER ================= */}

      <div className="coverSection">

        <img
          className="coverImage"
          src={
            profile?.profile?.cover_photo
              ? `http://127.0.0.1:8000${profile.profile.cover_photo}`
              : "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600"
          }
          alt="Cover"
        />

        <button
          className="coverEditBtn"
          onClick={() => coverInputRef.current?.click()}
        >
          📷 Edit Cover
        </button>

        <input
          type="file"
          accept="image/*"
          ref={coverInputRef}
          hidden
          onChange={handleCover}
        />

      </div>

      {/* ================= PROFILE HEADER ================= */}

      <div className="profileHeader">

        <div className="avatarWrapper">

          <img
            className="avatar"
            src={
              profile?.profile?.avatar
                ? `http://127.0.0.1:8000${profile.profile.avatar}`
                : defaultProfile
            }
            alt="Profile"
          />

          <button
            className="avatarEditBtn"
            onClick={() => avatarInputRef.current?.click()}
          >
            📷
          </button>

          <input
            type="file"
            accept="image/*"
            ref={avatarInputRef}
            hidden
            onChange={handleAvatar}
          />

        </div>

        <h2>{profile?.username}</h2>

        <p>{profile?.email}</p>

      </div>

      {/* ================= PROFILE FORM ================= */}

      <div className="profileCard">

        <h3>Edit Profile</h3>
                <label>Bio</label>

        <textarea
          name="bio"
          rows={4}
          value={formData.bio}
          onChange={handleChange}
          placeholder="Tell everyone about yourself..."
        />

        <label>Website</label>

        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://yourwebsite.com"
        />

        <label>Location</label>

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Pakistan"
        />

        <label>Birth Date</label>

        <input
          type="date"
          name="birth_date"
          value={formData.birth_date}
          onChange={handleChange}
        />

        <button
          className="saveBtn"
          onClick={handleSave}
        >
          💾 Save Changes
        </button>

      </div>

    </div>
  );
}