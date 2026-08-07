import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyProfile } from "../services/profile";

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
  updated_at: string;

  images: PostImage[];

  likes_count: number;
  is_liked: boolean;

  comments_count: number;

  // 👇 NEW FIELDS
  is_owner: boolean;
  is_pinned: boolean;
  is_archived: boolean;

  comments: {
    id: number;
    username: string;
    avatar: string | null;
    content: string;
    created_at: string;
    is_owner: boolean;
  }[];
}
export default function HomeFeed() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [posts, setPosts] = useState<Post[]>([]);
  const [postText, setPostText] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingPosts, setFetchingPosts] = useState(true);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const [profile, setProfile] = useState<any>(null);

  const [commentText, setCommentText] = useState<{
    [key: number]: string;
  }>({});
const [openComments, setOpenComments] = useState<{
  [key:number]:boolean;
}>({});

  const loadProfile = async () => {
    try {
      const data = await getMyProfile();

      setProfile(data.profile);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
    loadProfile();
  }, []);
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



  // ===============================
  // Create Post
  // ===============================

  const handlePost = async () => {
    if (!postText.trim()) return;

    try {
      setLoading(true);

     await api.post("/posts/create/", {
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
// Handle Like / Unlike Post
// ==============================
  const handleLike = async (postId: number) => {
  try {
    await api.post(`/posts/${postId}/like/`);

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id !== postId) return post;

        return {
          ...post,
          is_liked: !post.is_liked,
          likes_count: post.is_liked
            ? post.likes_count - 1
            : post.likes_count + 1,
        };
      })
    );
  } catch (error) {
    console.log(error);
  }
};
  const handleComment = async (postId: number) => {
  const text = commentText[postId];

  if (!text?.trim()) return;

  try {
    const response = await api.post(
      `/posts/${postId}/comments/`,
      {
        content: text,
      }
    );

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id !== postId) return post;

        return {
          ...post,
          comments: [...post.comments, response.data],
          comments_count: post.comments_count + 1,
        };
      })
    );

    setCommentText((prev) => ({
      ...prev,
      [postId]: "",
    }));

  } catch (error) {
    console.log(error);
  }
};
const handleDeleteComment = async (
  postId: number,
  commentId: number
) => {
  try {
    await api.delete(
      `/posts/comments/${commentId}/delete/`
    );

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id !== postId) return post;

        return {
          ...post,
          comments: post.comments.filter(
            (comment) => comment.id !== commentId
          ),
          comments_count:
            post.comments_count - 1,
        };
      })
    );

  } catch (error) {
    console.log("Delete comment error:", error);
    alert("Failed to delete comment.");
  }
};
  const formatPostContent = (text: string) => {
  return text.split(/(\s+)/).map((word, index) => {
    if (word.startsWith("#")) {
      return (
        <span
          key={index}
          style={{
            color: "#2563eb",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          {word}
        </span>
      );
    }

    if (word.startsWith("@")) {
      return (
        <span
          key={index}
          style={{
            color: "#0ea5e9",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          {word}
        </span>
      );
    }

    return word;
  });
};
// ===============================
// Edit Post
// ===============================

const handleEditPost = async (post: Post) => {
  const newContent = window.prompt(
    "Edit your post:",
    post.content
  );

  // Cancel ya empty text
  if (newContent === null) return;

  if (!newContent.trim()) {
    alert("Post cannot be empty.");
    return;
  }

  // Agar same text hai to kuch nahi karna
  if (newContent.trim() === post.content.trim()) {
    return;
  }

  try {
    setLoading(true);

    const response = await api.put(
      `/posts/${post.id}/update/`,
      {
        content: newContent.trim(),
        visibility: post.visibility,
      }
    );

    // Updated post ko frontend state mein replace karo
    setPosts((prevPosts) =>
      prevPosts.map((item) =>
        item.id === post.id
          ? {
              ...item,
              ...response.data,
            }
          : item
      )
    );

    setOpenMenu(null);

  } catch (error) {
    console.log("Edit post error:", error);
    alert("Failed to edit post.");
  } finally {
    setLoading(false);
  }
};
// ===============================
// Delete Post
// ===============================

const handleDeletePost = async (postId: number) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this post?"
  );

  if (!confirmed) return;

  try {
    setLoading(true);

    await api.delete(
      `/posts/${postId}/delete/`
    );

    // Remove deleted post from UI
    setPosts((prevPosts) =>
      prevPosts.filter(
        (post) => post.id !== postId
      )
    );

    setOpenMenu(null);

  } catch (error) {
    console.log(
      "Delete post error:",
      error
    );

    alert("Failed to delete post.");
  } finally {
    setLoading(false);
  }
};
// ===============================
// Pin / Unpin Post
// ===============================

const handlePinPost = async (post: Post) => {
  try {
    setLoading(true);

    const response = await api.post(
      `/posts/${post.id}/pin/`
    );

    setPosts((prevPosts) =>
      prevPosts.map((item) =>
        item.id === post.id
          ? {
              ...item,
              ...response.data,
              is_pinned: true,
            }
          : item
      )
    );

    setOpenMenu(null);

  } catch (error) {
    console.log("Pin post error:", error);
    alert("Failed to pin post.");
  } finally {
    setLoading(false);
  }
};
// ===============================
// Unpin Post
// ===============================

const handleUnpinPost = async (postId: number) => {
  try {
    setLoading(true);

    const response = await api.post(
      `/posts/${postId}/unpin/`
    );

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              ...response.data,
              is_pinned: false,
            }
          : post
      )
    );

    setOpenMenu(null);

  } catch (error) {
    console.log("Unpin post error:", error);
    alert("Failed to unpin post.");
  } finally {
    setLoading(false);
  }
};
// ===============================
// Archive Post
// ===============================

const handleArchivePost = async (postId: number) => {
  try {
    setLoading(true);

    const response = await api.post(
      `/posts/${postId}/archive/`
    );

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              ...response.data,
              is_archived: true,
            }
          : post
      )
    );

    setOpenMenu(null);

  } catch (error) {
    console.log("Archive post error:", error);
    alert("Failed to archive post.");
  } finally {
    setLoading(false);
  }
};
// ===============================
// Restore Post
// ===============================

const handleRestorePost = async (postId: number) => {
  try {
    setLoading(true);

    const response = await api.post(
      `/posts/${postId}/restore/`
    );

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              ...response.data,
              is_archived: false,
            }
          : post
      )
    );

    setOpenMenu(null);

  } catch (error) {
    console.log("Restore post error:", error);
    alert("Failed to restore post.");
  } finally {
    setLoading(false);
  }
};
  // ===============================
  // Logout
  // ===============================
const handleLogout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");

  alert("✅ Logout Successfully!");

  navigate("/signin", { replace: true });
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
  profile?.avatar
    ? `http://127.0.0.1:8000${profile.avatar}`
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
    user?.avatar
      ? `http://127.0.0.1:8000${user.avatar}`
      : profile?.avatar
      ? `http://127.0.0.1:8000${profile.avatar}`
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

  <div className="postUser">

    <div>

      <h4>{post.username}</h4>

      <small>
        {new Date(post.created_at).toLocaleString()}
      </small>

      {post.is_pinned && (
        <span className="pinBadge">
          📌 Pinned
        </span>
      )}

    </div>

  </div>

  {post.is_owner && (

    <div className="postMenu">

      <button
        className="menuBtn"
        onClick={() =>
          setOpenMenu(
            openMenu === post.id
              ? null
              : post.id
          )
        }
      >
        ⋮
      </button>

      {openMenu === post.id && (

        <div className="menuDropdown">

       <button
  onClick={() => handleEditPost(post)}
>
  ✏ Edit Post
</button>

          <button
  onClick={() =>
    handleDeletePost(post.id)
  }
>
  🗑 Delete Post
</button>

          {post.is_pinned ? (

           <button
  onClick={() => handleUnpinPost(post.id)}
>
  📍 Unpin Post
</button>

          ) : (

         <button
  onClick={() => handlePinPost(post)}
>
  📌 Pin Post
</button>

          )}

          {post.is_archived ? (

          <button
  onClick={() => handleRestorePost(post.id)}
>
  ♻ Restore
</button>

          ) : (

          <button
  onClick={() => handleArchivePost(post.id)}
>
  📦 Archive
</button>

          )}

        </div>

      )}

    </div>

  )}

</div>

           <p className="postContent">
  {formatPostContent(post.content)}
</p>

            {post.images.length > 0 && (

              <img
                src={`http://127.0.0.1:8000${post.images[0].image}`}
                className="postImage"
                alt="Post"
              />

            )}

           <div className="postActions">

  <button onClick={() => handleLike(post.id)}>
    {post.is_liked ? "❤️ Liked" : "🤍 Like"} ({post.likes_count})
  </button>

  <button
    onClick={() =>
      setOpenComments((prev) => ({
        ...prev,
        [post.id]: !prev[post.id],
      }))
    }
  >
    💬 Comments ({post.comments_count})
  </button>

 <button
  onClick={() => {
    if (navigator.share) {
      navigator.share({
        title: "ConnectSphere Post",
        text: post.content,
        url: `${window.location.origin}/post/${post.id}`,
      });
    } else {
      navigator.clipboard.writeText(
        `${window.location.origin}/post/${post.id}`
      );

      alert("Post link copied!");
    }
  }}
>
  ↗ Share
</button>

</div>
{openComments[post.id] && (
  <div className="commentSection">

    {post.comments?.map((comment) => (

      <div
        key={comment.id}
        className="commentItem"
      >

       

       <div className="commentBody">

  <strong>{comment.username}</strong>

  <p>{comment.content}</p>

  {comment.is_owner && (
    <button
      className="deleteCommentBtn"
      onClick={() =>
        handleDeleteComment(
          post.id,
          comment.id
        )
      }
    >
      🗑 Delete
    </button>
  )}

</div>

      </div>

    ))}

    <div className="commentInput">

      <input
        type="text"
        placeholder="Write a comment..."
        value={commentText[post.id] || ""}
        onChange={(e) =>
          setCommentText((prev) => ({
            ...prev,
            [post.id]: e.target.value,
          }))
        }
      />

      <button
        onClick={() => handleComment(post.id)}
      >
        Send
      </button>

    </div>

  </div>
)}

</div>

))}

</main>

      {/* ================= RIGHT SIDEBAR ================= */}

      <aside className="rightSidebar">

        <div className="profileCard">

          <img
            src={
  profile?.avatar
    ? `http://127.0.0.1:8000${profile.avatar}`
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