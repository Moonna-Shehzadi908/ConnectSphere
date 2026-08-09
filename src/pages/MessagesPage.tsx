import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MessagesPage.css";

import profile from "../assets/company.webp";

interface Chat {
  id: number;
  name: string;
  message: string;
  online: boolean;
  unread: number;
}

interface Message {
  id: number;
  sender: "me" | "them";
  text: string;
  time: string;
}

export default function MessagesPage() {
  const navigate = useNavigate();

  // ===============================
  // Chats
  // ===============================

  const chats: Chat[] = [
    {
      id: 1,
      name: "Sarah Jenkins",
      message: "Hi! Final file sent.",
      online: true,
      unread: 2,
    },
    {
      id: 2,
      name: "Mona Chen",
      message: "Let's review tomorrow.",
      online: false,
      unread: 0,
    },
    {
      id: 3,
      name: "David Rodriguez",
      message: "Meeting at 5 PM",
      online: false,
      unread: 1,
    },
    {
      id: 4,
      name: "Project Alpha Team",
      message: "Task updated",
      online: true,
      unread: 4,
    },
  ];

  const [selectedChat, setSelectedChat] = useState<Chat>(chats[0]);

  const [searchText, setSearchText] = useState("");

  const [message, setMessage] = useState("");

  const [showChatInfo, setShowChatInfo] = useState(false);

  // ===============================
  // Messages
  // ===============================

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "them",
      text: "Hi! Final file is ready for review.",
      time: "4:42 PM",
    },
    {
      id: 2,
      sender: "me",
      text: "Great, send it here.",
      time: "4:43 PM",
    },
    {
      id: 3,
      sender: "them",
      text: "Sure! I have sent the final version.",
      time: "4:44 PM",
    },
  ]);

  // ===============================
  // Search Chats
  // ===============================

  const filteredChats = useMemo(() => {
    const search = searchText.trim().toLowerCase();

    if (!search) {
      return chats;
    }

    return chats.filter((chat) =>
      chat.name.toLowerCase().includes(search)
    );
  }, [searchText]);

  // ===============================
  // Select Chat
  // ===============================

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
    setShowChatInfo(false);

    // Backend connect hone par yahan
    // selected chat ke messages fetch honge.
  };

  // ===============================
  // Send Message
  // ===============================

  const sendMessage = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    const newMessage: Message = {
      id: Date.now(),
      sender: "me",
      text: trimmedMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [
      ...prev,
      newMessage,
    ]);

    setMessage("");
  };

  // ===============================
  // Enter Key
  // ===============================

  const handleMessageKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
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

    navigate("/signin", {
      replace: true,
    });
  };

  return (
    <div className="messagePage">

      {/* =====================================
          LEFT SIDEBAR
      ====================================== */}

      <aside className="sidebar">

        <h2 className="logo">
          ConnectSphere
        </h2>

        <ul>

          <li
            onClick={() => navigate("/home")}
          >
            📄 Feed
          </li>

          <li className="active">
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

        <button
          className="backBtn"
          onClick={() => navigate("/home")}
        >
          ← Back
        </button>

      </aside>


      {/* =====================================
          CHAT LIST
      ====================================== */}

      <section className="chatSidebar">

        <div className="chatHeader">

          <h3>
            Messages
          </h3>

          <button
            className="newMessageBtn"
            title="New message"
            onClick={() => {
              alert("New message feature will be connected to backend.");
            }}
          >
            ✎
          </button>

        </div>


        {/* Search */}

        <div className="chatSearch">

          <span>
            🔍
          </span>

          <input
            type="text"
            placeholder="Search messages..."
            value={searchText}
            onChange={(event) =>
              setSearchText(event.target.value)
            }
          />

          {searchText && (
            <button
              className="clearSearch"
              onClick={() => setSearchText("")}
            >
              ×
            </button>
          )}

        </div>


        {/* Chat List */}

        <div className="chatList">

          {filteredChats.length > 0 ? (

            filteredChats.map((chat) => (

              <div
                key={chat.id}
                className={`chatItem ${
                  selectedChat.id === chat.id
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  handleSelectChat(chat)
                }
              >

                <div className="chatAvatarWrapper">

                  <img
                    src={profile}
                    alt={chat.name}
                    className="chatAvatar"
                  />

                  {chat.online && (
                    <span className="onlineDot" />
                  )}

                </div>


                <div className="chatDetails">

                  <div className="chatNameRow">

                    <h4>
                      {chat.name}
                    </h4>

                    {chat.unread > 0 && (
                      <span className="unreadBadge">
                        {chat.unread}
                      </span>
                    )}

                  </div>

                  <p>
                    {chat.message}
                  </p>

                </div>

              </div>

            ))

          ) : (

            <div className="noChats">
              <span>🔍</span>
              <p>
                No conversations found.
              </p>
            </div>

          )}

        </div>

      </section>


      {/* =====================================
          CHAT WINDOW
      ====================================== */}

      <main className="chatWindow">


        {/* Top Bar */}

        <div className="topBar">

          <div className="userInfo">

            <div className="topAvatarWrapper">

              <img
                src={profile}
                alt={selectedChat.name}
                className="topAvatar"
              />

              {selectedChat.online && (
                <span className="topOnlineDot" />
              )}

            </div>


            <div>

              <h4>
                {selectedChat.name}
              </h4>

              <p
                className={
                  selectedChat.online
                    ? "onlineStatus"
                    : "offlineStatus"
                }
              >
                {selectedChat.online
                  ? "🟢 Online"
                  : "⚪ Offline"}
              </p>

            </div>

          </div>


          <div className="topIcons">

            <button
              title="Video call"
              onClick={() =>
                alert("Video call feature coming soon.")
              }
            >
              📹
            </button>

            <button
              title="Voice call"
              onClick={() =>
                alert("Voice call feature coming soon.")
              }
            >
              📞
            </button>

            <button
              title="Chat information"
              onClick={() =>
                setShowChatInfo((prev) => !prev)
              }
            >
              ⋮
            </button>

          </div>

        </div>


        {/* Chat Info */}

        {showChatInfo && (

          <div className="chatInfoPanel">

            <img
              src={profile}
              alt={selectedChat.name}
            />

            <h3>
              {selectedChat.name}
            </h3>

            <p>
              {selectedChat.online
                ? "Online"
                : "Offline"}
            </p>

            <div className="chatInfoActions">

              <button>
                👤 Profile
              </button>

              <button>
                🔕 Mute
              </button>

              <button>
                🚫 Block
              </button>

            </div>

          </div>

        )}


        {/* Messages */}

        <div className="messagesBox">

          {messages.map((msg) => (

            <div
              key={msg.id}
              className={`messageRow ${
                msg.sender === "me"
                  ? "myMessageRow"
                  : "theirMessageRow"
              }`}
            >

              {msg.sender === "them" && (
                <img
                  src={profile}
                  alt={selectedChat.name}
                  className="messageAvatar"
                />
              )}

              <div
                className={`message ${
                  msg.sender === "me"
                    ? "me"
                    : "them"
                }`}
              >

                <span className="messageText">
                  {msg.text}
                </span>

                <span className="messageTime">
                  {msg.time}
                </span>

              </div>

            </div>

          ))}

        </div>


        {/* Message Input */}

        <div className="messageInput">

          <button
            className="attachmentBtn"
            title="Attach file"
            onClick={() =>
              alert("Attachment feature will be connected later.")
            }
          >
            📎
          </button>

          <input
            type="text"
            value={message}
            onChange={(event) =>
              setMessage(event.target.value)
            }
            onKeyDown={handleMessageKeyDown}
            placeholder={`Message ${selectedChat.name}...`}
          />

          <button
            className="emojiBtn"
            title="Emoji"
            onClick={() =>
              setMessage((prev) => `${prev} 😊`)
            }
          >
            😊
          </button>

          <button
            className="sendBtn"
            onClick={sendMessage}
            disabled={!message.trim()}
            title="Send message"
          >
            ➤
          </button>

        </div>

      </main>

    </div>
  );
}