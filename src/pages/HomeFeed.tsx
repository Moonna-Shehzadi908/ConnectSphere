import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import "./HomeFeed.css";

import profile from "../assets/profile icone.webp";
import sarah from "../assets/sarah.jpg";
import marcus from "../assets/monus.jpg";
import elens from "../assets/elens.webp";

interface Post {
  id: number;
  content: string;
  visibility: string;
  created_at: string;

  images: {
    id: number;
    image: string;
  }[];
}

export default function HomeFeed() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [likes, setLikes] = useState(1200);

  const [postText, setPostText] = useState("");

  const [posts, setPosts] = useState<Post[]>([]);

  const [loading, setLoading] = useState(false);

  const [fetchingPosts, setFetchingPosts] = useState(true);

  // ===========================
  // Fetch All Posts
  // ===========================

  const fetchPosts = async () => {

    try {

      const response = await api.get("/posts/feed/");

      console.log("Posts:", response.data);

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

  // ===========================
  // Create Post
  // ===========================

  const handlePost = async () => {

    if (!postText.trim()) {

      alert("Write something first!");

      return;

    }

    try {

      setLoading(true);

      await api.post("/posts/", {

        content: postText,

        visibility: "PUBLIC",

      });

      alert("Post Created Successfully!");

      setPostText("");

      fetchPosts();

    } catch (error: any) {

      console.log(error);

      alert("Failed to create post.");

    } finally {

      setLoading(false);

    }

  };

  // ===========================
  // Like
  // ===========================

  const handleLike = () => {

    setLikes((prev) => prev + 1);

  };

  // ===========================
  // Logout
  // ===========================

  const handleLogout = () => {

    localStorage.removeItem("access");

    localStorage.removeItem("refresh");

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

      <li
        className="active"
        onClick={() => navigate("/home")}
      >
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

  {/* Feed */}

  <main className="feed">

    <div className="feedHeader">

      <input
        type="text"
        placeholder="Search ConnectSphere..."
      />

      <div className="topIcons">

        <span>🔔</span>

        <span
          onClick={() => navigate("/messages")}
        >
          ✉️
        </span>

        <span>👤</span>

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
        <img src={elens} alt="" />
        <span>Elena</span>
      </div>

    </div>

    {/* Create Post */}

    <div className="createPost">

      <img
        src={profile}
        alt=""
      />

      <input
        type="text"
        value={postText}
        placeholder="Share your latest insight..."
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

    {/* Loading */}

    {fetchingPosts && (

      <div className="card">

        <p>Loading posts...</p>

      </div>

    )}

    {/* Empty Feed */}

    {!fetchingPosts &&
      posts.length === 0 && (

        <div className="card">

          <h3>No Posts Yet</h3>

          <p>
            Create your first post.
          </p>

        </div>

    )}

   {/* Dynamic Posts */}

{loading ? (

  <div className="postCard">
    <p>Loading posts...</p>
  </div>

) : posts.length === 0 ? (

  <div className="postCard">
    <p>No posts available.</p>
  </div>

) : (

  posts.map((post) => (

    <div className="postCard" key={post.id}>

      <div className="postHeader">

        <img src={profile} alt="Profile" />

        <div>
          <h4>{user.username}</h4>
          <p>{new Date(post.created_at).toLocaleString()}</p>
        </div>

      </div>

      <p className="postText">
        {post.content}
      </p>

      {post.images.length > 0 && (

        <img
          src={`http://127.0.0.1:8000${post.images[0].image}`}
          alt="Post"
          className="postImage"
        />

      )}

      <div className="postActions">

        <span onClick={handleLike}>
          👍 Like ({likes})
        </span>

        <span>💬 Comment</span>

        <span>↗ Share</span>

      </div>

    </div>

  ))

)}
</main>

<aside className="rightSidebar">

  ...
  ...
  ...

</aside>

</div>

);
}