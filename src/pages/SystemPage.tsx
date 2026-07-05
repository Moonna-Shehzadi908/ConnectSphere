import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SystemPage.css";

export default function SystemPage() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(true);
  const [backup, setBackup] = useState(true);
  const [twoFA, setTwoFA] = useState(true);
  const [search, setSearch] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out successfully");
    navigate("/signin");
  };

  const exportPDF = () => {
    alert("Exporting system report...");
  };

  const refreshData = () => {
    alert("System data refreshed!");
  };

  const flushCache = () => {
    alert("Cache cleared successfully!");
  };

  return (
    <div className="systemPage">
      {/* LEFT SIDEBAR */}
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
</button>        <button className="logoutBtn" onClick={handleLogout}>Logout</button>
        <button className="backBtn" onClick={() => navigate("/home")}>← Back</button>
      </aside>

      {/* MAIN */}
      <main className="mainPanel">
        <div className="headerRow">
          <div>
            <h1>Admin Overview</h1>
            <p>Real-time platform performance and system health</p>
          </div>

          <div className="headerBtns">
            <button onClick={exportPDF}>Export PDF</button>
            <button className="refreshBtn" onClick={refreshData}>Refresh</button>
          </div>
        </div>

        <div className="statsGrid">
          <div className="statCard">
            <p>Total Users</p>
            <h2>1.24M</h2>
          </div>

          <div className="statCard">
            <p>Active Users</p>
            <h2>842K</h2>
          </div>

          <div className="statCard">
            <p>Revenue Metrics</p>
            <h2>$2.4M</h2>
          </div>
        </div>

        <div className="moderationSection">
          <h3>Moderation Queue</h3>

          <div className="alertCard">
            <h4>Reported Post #8291</h4>
            <p>
              “This content potentially violates terms regarding intellectual
              property distribution.”
            </p>
            <div>
              <button onClick={() => alert("Reviewing report")}>Review</button>
              <button onClick={() => alert("Dismissed")}>Dismiss</button>
            </div>
          </div>

          <div className="alertCard">
            <h4>System Alert: High Traffic</h4>
            <p>
              Unusual traffic spike detected from European gateway nodes.
            </p>
            <div>
              <button onClick={() => alert("Analyzing traffic")}>Analyze</button>
              <button onClick={() => alert("Marked safe")}>Mark Safe</button>
            </div>
          </div>
        </div>
      </main>

      {/* RIGHT */}
      <aside className="settingsPanel">
        <h3>System Settings</h3>

        <div className="settingRow">
          <span>Theme Mode</span>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Dark" : "Light"}
          </button>
        </div>

        <div className="settingRow">
          <span>Automatic Backups</span>
          <input
            type="checkbox"
            checked={backup}
            onChange={() => setBackup(!backup)}
          />
        </div>

        <div className="settingRow">
          <span>Two-Factor Auth</span>
          <input
            type="checkbox"
            checked={twoFA}
            onChange={() => setTwoFA(!twoFA)}
          />
        </div>

        <div className="settingRow">
          <span>Global Search</span>
          <input
            type="checkbox"
            checked={search}
            onChange={() => setSearch(!search)}
          />
        </div>

        <button className="dangerBtn" onClick={flushCache}>
          Flush Cache System
        </button>
      </aside>
    </div>
  );
}