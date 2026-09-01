import { useState } from "react";
import "./LandingPage.css";

import heroImage from "../assets/landingpage.webp";
import feature1 from "../assets/emplyee.webp";
import feature2 from "../assets/mbl.webp";

import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Check whether the user is logged in
  const isLoggedIn = () => {
    const user = localStorage.getItem("user");
    return !!user;
  };

  // Protected navigation
  const requireLogin = (path: string) => {
    if (!isLoggedIn()) {
      alert(
        "Please Sign In or create an account first to access ConnectSphere."
      );
      navigate("/signin");
      return;
    }

    navigate(path);
  };

  // Scroll to a landing-page section
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setMenuOpen(false);
  };

  // Close mobile/dropdown menu
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Scroll to top
  const goHome = () => {
    closeMenu();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="page">

      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div className="ambient ambientOne" />
      <div className="ambient ambientTwo" />
      <div className="ambient ambientThree" />

      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <header className="topHeader">

        {/* MENU BUTTON */}

        <button
          className={`menu ${menuOpen ? "menuActive" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        {/* PAGE TITLE */}

        <div className="titleWrap">
          <span className="titleDot" />
          <h1 className="title">
            ConnectSphere
          </h1>
          <span className="titleLabel">
            Social Hub
          </span>
        </div>

        {/* SIGN IN */}

        <button
          className="signBtn"
          onClick={() => navigate("/signin")}
        >
          <span>Sign In</span>
          <span className="signArrow">↗</span>
        </button>

      </header>


      {/* =====================================================
          DROPDOWN MENU
      ===================================================== */}

      {menuOpen && (
        <>
          <div
            className="menuBackdrop"
            onClick={closeMenu}
          />

          <div className="landingMenu">

            <div className="menuHeader">
              <span>Navigation</span>
              <button
                className="menuClose"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <button onClick={goHome}>
              <span className="menuIcon">⌂</span>
              <span>Home</span>
            </button>

            <button
              onClick={() => scrollToSection("features")}
            >
              <span className="menuIcon">✦</span>
              <span>Features</span>
            </button>

            <button
              onClick={() => {
                closeMenu();
                requireLogin("/home");
              }}
            >
              <span className="menuIcon">◉</span>
              <span>Community</span>
            </button>

            <button
              onClick={() => scrollToSection("about")}
            >
              <span className="menuIcon">i</span>
              <span>About</span>
            </button>

            <button
              onClick={() => {
                closeMenu();
                navigate("/signin");
              }}
            >
              <span className="menuIcon">↪</span>
              <span>Sign In</span>
            </button>

          </div>
        </>
      )}


      {/* =====================================================
          MAIN LANDING CARD
      ===================================================== */}

      <main className="card">

        {/* ===================================================
            NAVBAR
        =================================================== */}

        <div className="navBar">

          {/* LOGO */}

          <button
            className="logo"
            onClick={goHome}
            aria-label="Go to home"
          >
            <span className="logoMark">
              C
            </span>

            <span className="logoText">
              Connect<span>Sphere</span>
            </span>
          </button>


          {/* NAVIGATION */}

          <nav className="navLinks">

            <button
              className="navBtn activeNav"
              onClick={goHome}
            >
              Home
            </button>

            <button
              className="navBtn"
              onClick={() => scrollToSection("features")}
            >
              Features
            </button>

            <button
              className="navBtn"
              onClick={() => requireLogin("/home")}
            >
              Community
            </button>

            <button
              className="navBtn"
              onClick={() => scrollToSection("about")}
            >
              About
            </button>

          </nav>


          {/* HEADER ACTIONS */}

          <div className="icons">

            {/* SEARCH */}

            <button
              className="iconBtn"
              onClick={() => requireLogin("/search")}
              title="Search"
              aria-label="Search"
            >
              <span>⌕</span>
            </button>


            {/* NOTIFICATIONS */}

            <button
              className="iconBtn notificationBtn"
              onClick={() => requireLogin("/notifications")}
              title="Notifications"
              aria-label="Notifications"
            >
              <span>♢</span>
              <i />
            </button>


            {/* MESSAGES */}

            <button
              className="iconBtn"
              onClick={() => requireLogin("/messages")}
              title="Messages"
              aria-label="Messages"
            >
              <span>✉</span>
            </button>


            {/* PROFILE */}

            <button
              className="iconBtn profileBtn"
              onClick={() => requireLogin("/profile")}
              title="Profile"
              aria-label="Profile"
            >
              <span>◯</span>
            </button>

          </div>

        </div>


        {/* =====================================================
            HERO SECTION
        ===================================================== */}

        <section className="hero">

          {/* HERO TEXT */}

          <div className="heroText">

            <div className="heroBadge">
              <span className="badgeSpark">✦</span>

              <span>
                Connect. Create. Grow.
              </span>

              <span className="badgeLive">
                LIVE
              </span>
            </div>


            <h2>
              Where Creative
              <br />

              <span>
                Minds Collide.
              </span>
            </h2>


            <p>
              A next-generation social ecosystem built for
              creators, leaders, professionals, and innovators
              who want to connect, collaborate, and grow together.
            </p>


            {/* HERO BUTTONS */}

            <div className="buttons">

              <button
                className="primaryBtn"
                onClick={() => requireLogin("/home")}
              >
                <span>Join The Network</span>
                <span className="btnArrow">→</span>
              </button>


              <button
                className="secondaryBtn"
                onClick={() => requireLogin("/home")}
              >
                <span className="playIcon">▶</span>
                <span>Explore Communities</span>
              </button>

            </div>


            {/* HERO TRUST */}

            <div className="heroTrust">

              <div className="avatarStack">
                <span>U</span>
                <span>C</span>
                <span>D</span>
                <span>+</span>
              </div>

              <div className="trustText">
                <strong>2.6k+</strong>
                <span>people connecting today</span>
              </div>

            </div>

          </div>


          {/* =================================================
              HERO VISUAL
          ================================================= */}

          <div className="imageBox">

            <div className="imageGlow" />

            <div className="imageFrame">

              <img
                src={heroImage}
                alt="ConnectSphere community"
              />

              <div className="imageOverlay" />

            </div>


            {/* LIVE CONNECTION CARD */}

            <div className="floatingCard">

              <div className="liveIcon">
                <span />
              </div>

              <div>
                <strong>
                  Live Connection
                </strong>

                <p>
                  2.6k users active right now
                </p>
              </div>

              <span className="floatingArrow">
                ↗
              </span>

            </div>


            {/* FLOATING STATUS */}

            <div className="floatingStatus">

              <span className="statusPulse" />

              <div>
                <strong>
                  Network Status
                </strong>

                <small>
                  All systems active
                </small>
              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            ABOUT / INTRO
        ===================================================== */}

        <section
          className="bottom"
          id="about"
        >

          <div className="sectionEyebrow">
            <span />
            WHY CONNECTSPHERE
            <span />
          </div>

          <h3>
            Designed for <span>Impact.</span>
          </h3>

          <p>
            Modern tools for modern creators & professionals.
          </p>

        </section>

      </main>


      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section
        className="featuresSection"
        id="features"
      >

        {/* SECTION HEADER */}

        <div className="featuresHeader">

          <div>
            <span className="sectionTag">
              ✦ BUILT FOR CONNECTION
            </span>

            <h3>
              Everything you need to
              <span> grow together.</span>
            </h3>
          </div>

          <p>
            Powerful social tools designed to turn
            meaningful connections into real opportunities.
          </p>

        </div>


        {/* FEATURE GRID */}

        <div className="featureGrid">

          {/* FEATURE 1 */}

          <article className="featureCard">

            <div className="featureTop">
              <div className="featureIcon">
                ✦
              </div>

              <span className="featureNumber">
                01
              </span>
            </div>

            <div className="featureContent">
              <h4>
                Infinite Connections
              </h4>

              <p>
                Expand your network and discover people
                who share your interests, goals, and vision.
              </p>
            </div>

            <span className="featureArrow">
              ↗
            </span>

          </article>


          {/* FEATURE IMAGE 1 */}

          <div className="featureImage">

            <img
              src={feature1}
              alt="ConnectSphere connections"
            />

            <div className="featureImageOverlay">

              <span>
                NETWORK
              </span>

              <strong>
                Connect beyond limits.
              </strong>

            </div>

          </div>


          {/* FEATURE 2 */}

          <article className="featureCard purple">

            <div className="featureTop">
              <div className="featureIcon">
                ◉
              </div>

              <span className="featureNumber">
                02
              </span>
            </div>

            <div className="featureContent">
              <h4>
                Unified Growth
              </h4>

              <p>
                Collaborate, communicate, and build
                meaningful relationships from one platform.
              </p>
            </div>

            <span className="featureArrow">
              ↗
            </span>

          </article>


          {/* FEATURE 3 */}

          <article className="featureCard">

            <div className="featureTop">
              <div className="featureIcon">
                ▣
              </div>

              <span className="featureNumber">
                03
              </span>
            </div>

            <div className="featureContent">
              <h4>
                Precision Analytics
              </h4>

              <p>
                Track engagement and understand your
                community with real-time insights.
              </p>
            </div>

            <span className="featureArrow">
              ↗
            </span>

          </article>


          {/* FEATURE IMAGE 2 */}

          <div className="featureImage">

            <img
              src={feature2}
              alt="ConnectSphere analytics"
            />

            <div className="featureImageOverlay">

              <span>
                INSIGHTS
              </span>

              <strong>
                Know your impact.
              </strong>

            </div>

          </div>


          {/* FEATURE 4 */}

          <article className="featureCard">

            <div className="featureTop">
              <div className="featureIcon">
                ↗
              </div>

              <span className="featureNumber">
                04
              </span>
            </div>

            <div className="featureContent">
              <h4>
                Exponential Growth
              </h4>

              <p>
                Turn conversations into opportunities
                and unlock your next level of growth.
              </p>
            </div>

            <span className="featureArrow">
              ↗
            </span>

          </article>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section
        className="ctaSection"
        id="cta"
      >

        <div className="ctaGlow ctaGlowOne" />
        <div className="ctaGlow ctaGlowTwo" />

        <div className="ctaContent">

          <span className="ctaBadge">
            ✦ START YOUR JOURNEY
          </span>

          <h2>
            Ready to scale
            <br />
            your <span>influence?</span>
          </h2>

          <p>
            Your next connection could become your
            next opportunity.
          </p>

          <button
            className="primaryBtn ctaButton"
            onClick={() => navigate("/signup")}
          >
            <span>Get Started Now</span>
            <span className="btnArrow">→</span>
          </button>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="landingFooter">

        <div className="footerBrand">

          <div className="footerLogo">
            <span className="logoMark">
              C
            </span>

            <span>
              Connect<span>Sphere</span>
            </span>
          </div>

          <p>
            Connect. Create. Grow.
          </p>

        </div>

        <div className="footerRight">
          © {new Date().getFullYear()} ConnectSphere
        </div>

      </footer>

    </div>
  );
}