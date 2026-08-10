
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyProfile } from "../services/profile";
import api from "../services/api";

import "./HomeFeed.css";

import defaultProfile from "../assets/profile icone.webp";
import sarah from "../assets/sarah.jpg";
import marcus from "../assets/monus.jpg";
import elena from "../assets/elens.webp";

// ==========================================================
// TYPES
// ==========================================================

interface PostImage {
  id: number;
  image: string;
}

interface Comment {
  id: number;
  username: string;
  avatar: string | null;
  content: string;
  created_at: string;
  is_owner: boolean;
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

  is_owner: boolean;
  is_pinned: boolean;
  is_archived: boolean;

  comments: Comment[];
}

interface Profile {
  username?: string;
  email?: string;
  avatar?: string | null;
}

interface Story {
  id: number;
  name: string;
  image: string;
  text: string;
  storyImage?: string | null;
}

// ==========================================================
// COMPONENT
// ==========================================================

export default function HomeFeed() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  // ========================================================
  // STATES
  // ========================================================

  const [posts, setPosts] = useState<Post[]>([]);
  const [postText, setPostText] = useState("");

  const [, setLoading] = useState(false);
  const [fetchingPosts, setFetchingPosts] = useState(true);

  const [openMenu, setOpenMenu] =
    useState<number | null>(null);

  const [activeStory, setActiveStory] =
    useState<Story | null>(null);

  const [showAddStory, setShowAddStory] =
    useState(false);

  const [storyImage, setStoryImage] =
    useState<File | null>(null);

  const [storyText, setStoryText] =
    useState("");

  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [commentText, setCommentText] =
    useState<{
      [key: number]: string;
    }>({});

  const [openComments, setOpenComments] =
    useState<{
      [key: number]: boolean;
    }>({});

  // ========================================================
  // STORIES
  // Only stories with real images are displayed.
  // ========================================================

  const [stories, setStories] = useState<Story[]>([]);

  // ========================================================
  // MEDIA URL HELPER
  // ========================================================

  const getMediaUrl = (
    path: string | null | undefined
  ) => {
    if (!path) return "";

    if (
      path.startsWith("http://") ||
      path.startsWith("https://")
    ) {
      return path;
    }

    return `http://127.0.0.1:8000${
      path.startsWith("/") ? path : `/${path}`
    }`;
  };

  // ========================================================
  // LOAD PROFILE
  // ========================================================

  const loadProfile = async () => {
    try {
      const data = await getMyProfile();

      const loadedProfile: Profile =
        data.profile || {};

      setProfile(loadedProfile);

      // Only add/update current user's story
      if (loadedProfile.avatar) {
        const myStory: Story = {
          id: 1,
          name:
            loadedProfile.username ||
            user.username ||
            "You",
          image: getMediaUrl(
            loadedProfile.avatar
          ),
          text:
            "This is my story on ConnectSphere!",
        };

        setStories((prev) => {
          const withoutMyStory = prev.filter(
            (story) => story.id !== 1
          );

          return [
            myStory,
            ...withoutMyStory,
          ];
        });
      }
    } catch (error) {
      console.log(
        "Load profile error:",
        error
      );
    }
  };

  // ========================================================
  // FETCH POSTS
  // ========================================================

  const fetchPosts = async () => {
    try {
      setFetchingPosts(true);

      const response = await api.get(
        "/posts/feed/"
      );

      setPosts(response.data);
    } catch (error) {
      console.log(
        "Fetch posts error:",
        error
      );
    } finally {
      setFetchingPosts(false);
    }
  };

  // ========================================================
  // INITIAL LOAD
  // ========================================================

  useEffect(() => {
    fetchPosts();
    loadProfile();
  }, []);

  // ========================================================
  // OPEN ADD STORY MODAL
  // ========================================================

  const handleOpenAddStory = () => {
    setStoryImage(null);
    setStoryText("");
    setShowAddStory(true);
  };

  // ========================================================
  // OPEN STORY
  // ========================================================

  const handleOpenStory = (
    story: Story
  ) => {
    setActiveStory(story);
  };

  // ========================================================
  // ADD STORY
  // ========================================================

  const handleAddStory = () => {
    if (
      !storyImage &&
      !storyText.trim()
    ) {
      alert(
        "Please add an image or write something for your story."
      );
      return;
    }

    const imageUrl = storyImage
      ? URL.createObjectURL(storyImage)
      : profile?.avatar
      ? getMediaUrl(profile.avatar)
      : "";

    // If there is no image at all, don't create
    // a story that will appear as a blank DP.
    if (!imageUrl) {
      alert(
        "Please choose a story image."
      );
      return;
    }

    const newStory: Story = {
      id: Date.now(),

      name:
        profile?.username ||
        user.username ||
        "You",

      image: imageUrl,

      text:
        storyText.trim() ||
        "My new ConnectSphere story!",

      storyImage:
        storyImage
          ? imageUrl
          : null,
    };

    setStories((prev) => [
      newStory,
      ...prev,
    ]);

    setStoryImage(null);
    setStoryText("");
    setShowAddStory(false);

    // Automatically open newly-created story
    setActiveStory(newStory);
  };

  // ========================================================
  // CREATE QUICK POST
  // ========================================================

  const handlePost = async () => {
    if (!postText.trim()) return;

    try {
      setLoading(true);

      await api.post(
        "/posts/create/",
        {
          content:
            postText.trim(),
          visibility: "PUBLIC",
        }
      );

      setPostText("");

      await fetchPosts();
    } catch (error) {
      console.log(
        "Create post error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================================
  // LIKE / UNLIKE
  // ========================================================

  const handleLike = async (
    postId: number
  ) => {
    try {
      const response =
        await api.post(
          `/posts/${postId}/like/`
        );

      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (
            post.id !== postId
          ) {
            return post;
          }

          return {
            ...post,

            is_liked:
              response.data.liked,

            likes_count:
              response.data
                .likes_count,
          };
        })
      );
    } catch (error) {
      console.log(
        "Like error:",
        error
      );
    }
  };

  // ========================================================
  // ADD COMMENT
  // ========================================================

  const handleComment = async (
    postId: number
  ) => {
    const text =
      commentText[postId];

    if (!text?.trim()) return;

    try {
      const response =
        await api.post(
          `/posts/${postId}/comments/`,
          {
            content:
              text.trim(),
          }
        );

      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (
            post.id !== postId
          ) {
            return post;
          }

          return {
            ...post,

            comments: [
              ...(post.comments || []),
              response.data,
            ],

            comments_count:
              post.comments_count +
              1,
          };
        })
      );

      setCommentText(
        (prev) => ({
          ...prev,
          [postId]: "",
        })
      );
    } catch (error) {
      console.log(
        "Comment error:",
        error
      );
    }
  };

  // ========================================================
  // DELETE COMMENT
  // ========================================================

  const handleDeleteComment =
    async (
      postId: number,
      commentId: number
    ) => {
      try {
        await api.delete(
          `/posts/comments/${commentId}/delete/`
        );

        setPosts((prevPosts) =>
          prevPosts.map(
            (post) => {
              if (
                post.id !== postId
              ) {
                return post;
              }

              return {
                ...post,

                comments:
                  post.comments.filter(
                    (comment) =>
                      comment.id !==
                      commentId
                  ),

                comments_count:
                  Math.max(
                    0,
                    post.comments_count -
                      1
                  ),
              };
            }
          )
        );
      } catch (error) {
        console.log(
          "Delete comment error:",
          error
        );

        alert(
          "Failed to delete comment."
        );
      }
    };

  // ========================================================
  // FORMAT HASHTAGS / MENTIONS
  // ========================================================

  const formatPostContent = (
    text: string
  ) => {
    return text
      .split(/(\s+)/)
      .map((word, index) => {
        if (
          word.startsWith("#")
        ) {
          return (
            <span
              key={index}
              style={{
                color: "#2563eb",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {word}
            </span>
          );
        }

        if (
          word.startsWith("@")
        ) {
          return (
            <span
              key={index}
              style={{
                color: "#0ea5e9",
                fontWeight: 600,
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

  // ========================================================
  // SPLIT TITLE / DESCRIPTION / HASHTAGS
  // ========================================================

  const getPostParts = (
    content: string
  ) => {
    const parts =
      content.split(
        /\n\s*\n/
      );

    const title =
      parts[0]?.trim() || "";

    const description =
      parts[1]?.trim() || "";

    const hashtags =
      parts.length > 2
        ? parts
            .slice(2)
            .join("\n\n")
            .trim()
        : "";

    return {
      title,
      description,
      hashtags,
    };
  };

  // ========================================================
  // EDIT POST
  // ========================================================

  const handleEditPost =
    async (post: Post) => {
      const newContent =
        window.prompt(
          "Edit your post:",
          post.content
        );

      if (
        newContent === null
      ) {
        return;
      }

      if (
        !newContent.trim()
      ) {
        alert(
          "Post cannot be empty."
        );
        return;
      }

      if (
        newContent.trim() ===
        post.content.trim()
      ) {
        return;
      }

      try {
        setLoading(true);

        const response =
          await api.put(
            `/posts/${post.id}/update/`,
            {
              content:
                newContent.trim(),

              visibility:
                post.visibility,
            }
          );

        setPosts(
          (prevPosts) =>
            prevPosts.map(
              (item) =>
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
        console.log(
          "Edit post error:",
          error
        );

        alert(
          "Failed to edit post."
        );
      } finally {
        setLoading(false);
      }
    };

  // ========================================================
  // DELETE POST
  // ========================================================

  const handleDeletePost =
    async (
      postId: number
    ) => {
      const confirmed =
        window.confirm(
          "Are you sure you want to delete this post?"
        );

      if (!confirmed) {
        return;
      }

      try {
        setLoading(true);

        await api.delete(
          `/posts/${postId}/delete/`
        );

        setPosts(
          (prevPosts) =>
            prevPosts.filter(
              (post) =>
                post.id !==
                postId
            )
        );

        setOpenMenu(null);
      } catch (error) {
        console.log(
          "Delete post error:",
          error
        );

        alert(
          "Failed to delete post."
        );
      } finally {
        setLoading(false);
      }
    };

  // ========================================================
  // PIN POST
  // ========================================================

  const handlePinPost =
    async (post: Post) => {
      try {
        setLoading(true);

        await api.post(
          `/posts/${post.id}/pin/`
        );

        setPosts(
          (prevPosts) =>
            prevPosts.map(
              (item) =>
                item.id === post.id
                  ? {
                      ...item,
                      is_pinned:
                        true,
                    }
                  : item
            )
        );

        setOpenMenu(null);
      } catch (error) {
        console.log(
          "Pin post error:",
          error
        );

        alert(
          "Failed to pin post."
        );
      } finally {
        setLoading(false);
      }
    };

  // ========================================================
  // UNPIN POST
  // ========================================================

  const handleUnpinPost =
    async (
      postId: number
    ) => {
      try {
        setLoading(true);

        await api.post(
          `/posts/${postId}/unpin/`
        );

        setPosts(
          (prevPosts) =>
            prevPosts.map(
              (post) =>
                post.id === postId
                  ? {
                      ...post,
                      is_pinned:
                        false,
                    }
                  : post
            )
        );

        setOpenMenu(null);
      } catch (error) {
        console.log(
          "Unpin post error:",
          error
        );

        alert(
          "Failed to unpin post."
        );
      } finally {
        setLoading(false);
      }
    };

  // ========================================================
  // ARCHIVE POST
  // ========================================================

  const handleArchivePost =
    async (
      postId: number
    ) => {
      try {
        setLoading(true);

        await api.post(
          `/posts/${postId}/archive/`
        );

        setPosts(
          (prevPosts) =>
            prevPosts.map(
              (post) =>
                post.id === postId
                  ? {
                      ...post,
                      is_archived:
                        true,
                    }
                  : post
            )
        );

        setOpenMenu(null);
      } catch (error) {
        console.log(
          "Archive post error:",
          error
        );

        alert(
          "Failed to archive post."
        );
      } finally {
        setLoading(false);
      }
    };

  // ========================================================
  // RESTORE POST
  // ========================================================

  const handleRestorePost =
    async (
      postId: number
    ) => {
      try {
        setLoading(true);

        await api.post(
          `/posts/${postId}/restore/`
        );

        setPosts(
          (prevPosts) =>
            prevPosts.map(
              (post) =>
                post.id === postId
                  ? {
                      ...post,
                      is_archived:
                        false,
                    }
                  : post
            )
        );

        setOpenMenu(null);
      } catch (error) {
        console.log(
          "Restore post error:",
          error
        );

        alert(
          "Failed to restore post."
        );
      } finally {
        setLoading(false);
      }
    };

  // ========================================================
  // LOGOUT
  // ========================================================

  const handleLogout = () => {
    localStorage.removeItem(
      "access"
    );

    localStorage.removeItem(
      "refresh"
    );

    localStorage.removeItem(
      "user"
    );

    alert(
      "✅ Logout Successfully!"
    );

    navigate("/signin", {
      replace: true,
    });
  };

  // ========================================================
  // RENDER
  // ========================================================

  return (
    <div className="homePage">

      {/* ====================================================
          SIDEBAR
      ==================================================== */}

      <aside className="sidebar">

        <h2 className="logo">
          ConnectSphere
        </h2>

        <ul>

          <li
            className="active"
            onClick={() =>
              navigate("/home")
            }
          >
            📄 Feed
          </li>

          <li
            onClick={() =>
              navigate("/messages")
            }
          >
            💬 Messaging
          </li>

          <li
            onClick={() =>
              navigate("/analytics")
            }
          >
            📊 Analytics
          </li>

          <li
            onClick={() =>
              navigate("/monetization")
            }
          >
            💰 Monetization
          </li>

          <li
            onClick={() =>
              navigate("/moderation")
            }
          >
            🛡 Moderation
          </li>

          <li
            onClick={() =>
              navigate("/system")
            }
          >
            ⚙ System
          </li>

        </ul>

        <button
          className="createBtn"
          onClick={() =>
            navigate(
              "/create-post"
            )
          }
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

      {/* ====================================================
          MAIN FEED
      ==================================================== */}

      <main className="feedArea">

        {/* HEADER */}

        <div className="feedHeader">

          <input
            type="text"
            placeholder="Search ConnectSphere..."
          />

          <div className="headerIcons">

            <span>
              🔔
            </span>

            <span
              onClick={() =>
                navigate(
                  "/messages"
                )
              }
            >
              ✉️
            </span>

            <img
              src={
                profile?.avatar
                  ? getMediaUrl(
                      profile.avatar
                    )
                  : defaultProfile
              }
              className="miniAvatar"
              alt="Profile"
              onClick={() =>
                navigate(
                  "/profile"
                )
              }
            />

          </div>

        </div>

        {/* ==================================================
            WELCOME
        ================================================== */}

        <div className="welcomeCard">

          <h2>
            Welcome back,{" "}
            {user.username ||
              "User"}{" "}
            👋
          </h2>

          <p>
            {user.email}
          </p>

        </div>

        {/* ==================================================
            STORIES
        ================================================== */}

        <div className="storiesSection">

          {/* ADD STORY */}

          <div
            className="story addStory"
            onClick={
              handleOpenAddStory
            }
          >

            <div className="storyImageWrapper addStoryCircle">

              <span>
                +
              </span>

            </div>

            <span className="storyName">
              Add Story
            </span>

          </div>

          {/* ONLY REAL IMAGE STORIES */}

          {stories
            .filter(
              (story) =>
                Boolean(
                  story.image
                )
            )
            .map((story) => (

              <div
                className="story"
                key={
                  story.id
                }
                onClick={() =>
                  handleOpenStory(
                    story
                  )
                }
              >

                <div className="storyImageWrapper">

                  <img
                    src={
                      story.image
                    }
                    alt={
                      story.name
                    }
                  />

                </div>

                <span
                  className="storyName"
                  title={
                    story.name
                  }
                >
                  {
                    story.name
                  }
                </span>

              </div>

            ))}

        </div>

        {/* ==================================================
            QUICK POST
        ================================================== */}

        <div className="quickPost">

          {/* <img
            src={
              profile?.avatar
                ? getMediaUrl(
                    profile.avatar
                  )
                : defaultProfile
            }
            className="quickPostAvatar"
            alt="Profile"
          /> */}

          <input
            type="text"
            placeholder="Share something..."
            value={
              postText
            }
            onChange={(e) =>
              setPostText(
                e.target.value
              )
            }
            onKeyDown={(e) => {
              if (
                e.key ===
                "Enter"
              ) {
                handlePost();
              }
            }}
          />

       <button
  className="postBtn"
  onClick={handlePost}
>
  Post
</button>

        </div>

        {/* ==================================================
            NO POSTS
        ================================================== */}

        {!fetchingPosts &&
          posts.length === 0 && (
            <p className="loadingText">
              No posts available.
            </p>
          )}

        {/* ==================================================
            POSTS
        ================================================== */}

        {posts.map(
          (post) => {

            const {
              title,
              description,
              hashtags,
            } =
              getPostParts(
                post.content
              );

            return (
              <div
                className="postCard"
                key={
                  post.id
                }
              >

                {/* POST HEADER */}

                <div className="postHeader">

                  <img
                    src={
                      post.avatar
                        ? getMediaUrl(
                            post.avatar
                          )
                        : defaultProfile
                    }
                    className="postAvatar"
                    alt={
                      post.username
                    }
                  />

                  <div className="postUserDetails">

                    <h4>
                      {
                        post.username
                      }
                    </h4>

                    <small>
                      {new Date(
                        post.created_at
                      ).toLocaleString()}
                    </small>

                    {post.is_pinned && (
                      <span className="pinBadge">
                        📌 Pinned
                      </span>
                    )}

                  </div>

                  {/* OWNER MENU */}

                  {post.is_owner && (

                    <div className="postMenu">

                      <button
                        className="menuBtn"
                        onClick={() =>
                          setOpenMenu(
                            openMenu ===
                              post.id
                              ? null
                              : post.id
                          )
                        }
                      >
                        ⋮
                      </button>

                      {openMenu ===
                        post.id && (

                        <div className="menuDropdown">

                          <button
                            onClick={() =>
                              handleEditPost(
                                post
                              )
                            }
                          >
                            ✏ Edit Post
                          </button>

                          <button
                            onClick={() =>
                              handleDeletePost(
                                post.id
                              )
                            }
                          >
                            🗑 Delete Post
                          </button>

                          {post.is_pinned ? (

                            <button
                              onClick={() =>
                                handleUnpinPost(
                                  post.id
                                )
                              }
                            >
                              📍 Unpin Post
                            </button>

                          ) : (

                            <button
                              onClick={() =>
                                handlePinPost(
                                  post
                                )
                              }
                            >
                              📌 Pin Post
                            </button>

                          )}

                          {post.is_archived ? (

                            <button
                              onClick={() =>
                                handleRestorePost(
                                  post.id
                                )
                              }
                            >
                              ♻ Restore
                            </button>

                          ) : (

                            <button
                              onClick={() =>
                                handleArchivePost(
                                  post.id
                                )
                              }
                            >
                              📦 Archive
                            </button>

                          )}

                        </div>

                      )}

                    </div>

                  )}

                </div>

                {/* POST TITLE */}

                {title && (
                  <h3
                    style={{
                      fontSize:
                        "19px",
                      fontWeight:
                        700,
                      color:
                        "#111827",
                      marginBottom:
                        "10px",
                    }}
                  >
                    {
                      title
                    }
                  </h3>
                )}

                {/* POST DESCRIPTION */}

                <p className="postContent">

                  {description
                    ? formatPostContent(
                        description
                      )
                    : formatPostContent(
                        title ||
                          post.content
                      )}

                </p>

                {/* HASHTAGS */}

                {hashtags && (
                  <p
                    className="postContent"
                    style={{
                      marginTop:
                        "-8px",
                    }}
                  >
                    {formatPostContent(
                      hashtags
                    )}
                  </p>
                )}

                {/* POST IMAGE */}

                {post.images &&
                  post.images.length >
                    0 &&
                  post.images[0]
                    .image && (

                    <img
                      src={getMediaUrl(
                        post
                          .images[0]
                          .image
                      )}
                      className="postImage"
                      alt="Post"
                      onError={(
                        e
                      ) => {
                        console.error(
                          "Post image failed:",
                          getMediaUrl(
                            post
                              .images[0]
                              .image
                          )
                        );

                        e.currentTarget.style.display =
                          "none";
                      }}
                    />

                  )}

                {/* ACTIONS */}

                <div className="postActions">

                  <button
                    onClick={() =>
                      handleLike(
                        post.id
                      )
                    }
                  >
                    {post.is_liked
                      ? "❤️ Liked"
                      : "🤍 Like"}{" "}
                    (
                    {
                      post.likes_count
                    }
                    )
                  </button>

                  <button
                    onClick={() =>
                      setOpenComments(
                        (prev) => ({
                          ...prev,
                          [post.id]:
                            !prev[
                              post.id
                            ],
                        })
                      )
                    }
                  >
                    💬 Comments (
                    {
                      post.comments_count
                    }
                    )
                  </button>

                  <button
                    onClick={() => {

                      const shareUrl =
                        `${window.location.origin}/post/${post.id}`;

                      if (
                        navigator.share
                      ) {

                        navigator.share(
                          {
                            title:
                              title ||
                              "ConnectSphere Post",

                            text:
                              description ||
                              post.content,

                            url:
                              shareUrl,
                          }
                        );

                      } else {

                        navigator.clipboard.writeText(
                          shareUrl
                        );

                        alert(
                          "Post link copied!"
                        );
                      }

                    }}
                  >
                    ↗ Share
                  </button>

                </div>

                {/* ==================================================
                    COMMENTS
                ================================================== */}

                {openComments[
                  post.id
                ] && (

                  <div className="commentSection">

                    {post.comments?.map(
                      (
                        comment
                      ) => (

                        <div
                          key={
                            comment.id
                          }
                          className="commentItem"
                        >

                          <img
                            className="commentAvatar"
                            src={
                              comment.avatar
                                ? getMediaUrl(
                                    comment.avatar
                                  )
                                : defaultProfile
                            }
                            alt="Profile"
                          />

                          <div className="commentBody">

                            <strong>
                              {
                                comment.username
                              }
                            </strong>

                            <p>
                              {
                                comment.content
                              }
                            </p>

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

                      )
                    )}

                    {/* COMMENT INPUT */}

                    <div className="commentInput">

                      <input
                        type="text"
                        placeholder="Write a comment..."
                        value={
                          commentText[
                            post.id
                          ] || ""
                        }
                        onChange={(
                          e
                        ) =>
                          setCommentText(
                            (prev) => ({
                              ...prev,
                              [post.id]:
                                e
                                  .target
                                  .value,
                            })
                          )
                        }
                        onKeyDown={(
                          e
                        ) => {

                          if (
                            e.key ===
                            "Enter"
                          ) {
                            handleComment(
                              post.id
                            );
                          }

                        }}
                      />

                      <button
                        onClick={() =>
                          handleComment(
                            post.id
                          )
                        }
                      >
                        Send
                      </button>

                    </div>

                  </div>

                )}

              </div>
            );
          }
        )}

      </main>

      {/* ====================================================
          RIGHT SIDEBAR
      ==================================================== */}

      <aside className="rightSidebar">

        {/* PROFILE */}

        <div className="profileCard">

          <img
            src={
              profile?.avatar
                ? getMediaUrl(
                    profile.avatar
                  )
                : defaultProfile
            }
            className="profileCardAvatar"
            alt="Profile"
          />

          <h3>
            {
              user.username ||
              "User"
            }
          </h3>

          <p>
            {
              user.email
            }
          </p>

          <button
            className="viewProfileBtn"
            onClick={() =>
              navigate(
                "/profile"
              )
            }
          >
            View Profile
          </button>

        </div>

        {/* TRENDING */}

        <div className="rightCard">

          <h3>
            🔥 Trending
          </h3>

          <ul>

            <li>
              #ReactJS
            </li>

            <li>
              #TypeScript
            </li>

            <li>
              #Frontend
            </li>

            <li>
              #ArtificialIntelligence
            </li>

            <li>
              #WebDevelopment
            </li>

          </ul>

        </div>

        {/* SUGGESTED PEOPLE */}

        <div className="rightCard">

          <h3>
            Suggested People
          </h3>

          <div className="suggestItem">

            <img
              src={sarah}
              alt="Sarah"
            />

            <span>
              Sarah
            </span>

          </div>

          <div className="suggestItem">

            <img
              src={marcus}
              alt="Marcus"
            />

            <span>
              Marcus
            </span>

          </div>

          <div className="suggestItem">

            <img
              src={elena}
              alt="Elena"
            />

            <span>
              Elena
            </span>

          </div>

        </div>

      </aside>

      {/* ====================================================
          STORY VIEWER
      ==================================================== */}

      {activeStory && (

        <div
          className="storyViewerOverlay"
          onClick={() =>
            setActiveStory(null)
          }
        >

          <div
            className="storyViewer"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* CLOSE */}

            <button
              className="storyCloseBtn"
              onClick={() =>
                setActiveStory(
                  null
                )
              }
            >
              ✕
            </button>

            {/* STORY HEADER */}

            <div className="storyViewerHeader">

              <img
                src={
                  activeStory.image
                }
                alt={
                  activeStory.name
                }
              />

              <div>

                <strong>
                  {
                    activeStory.name
                  }
                </strong>

                <small>
                  Just now
                </small>

              </div>

            </div>

            {/* STORY CONTENT */}

            <div className="storyViewerContent">

              {activeStory.storyImage && (

                <img
                  src={
                    activeStory.storyImage
                  }
                  alt="Story"
                  className="storyFullImage"
                />

              )}

              <p>
                {
                  activeStory.text
                }
              </p>

            </div>

          </div>

        </div>

      )}

      {/* ====================================================
          ADD STORY MODAL
      ==================================================== */}

      {showAddStory && (

        <div
          className="addStoryOverlay"
          onClick={() =>
            setShowAddStory(
              false
            )
          }
        >

          <div
            className="addStoryModal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="addStoryHeader">

              <h2>
                Create Story
              </h2>

              <button
                className="storyCloseBtn"
                onClick={() =>
                  setShowAddStory(
                    false
                  )
                }
              >
                ✕
              </button>

            </div>

            {/* STORY TEXT */}

            <textarea
              className="storyTextInput"
              placeholder="Write something for your story..."
              value={
                storyText
              }
              onChange={(e) =>
                setStoryText(
                  e.target.value
                )
              }
            />

            {/* STORY IMAGE */}

            <label className="storyUpload">

              📷 Choose Story Image

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(
                  e
                ) => {

                  if (
                    e.target.files
                      ?.length
                  ) {

                    setStoryImage(
                      e.target.files[0]
                    );

                  }

                }}
              />

            </label>

            {/* IMAGE PREVIEW */}

            {storyImage && (

              <div className="storyUploadPreview">

                <img
                  src={URL.createObjectURL(
                    storyImage
                  )}
                  alt="Story preview"
                />

              </div>

            )}

            {/* ACTIONS */}

            <div className="storyModalActions">

              <button
                className="cancelStoryBtn"
                onClick={() =>
                  setShowAddStory(
                    false
                  )
                }
              >
                Cancel
              </button>

              <button
                className="publishStoryBtn"
                onClick={
                  handleAddStory
                }
              >
                🚀 Add Story
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}
