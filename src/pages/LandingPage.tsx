import "./LandingPage.css";
import heroImage from "../assets/landingpage.webp";
import feature1 from "../assets/company.webp";
import feature2 from "../assets/mbl.webp";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      {/* HEADER */}
      <header className="topHeader">
        <div className="menu">☰</div>

        <h1 className="title">ConnectSphere Social Hub</h1>

        <button
          className="signBtn"
          onClick={() => navigate("/signup")}
        >
          Sign In
        </button>
      </header>

      {/* MAIN CARD */}
      <section className="card">
        {/* NAVBAR */}
        <div className="navBar">
          <div className="logo">ConnectSphere</div>

          <nav className="navLinks">
            <button className="navBtn" onClick={() => navigate("/home")}>
              Home
            </button>

            <button
              className="navBtn"
              onClick={() => alert("Features page coming soon")}
            >
              Features
            </button>

            <button
              className="navBtn"
              onClick={() => alert("Community page coming soon")}
            >
              Community
            </button>

            <button
              className="navBtn"
              onClick={() => alert("About page coming soon")}
            >
              About
            </button>
          </nav>

          <div className="icons">🔔 ✉️ 👤</div>
        </div>

        {/* HERO */}
        <div className="heroText">
          <h2>
            Where Creative Minds
            <br />
            Collide and Grow.
          </h2>

          <p>
            ConnectSphere is a next-generation social ecosystem
            for creators, leaders, and innovators.
          </p>

          <div className="buttons">
            <button
              className="primaryBtn"
              onClick={() => navigate("/home")}
            >
              Join The Network
            </button>

            <button
              className="secondaryBtn"
              onClick={() => alert("Communities coming soon")}
            >
              Explore Communities
            </button>
          </div>
        </div>

        <div className="imageBox">
          <img src={heroImage} alt="hero" />

          <div className="floatingCard">
            <strong>⚡ Live Connection</strong>
            <p>2.6k users active right now</p>
          </div>
        </div>

        <div className="bottom">
          <h3>Designed for Impact</h3>
          <p>Modern tools for modern creators & professionals</p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="featuresSection">
        <div className="featureCard">
          <div className="featureIcon">✦</div>
          <h4>Infinite Connections</h4>
          <p>Expand your network.</p>
        </div>

        <div className="featureImage">
          <img src={feature1} alt="" />
        </div>

        <div className="featureCard purple">
          <div className="featureIcon">✦</div>
          <h4>Unified Growth</h4>
          <p>Collaborate on one platform.</p>
        </div>

        <div className="featureCard">
          <div className="featureIcon">▣</div>
          <h4>Precision Analytics</h4>
          <p>Track engagement in real time.</p>
        </div>

        <div className="featureImage">
          <img src={feature2} alt="" />
        </div>

        <div className="featureCard">
          <div className="featureIcon">↗</div>
          <h4>Exponential Growth</h4>
          <p>Unlock opportunities.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="ctaSection">
        <h2>Ready to scale your influence?</h2>
        <p>Join ConnectSphere today.</p>

        <button className="primaryBtn">Get Started Now</button>
      </section>
    </div>
  );
}