import { useState, useEffect } from "react";
import "./HomeFeed.css";
import profile from "../assets/grl dp.webp";
import sarah from "../assets/sarah.jpg";
import marcus from "../assets/monus.jpg";
import elens from "../assets/elens.webp";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function HomeFeed() {
  const navigate = useNavigate();

  const [likes, setLikes] = useState(1200);
  const [postText, setPostText] = useState("");

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await api.get("/auth/me/");
        setUser(response.data);
      } catch (error) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        navigate("/signin");
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, [navigate]);

  const handlePost = () => {
    if (!postText.trim()) {
      alert("Write something first!");
      return;
    }

    alert(`Post Created:\n\n${postText}`);
    setPostText("");
  };

  const handleLike = () => {
    setLikes((prev) => prev + 1);
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    alert("Logged out successfully!");
    navigate("/signin");
  };

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "grid",
          placeItems: "center",
          fontSize: "22px",
          fontWeight: "600",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div className="homePage">

      {/* Sidebar */}

      <aside className="sidebar">

        <h2 className="logo">
          ConnectSphere
        </h2>

        <ul>
          <li onClick={() => navigate("/home")}>📄 Feed</li>

          <li onClick={() => navigate("/messages")}>
            💬 Messaging
          </li>

          <li onClick={() => navigate("/analytics")}>
            📊 Analytics
          </li>

          <li onClick={() => navigate("/monetization")}>
            💰 Monetization
          </li>

          <li className="active">
            🛡 Moderation
          </li>

          <li onClick={() => navigate("/system")}>
            ⚙ System
          </li>
        </ul>

        {/* User Card */}

        <div className="userCard">

          <img
            src={profile}
            alt="Profile"
            className="userAvatar"
          />

          <h3>{user?.username}</h3>

          <p>{user?.email}</p>

        </div>

        <button
          className="createBtn"
          onClick={() => navigate("/create-post")}
        >
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
          onClick={() => navigate("/")}
        >
          ← Back
        </button>

      </aside>

      {/* Main Feed */}

      <main className="feed">

        {/* Header */}

        <div className="feedHeader">

          <input
            type="text"
            placeholder="Search ConnectSphere..."
          />

          <div className="topIcons">
            <span>🔔</span>
            <span>✉️</span>
            <span>👤</span>
          </div>

        </div>

        {/* Welcome Card */}

        <div className="welcomeCard">

          <div>

            <h2>
              Welcome back 👋
            </h2>

            <h3>{user?.username}</h3>

            <p>{user?.email}</p>

            <span>
              Ready to share something today?
            </span>

          </div>

          <img
            src={profile}
            alt="Profile"
            className="welcomeAvatar"
          />

        </div>

        {/* Stories */}

        <div className="stories">

          <div className="story addStory">
            +
          </div>

          <div className="story">
            <img src={sarah} alt="Sarah" />
            <span>Sarah</span>
          </div>

          <div className="story">
            <img src={marcus} alt="Marcus" />
            <span>Marcus</span>
          </div>

          <div className="story">
            <img src={elens} alt="Elena" />
            <span>Elena</span>
          </div>

        </div>

        {/* Create Post */}

        <div className="createPost">

          <img
            src={profile}
            alt="Profile"
          />

          <div className="createContent">

            <strong>{user?.username}</strong>

            <input
              type="text"
              placeholder="What's on your mind?"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />

          </div>

          <button onClick={handlePost}>
            Post
          </button>

        </div>

        {/* Demo Post */}

        <div className="postCard">

          <div className="postHeader">

            <img
              src={profile}
              alt="Profile"
            />

            <div>

              <h4>{user?.username}</h4>

              <p>Just now</p>

            </div>

          </div>

          <p className="postText">
            Welcome to ConnectSphere 🚀
            <br />
            Your authentication system is now connected successfully with the Django backend.
          </p>

          <img
            src={profile}
            alt="Post"
            className="postImage"
          />

          <div className="postActions">

            <span onClick={handleLike}>
              👍 Like ({likes})
            </span>

            <span>
              💬 Comment
            </span>

            <span>
              ↗ Share
            </span>

          </div>

        </div>

      </main>

      {/* Right Sidebar */}

      <aside className="rightSidebar">

        <div className="card">

          <h3>🔥 Trending Today</h3>

          <p>#SpatialComputing</p>
          <p>#DesignThinking</p>
          <p>#RemoteWork</p>
          <p>#Web3Future</p>

        </div>

        <div className="card">

          <h3>👥 Suggested For You</h3>

          <p>👤 Laila Horne</p>
          <p>👤 David Chen</p>
          <p>👤 Jordan Smith</p>

        </div>

      </aside>

    </div>
  );
}