import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./MonetizationPage.css";

export default function MonetizationPage() {
  const navigate = useNavigate();

  const [adsEnabled, setAdsEnabled] = useState(true);
  const [premiumEnabled, setPremiumEnabled] = useState(true);
  const [balance, setBalance] = useState(24580);

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    navigate("/signin");
  };

  const withdraw = () => {
    alert(`Rs ${balance} withdrawn successfully`);
    setBalance(0);
  };

  return (
    <div className="monetPage">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">ConnectSphere</h2>

        <ul>
          <li onClick={() => navigate("/home")}>📄 Feed</li>
          <li onClick={() => navigate("/messages")}>💬 Messaging</li>
          <li onClick={() => navigate("/analytics")}>📊 Analytics</li>
          <li className="active">💰 Monetization</li>
          <li onClick={() => navigate("/moderation")}>🛡 Moderation</li>
          <li onClick={() => navigate("/system")}>⚙ System</li>
        </ul>

        <button className="createBtn">Create Post</button>
        <button className="logoutBtn" onClick={handleLogout}>Logout</button>
        <button className="backBtn" onClick={() => navigate("/home")}>
          ← Back
        </button>
      </aside>

      {/* Main */}
      <main className="mainPanel">
        <div className="headerRow">
          <div>
            <h1>Monetization </h1>
            <p>Track earnings and revenue sources</p>
          </div>

          <button onClick={() => alert("Report Exported!")}>
            Export Report
          </button>
        </div>

        <div className="cardsGrid">
          <div className="card">
            <p>Total Revenue</p>
            <h2>Rs 245,000</h2>
          </div>

          <div className="card">
            <p>This Month</p>
            <h2>Rs 42,500</h2>
          </div>

          <div className="card">
            <p>Premium Users</p>
            <h2>1,240</h2>
          </div>
        </div>

        <div className="historyBox">
          <h3>Payment History</h3>

          <div className="historyRow">
            <span>Premium Subscription</span>
            <span>+ Rs 12,000</span>
          </div>

          <div className="historyRow">
            <span>Ads Revenue</span>
            <span>+ Rs 8,500</span>
          </div>

          <div className="historyRow">
            <span>Brand Promotion</span>
            <span>+ Rs 22,000</span>
          </div>
        </div>
      </main>

      {/* Right */}
      <aside className="settingsPanel">
        <h3>Earnings Settings</h3>

        <div className="settingRow">
          <span>Available Balance</span>
          <b>Rs {balance}</b>
        </div>

        <div className="settingRow">
          <span>Ads Revenue</span>
          <input
            type="checkbox"
            checked={adsEnabled}
            onChange={() => setAdsEnabled(!adsEnabled)}
          />
        </div>

        <div className="settingRow">
          <span>Premium Plans</span>
          <input
            type="checkbox"
            checked={premiumEnabled}
            onChange={() => setPremiumEnabled(!premiumEnabled)}
          />
        </div>

        <button className="withdrawBtn" onClick={withdraw}>
          Withdraw Earnings
        </button>
      </aside>
    </div>
  );
}