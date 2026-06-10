import "./LandingPage.css";
import heroImage from "../assets/landingpage.webp";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="page">

      {/* HEADER */}
      <header className="topHeader">
        <div className="menu">☰</div>

        <h1 className="title">ConnectSphere Social Hub</h1>

        <button className="signBtn">Sign In</button>
      </header>

      {/* MAIN CARD */}
      <section className="card">

        {/* NAVBAR */}
        <div className="navBar">

          <div className="logo">ConnectSphere</div>

          <nav className="navLinks">

            {/* ✅ ROUTED HOME */}
            <Link to="/">Home</Link>

            <a href="#">Features</a>
            <a href="#">Community</a>
            <a href="#">About</a>

          </nav>

          <div className="icons">🔔 ✉️ 👤</div>
        </div>

        {/* HERO TEXT */}
        <div className="heroText">
          <h2>
            Where Creative Minds
            <br />
            Collide and Grow.
          </h2>

          <p>
            ConnectSphere is a next-generation social ecosystem for creators,
            leaders, and innovators. Build meaningful connections and scale your impact.
          </p>

          <div className="buttons">
            <button className="primaryBtn">Join The Network</button>
            <button className="secondaryBtn">Explore Communities</button>
          </div>
        </div>

        {/* IMAGE */}
        <div className="imageBox">
          <img src={heroImage} alt="hero" />

          <div className="floatingCard">
            ⚡ Live Connection
            <p>2.6k users are active right now</p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="bottom">
          <h3>Designed for Impact</h3>
          <p>Modern tools for modern creators & professionals</p>
        </div>

      </section>
    </div>
  );
}