import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ModerationPage.css";

export default function ModerationPage() {
  const navigate = useNavigate();

  const [reports, setReports] = useState([
    {
      id: 1,
      title: "Reported Post #8291",
      reason: "Spam / misleading content detected.",
      status: "Pending",
    },
    {
      id: 2,
      title: "Reported User #4012",
      reason: "Harassment in comments.",
      status: "Pending",
    },
    {
      id: 3,
      title: "Reported Post #9210",
      reason: "Copyright violation.",
      status: "Pending",
    },
  ]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    navigate("/signin");
  };

  const handleAction = (id: number, action: string) => {
    alert(`${action} action performed on report ${id}`);

    setReports(
      reports.map((report) =>
        report.id === id ? { ...report, status: action } : report
      )
    );
  };

  return (
    <div className="moderationPage">
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
          onClick={() => alert("Create Post Clicked")}
        >
          Create Post
        </button>

        <button className="logoutBtn" onClick={handleLogout}>
          Logout
        </button>

        <button className="backBtn" onClick={() => navigate("/home")}>
          ← Back
        </button>
      </aside>

      {/* Main */}
      <main className="mainArea">
        <div className="topBar">
          <h1>Moderation Dashboard</h1>
          <button
            className="refreshBtn"
            onClick={() => alert("Reports refreshed")}
          >
            Refresh
          </button>
        </div>

        <div className="stats">
          <div className="statCard">
            <h3>Pending Reports</h3>
            <h2>{reports.filter((r) => r.status === "Pending").length}</h2>
          </div>

          <div className="statCard">
            <h3>Resolved</h3>
            <h2>{reports.filter((r) => r.status !== "Pending").length}</h2>
          </div>

          <div className="statCard">
            <h3>Moderators Online</h3>
            <h2>14</h2>
          </div>
        </div>

        <div className="reportSection">
          <h2>Reported Content</h2>

          {reports.map((report) => (
            <div key={report.id} className="reportCard">
              <div>
                <h3>{report.title}</h3>
                <p>{report.reason}</p>
                <span>Status: {report.status}</span>
              </div>

              <div className="actions">
                <button onClick={() => handleAction(report.id, "Reviewed")}>
                  Review
                </button>
                <button onClick={() => handleAction(report.id, "Removed")}>
                  Remove
                </button>
                <button onClick={() => handleAction(report.id, "Warned")}>
                  Warn
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}