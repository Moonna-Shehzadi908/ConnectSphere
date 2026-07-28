import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import "./HomeFeed.css";

import defaultProfile from "../assets/profile icone.webp";
import sarah from "../assets/sarah.jpg";
import marcus from "../assets/monus.jpg";
import elena from "../assets/elens.webp";

interface PostImage {
  id: number;
  image: string;
}

interface Post {
  id: number;
  username: string;
  avatar: string | null;
  content: string;
  visibility: string;
  created_at: string;
  images: PostImage[];
}

export default function HomeFeed() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [posts, setPosts] = useState<Post[]>([]);
  const [postText, setPostText] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingPosts, setFetchingPosts] =
    useState(true);

  // ===============================
  // Fetch Feed
  // ===============================

  const fetchPosts = async () => {
    try {
      setFetchingPosts(true);

      const response = await api.get(
        "/posts/feed/"
      );

      setPosts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingPosts(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ===============================
  // Create Post
  // ===============================

  const handlePost = async () => {
    if (!postText.trim()) return;

    try {
      setLoading(true);

      await api.post("/posts/", {
        content: postText,
        visibility: "PUBLIC",
      });

      setPostText("");

      fetchPosts();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Logout
  // ===============================

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <div className="homeContainer">
            {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        <h2 className="logo">
          ConnectSphere
        </h2>

        <ul>

          <li
            className="active"
            onClick={() => navigate("/home")}
          >
            📄 Feed
          </li>

          <li
            onClick={() => navigate("/messages")}
          >
            💬 Messaging
          </li>

          <li
            onClick={() => navigate("/analytics")}
          >
            📊 Analytics
          </li>

          <li
            onClick={() => navigate("/monetization")}
          >
            💰 Monetization
          </li>

          <li
            onClick={() => navigate("/moderation")}
          >
            🛡 Moderation
          </li>

          <li
            onClick={() => navigate("/system")}
          >
            ⚙ System
          </li>

        </ul>

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

      </aside>

      {/* ================= MAIN ================= */}

      <main className="feedArea">

        {/* Header */}

        <div className="feedHeader">

          <input
            type="text"
            placeholder="Search ConnectSphere..."
          />

          <div className="headerIcons">

            <span>🔔</span>

            <span
              onClick={() => navigate("/messages")}
            >
              ✉️
            </span>

            <img
              src={
                user?.profile?.avatar
                  ? `http://127.0.0.1:8000${user.profile.avatar}`
                  : defaultProfile
              }
              className="miniAvatar"
              alt="Profile"
              onClick={() => navigate("/profile")}
            />

          </div>

        </div>

        {/* Welcome */}

        <div className="welcomeCard">

          <h2>
            Welcome back,
            {" "}
            {user.username || "User"} 👋
          </h2>

          <p>
            {user.email}
          </p>

        </div>

        {/* Stories */}

        <div className="stories">

          <div className="story addStory">
            +
          </div>

          <div className="story">
            <img src={sarah} alt="" />
            <span>Sarah</span>
          </div>

          <div className="story">
            <img src={marcus} alt="" />
            <span>Marcus</span>
          </div>

          <div className="story">
            <img src={elena} alt="" />
            <span>Elena</span>
          </div>

        </div>

        {/* Create Post */}

        <div className="createPost">

          <img
            src={
              user?.profile?.avatar
                ? `http://127.0.0.1:8000${user.profile.avatar}`
                : defaultProfile
            }
            alt="Profile"
          />

          <input
            type="text"
            placeholder="Share something..."
            value={postText}
            onChange={(e) =>
              setPostText(e.target.value)
            }
          />

          <button
            onClick={handlePost}
            disabled={loading}
          >
            {loading ? "Posting..." : "Post"}
          </button>

        </div>

        {fetchingPosts && (
          <p className="loadingText">
            Loading posts...
          </p>
        )}

        {!fetchingPosts &&
          posts.length === 0 && (
            <p className="loadingText">
              No posts available.
            </p>
        )}        {/* ================= POSTS ================= */}

        {posts.map((post) => (

          <div
            className="postCard"
            key={post.id}
          >

            <div className="postHeader">

              <img
                src={
                  post.avatar
                    ? `http://127.0.0.1:8000${post.avatar}`
                    : defaultProfile
                }
                className="postAvatar"
                alt="Profile"
              />

              <div>

                <h4>{post.username}</h4>

                <small>
                  {new Date(
                    post.created_at
                  ).toLocaleString()}
                </small>

              </div>

            </div>

            <p className="postContent">
              {post.content}
            </p>

            {post.images.length > 0 && (

              <img
                src={`http://127.0.0.1:8000${post.images[0].image}`}
                className="postImage"
                alt="Post"
              />

            )}

            <div className="postActions">

              <button>
                👍 Like
              </button>

              <button>
                💬 Comment
              </button>

              <button>
                ↗ Share
              </button>

            </div>

          </div>

        ))}
              </main>

      {/* ================= RIGHT SIDEBAR ================= */}

      <aside className="rightSidebar">

        <div className="profileCard">

          <img
            src={
              user?.profile?.avatar
                ? `http://127.0.0.1:8000${user.profile.avatar}`
                : defaultProfile
            }
            className="profileCardAvatar"
            alt="Profile"
          />

          <h3>{user.username || "User"}</h3>

          <p>{user.email}</p>

          <button
            className="viewProfileBtn"
            onClick={() => navigate("/profile")}
          >
            View Profile
          </button>

        </div>

        <div className="rightCard">

          <h3>🔥 Trending</h3>

          <ul>
            <li>#ReactJS</li>
            <li>#TypeScript</li>
            <li>#Frontend</li>
            <li>#ArtificialIntelligence</li>
            <li>#WebDevelopment</li>
          </ul>

        </div>

        <div className="rightCard">

          <h3>Suggested People</h3>

          <div className="suggestItem">
            <img src={sarah} alt="Sarah" />
            <span>Sarah</span>
          </div>

          <div className="suggestItem">
            <img src={marcus} alt="Marcus" />
            <span>Marcus</span>
          </div>

          <div className="suggestItem">
            <img src={elena} alt="Elena" />
            <span>Elena</span>
          </div>

        </div>

      </aside>

    </div>
  );
}