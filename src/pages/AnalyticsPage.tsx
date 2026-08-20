import { useNavigate } from "react-router-dom";
import "./AnalyticsPage.css";

export default function AnalyticsPage() {
  const navigate = useNavigate();

  return (
    <div className="analyticsPage">
      {/* LEFT SIDEBAR */}
      <aside className="analyticsSidebar">
        <h2>ConnectSphere</h2>
<ul>
          <li onClick={() => navigate("/home")}>📄 Feed</li>
          <li onClick={() => navigate("/messages")}>💬 Messaging</li>
          <li onClick={() => navigate("/analytics")}>📊 Analytics</li>
          <li onClick={() => navigate("/Moderation")}>📊 Moderation</li>
        </ul>

        <button
          className="createBtn"
          onClick={() => alert("Create post popup later")}
        >
          Create Post
        </button>

        <button
          className="logoutBtn"
          onClick={() => {
            localStorage.removeItem("user");
            alert("Logged out");
            navigate("/signin");
          }}
        >
          Logout
        </button>

        <button className="backBtn" onClick={() => navigate("/home")}>
          ← Back
        </button>
      </aside>

      {/* MAIN */}
      <main className="analyticsMain">
        <div className="analyticsHeader">
          <h1>Analytics Dashboard</h1>
          <input placeholder="Search analytics..." />
        </div>

        {/* CARDS */}
        <div className="statsGrid">
          <div className="statCard">
            <h3>Total Followers</h3>
            <p>12,540</p>
            <span>+12% this month</span>
          </div>

          <div className="statCard">
            <h3>Engagement Rate</h3>
            <p>78%</p>
            <span>+5% this week</span>
          </div>

          <div className="statCard">
            <h3>Total Posts</h3>
            <p>324</p>
            <span>+18 new posts</span>
          </div>

          <div className="statCard">
            <h3>Profile Views</h3>
            <p>8,942</p>
            <span>+22% growth</span>
          </div>
        </div>

        {/* CHARTS */}
        <div className="chartsRow">
          <div className="chartCard large">
            <h3>Audience Growth</h3>
            <div className="fakeChart">
              <div style={{ height: "40%" }}></div>
              <div style={{ height: "60%" }}></div>
              <div style={{ height: "55%" }}></div>
              <div style={{ height: "80%" }}></div>
              <div style={{ height: "70%" }}></div>
              <div style={{ height: "95%" }}></div>
            </div>
          </div>

          <div className="chartCard">
            <h3>Traffic Sources</h3>
            <p>Search: 40%</p>
            <p>Messages: 25%</p>
            <p>Feed: 20%</p>
            <p>External: 15%</p>
          </div>
        </div>

        {/* TABLE */}
        <div className="activityCard">
          <h3>Recent Activity</h3>

          <div className="activityItem">
            👍 New post received 245 likes
          </div>

          <div className="activityItem">
            💬 52 new messages today
          </div>

          <div className="activityItem">
            👤 120 profile visits
          </div>

          <div className="activityItem">
            📈 Engagement increased by 8%
          </div>
        </div>
      </main>
    </div>
  );
}