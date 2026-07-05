import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePostPage.css";
import profile from "../assets/grl dp.webp";

export default function CreatePostPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Technology");
  const [audience, setAudience] = useState("Public");
  const [hashtags, setHashtags] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    navigate("/signin");
  };

  const handlePublish = () => {
    if (!title || !description) {
      alert("Please enter title and description.");
      return;
    }

    alert("✅ Post published successfully.");
  };

  const handleDraft = () => {
    alert("📂 Draft saved successfully.");
  };

  const handlePreview = () => {
    alert("👀 Live Preview Updated.");
  };

  const handleClear = () => {
    setTitle("");
    setDescription("");
    setCategory("Technology");
    setAudience("Public");
    setHashtags("");
    setImage(null);

    alert("Form cleared.");
  };

  return (
    <div className="createPostPage">

      {/* Sidebar */}

      <aside className="sidebar">

        <h2 className="logo">ConnectSphere</h2>

        <ul>

          <li onClick={() => navigate("/home")}>
            📄 Feed
          </li>

          <li onClick={() => navigate("/messages")}>
            💬 Messaging
          </li>

          <li onClick={() => navigate("/analytics")}>
            📊 Analytics
          </li>

          <li onClick={() => navigate("/monetization")}>
            💰 Monetization
          </li>

          <li onClick={() => navigate("/moderation")}>
            🛡 Moderation
          </li>

          <li onClick={() => navigate("/system")}>
            ⚙ System
          </li>

        </ul>

        <button className="createBtn">
          Create Post
        </button>

        <button
          className="logoutBtn"
          onClick={handleLogout}
        >
          Logout
        </button>

        <button
          className="backBtn"
          onClick={() => navigate("/home")}
        >
          ← Back
        </button>

      </aside>

      {/* Main Content */}

      <main className="mainContent">

        <h1 className="pageTitle">
          Create New Post
        </h1>

        <p className="pageSubTitle">
          Share ideas, updates and professional insights with your ConnectSphere community.
        </p>

        <div className="formCard">

          <div className="formGroup">

            <label>Post Title *</label>

            <input
              type="text"
              placeholder="Example: The Future of Artificial Intelligence"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

          </div>

          <div className="formGroup">

            <label>Description *</label>

            <textarea
              placeholder="Write a professional post that engages your audience..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

          </div>
                    {/* Category & Audience */}

          <div className="row">

            <div className="formGroup">

              <label>Category</label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Technology</option>
                <option>Business</option>
                <option>Design</option>
                <option>Marketing</option>
                <option>Education</option>
                <option>Career</option>
              </select>

            </div>

            <div className="formGroup">

              <label>Audience</label>

              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              >
                <option>Public</option>
                <option>Followers</option>
                <option>Private</option>
              </select>

            </div>

          </div>

          {/* Hashtags */}

          <div className="formGroup">

            <label>Hashtags</label>

            <input
              className="hashInput"
              type="text"
              placeholder="#technology #react #career"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
            />

            <small className="helperText">
              Add relevant hashtags to increase your post reach.
            </small>

          </div>

          {/* Upload */}

          <div className="formGroup">

            <label>Upload Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.length) {
                  setImage(e.target.files[0]);
                }
              }}
            />

            <small className="helperText">
              JPG, PNG or WEBP • Max size 5 MB
            </small>

            {image && (
              <div className="previewImage">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                />
              </div>
            )}

          </div>

          {/* Buttons */}

          <div className="buttonGroup">

            <button
              className="draftBtn"
              onClick={handleDraft}
            >
              💾 Save Draft
            </button>

            <button
              className="previewBtn"
              onClick={handlePreview}
            >
              👀 Preview
            </button>

            <button
              className="publishBtn"
              onClick={handlePublish}
            >
              🚀 Publish Post
            </button>

            <button
              className="clearBtn"
              onClick={handleClear}
            >
              🗑 Clear Form
            </button>

          </div>

        </div>

      </main>
            {/* ==========================
          LIVE PREVIEW PANEL
      ========================== */}

      <aside className="previewPanel">

        <h2>Live Preview</h2>

        <div className="previewCard">

          <div className="previewHeader">

            <img
              src={profile}
              alt="Profile"
            />

            <div>

              <h3>Your Profile</h3>

              <span>{audience}</span>

            </div>

          </div>

          <h2>
            {title || "Your post title"}
          </h2>

          <p>
            {description ||
              "Your post description will appear here as users will see it after publishing."}
          </p>

          {hashtags && (
            <div className="hashtags">
              {hashtags}
            </div>
          )}

          {image && (
            <img
              className="postPreviewImage"
              src={URL.createObjectURL(image)}
              alt="Preview"
            />
          )}

          <div className="previewFooter">

            <span>❤️ 0 Likes</span>

            <span>💬 0 Comments</span>

            <span>↗ Share</span>

          </div>

        </div>

      </aside>

    </div>
  );
}