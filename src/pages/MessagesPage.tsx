import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MessagesPage.css";
import profile from "../assets/company.webp";

export default function MessagesPage() {
  const navigate = useNavigate();

  const chats = [
    {
      id: 1,
      name: "Sarah Jenkins",
      message: "Hi! Final file sent.",
      online: true,
    },
    {
      id: 2,
      name: "Mona Chen",
      message: "Let's review tomorrow.",
      online: false,
    },
    {
      id: 3,
      name: "David Rodriguez",
      message: "Meeting at 5 PM",
      online: false,
    },
    {
      id: 4,
      name: "Project Alpha Team",
      message: "Task updated",
      online: true,
    },
  ];

  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "them",
      text: "Hi! Final file is ready for review.",
    },
    {
      sender: "me",
      text: "Great, send it here.",
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages([
      ...messages,
      {
        sender: "me",
        text: message,
      },
    ]);

    setMessage("");
  };
const handleLogout = () => {
  localStorage.removeItem("user"); // dummy logout
  alert("Logged out successfully!");
  navigate("/signin");
};
  return (
    <div className="messagePage">
      {/* LEFT SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">ConnectSphere</h2>

       <ul>
  <li onClick={() => navigate("/home")}>📄 Feed</li>
  <li className="active">💬 Messaging</li>
  <li onClick={() => alert("Analytics coming soon")}>📊 Analytics</li>
  <li onClick={() => alert("Monetization coming soon")}>💰 Monetization</li>
  <li onClick={() => alert("Moderation coming soon")}>🛡 Moderation</li>
  <li onClick={() => alert("System coming soon")}>⚙ System</li>
</ul>

<button className="createBtn">
  Create Post
</button>

<button className="logoutBtn" onClick={handleLogout}>
  Logout
</button>

<button className="backBtn" onClick={() => navigate("/home")}>
  ← Back
</button>
      </aside>

      {/* CHAT LIST */}
      <div className="chatSidebar">
        <div className="chatHeader">
          <h3>Messages</h3>
          <button>✎</button>
        </div>

        <input placeholder="Search messages..." />

        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`chatItem ${
              selectedChat.id === chat.id ? "selected" : ""
            }`}
            onClick={() => setSelectedChat(chat)}
          >
            <img src={profile} alt="" />

            <div>
              <h4>{chat.name}</h4>
              <p>{chat.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CHAT WINDOW */}
      <div className="chatWindow">
        <div className="topBar">
          <div className="userInfo">
            <img src={profile} alt="" />

            <div>
              <h4>{selectedChat.name}</h4>
              <p>{selectedChat.online ? "Online" : "Offline"}</p>
            </div>
          </div>

          <div className="topIcons">📹 📞 ⋮</div>
        </div>

        <div className="messagesBox">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.sender === "me"
                  ? "message me"
                  : "message them"
              }
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="messageInput">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message..."
          />

          <button onClick={sendMessage}>➤</button>
        </div>
      </div>
    </div>
  );
}