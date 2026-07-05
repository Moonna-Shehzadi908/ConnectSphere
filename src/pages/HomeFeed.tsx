import { useState } from "react";
import "./HomeFeed.css";
import profile from "../assets/company.webp";
import sarah from "../assets/sarah.jpg";
import marcus from "../assets/monus.jpg";
import elens from "../assets/elens.webp";
import { useNavigate } from "react-router-dom";

export default function HomeFeed() {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(1200);
  const [postText, setPostText] = useState("");

  const handlePost = () => {
    if (!postText.trim()) {
      alert("Write something first!");
      return;
    }
    alert(`Post Created: ${postText}`);
    setPostText("");
  };

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    navigate("/signin");
  };

  return (
    <div className="homePage">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">ConnectSphere</h2>

        <ul>
          <li onClick={() => navigate("/home")}>📄 Feed</li>
          <li onClick={() => navigate("/messages")}>💬 Messaging</li>
          <li onClick={() => navigate("/analytics")}>📊 Analytics</li>
          <li onClick={() => navigate("/monetization")}>💰 Monetization</li>
          <li className="active">🛡 Moderation</li>
          <li onClick={() => navigate("/system")}>⚙ System</li>
        </ul>
      <button
  className="createBtn"
  onClick={() => navigate("/create-post")}
>
  Create Post
</button>

        <button className="logoutBtn" onClick={handleLogout}>
          Logout
        </button>

        <button className="backBtn" onClick={() => navigate("/")}>
          ← Back
        </button>
      </aside>

      {/* Main Feed */}
      <main className="feed">
        <div className="feedHeader">
          <input type="text" placeholder="Search ConnectSphere..." />

          <div className="topIcons">
            <span onClick={() => alert("Notifications")}>🔔</span>
            <span onClick={() => navigate("/messages")}>✉️</span>
            <span onClick={() => alert("Profile")}>👤</span>
          </div>
        </div>

        {/* Stories */}
        <div className="stories">
          <div className="story addStory">+</div>

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
          <img src={profile} alt="Profile" />

          <input
            type="text"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Share your latest insight..."
          />

          <button onClick={handlePost}>Post</button>
        </div>

        {/* Post */}
        <div className="postCard">
          <div className="postHeader">
            <img src={profile} alt="Profile" />

            <div>
              <h4>Alex Rivera</h4>
              <p>Senior Product Designer</p>
            </div>
          </div>

          <p className="postText">
            Just finished a deep dive into new spatial computing design trends.
          </p>

          <img src={profile} alt="Post" className="postImage" />

          <div className="postActions">
            <span onClick={handleLike}>👍 Like ({likes})</span>
            <span onClick={() => alert("Comment feature later")}>
              💬 Comment
            </span>
            <span onClick={() => alert("Share feature later")}>
              ↗ Share
            </span>
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="rightSidebar">
        <div className="card">
          <h3>Trending Now</h3>
          <p>#SpatialComputing</p>
          <p>#DesignThinking</p>
          <p>#RemoteWork</p>
          <p>#Web3Future</p>
        </div>

        <div className="card">
          <h3>Suggested For You</h3>
          <p>👤 Laila Horne</p>
          <p>👤 David Chen</p>
          <p>👤 Jordan Smith</p>
        </div>
      </aside>
    </div>
  );
}