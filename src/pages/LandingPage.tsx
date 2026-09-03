import { useState } from "react";
import "./LandingPage.css";

import heroImage from "../assets/landingpage.webp";
import feature1 from "../assets/emplyee.webp";
import feature2 from "../assets/mbl.webp";
import feature3 from "../assets/comunation.jpg";
import feature4 from "../assets//collabation.jpg";

import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn = () => {
    return !!localStorage.getItem("user");
  };

  const requireLogin = (path: string) => {
    if (!isLoggedIn()) {
      alert("Please sign in to continue.");
      navigate("/signin");
      return;
    }

    navigate(path);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setMenuOpen(false);
  };

  const goHome = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setMenuOpen(false);
  };

  const openFeature = (path: string) => {
    requireLogin(path);
  };

  return (
    <div className="page">

      {/* ================= TOP HEADER ================= */}
      <header className="topHeader">
        <div className="topHeaderInner">

          <button
            className="menuButton"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className="brand">
            <span className="brandDot"></span>

            <div>
              <strong>ConnectSphere</strong>
              <small>Social Hub</small>
            </div>
          </div>

          <button
            className="headerSignIn"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>
        </div>

        {/* ================= MENU ================= */}
        {menuOpen && (
          <div className="menuDropdown">

            <button onClick={goHome}>
              Home
            </button>

            <button onClick={() => scrollToSection("features")}>
              Features
            </button>

            <button onClick={() => requireLogin("/home")}>
              Community
            </button>

            <button onClick={() => scrollToSection("about")}>
              About
            </button>

            <button onClick={() => navigate("/signin")}>
              Sign In
            </button>

          </div>
        )}
      </header>


      {/* ================= MAIN CARD ================= */}
      <main className="card">

        {/* ================= NAVBAR ================= */}
        <nav className="navbar">

          <button
            className="navLogo"
            onClick={goHome}
          >
            <span className="navLogoIcon">✦</span>
            <span>ConnectSphere</span>
          </button>

          <div className="navLinks">

            <button onClick={goHome}>
              Home
            </button>

            <button onClick={() => scrollToSection("features")}>
              Features
            </button>

            <button onClick={() => requireLogin("/home")}>
              Community
            </button>

            <button onClick={() => scrollToSection("about")}>
              About
            </button>

          </div>

          <div className="navActions">

            <button
              className="navIconButton"
              onClick={() => requireLogin("/search")}
              aria-label="Search"
            >
              ⌕
            </button>

            <button
              className="navIconButton"
              onClick={() => requireLogin("/notifications")}
              aria-label="Notifications"
            >
              ♡
            </button>

            <button
              className="navIconButton"
              onClick={() => requireLogin("/messages")}
              aria-label="Messages"
            >
              ◌
            </button>

            <button
              className="profileButton"
              onClick={() => requireLogin("/profile")}
              aria-label="Profile"
            >
              <span>MS</span>
            </button>

          </div>
        </nav>


        {/* ================= HERO ================= */}
        <section className="hero">

          <div className="heroContent">

            <div className="heroBadge">
              <span className="badgeDot"></span>
              CONNECT. CREATE. GROW.
            </div>

            <h1>
              Where Creative
              <span>Minds Collide.</span>
            </h1>

            <p>
              Connect with ambitious people, discover meaningful
              communities, share ideas, and build relationships
              that turn conversations into opportunities.
            </p>

            <div className="heroButtons">

              <button
                className="primaryButton"
                onClick={() => navigate("/home")}
              >
                Join The Network
                <span>↗</span>
              </button>

              <button
                className="secondaryButton"
                onClick={() => navigate("/home")}
              >
                Explore Communities
                <span>→</span>
              </button>

            </div>

            <div className="trustSection">

              <div className="trustAvatars">
                <span>A</span>
                <span>M</span>
                <span>S</span>
                <span>+</span>
              </div>

              <div className="trustText">
                <strong>10K+</strong>
                <span>People already connecting</span>
              </div>

            </div>

          </div>


          {/* HERO IMAGE */}
          <div className="heroVisual">

            <div className="heroImageGlow"></div>

            <div className="heroImageWrap">
              <img
                src={heroImage}
                alt="ConnectSphere community"
              />
            </div>

            <div className="floatingCard floatingCardOne">
              <span className="floatingIcon">✦</span>

              <div>
                <strong>New Connection</strong>
                <small>Just now</small>
              </div>
            </div>

            <div className="floatingCard floatingCardTwo">
              <strong>+28%</strong>
              <small>Community Growth</small>
            </div>

          </div>

        </section>


        {/* ================= FEATURES ================= */}
        <section
          className="featuresSection"
          id="features"
        >

          <div className="sectionHeading">

            <div>
              <span className="sectionEyebrow">
                WHY CONNECTSPHERE
              </span>

              <h2>
                Everything you need
                <span>to grow together.</span>
              </h2>
            </div>

            <p>
              One connected space for discovering people,
              communicating ideas, collaborating on projects,
              and turning relationships into real opportunities.
            </p>

          </div>


          {/* ================= FEATURE GRID ================= */}
          <div className="featureGrid">


            {/* FEATURE 01 */}
            <article
              className="featureCard featureCardImage"
              onClick={() => openFeature("/connections")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  openFeature("/connections");
                }
              }}
            >

              <div className="featureCardImageWrap">

                <img
                  src={feature1}
                  alt="People building professional connections"
                />

                <div className="featureCardImageOverlay"></div>

                <span className="featureImageLabel">
                  NETWORK
                </span>

              </div>


              <div className="featureCardBody">

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
                    Discover professionals, creators, students,
                    and communities that match your interests,
                    skills, goals, and ambitions. Build a network
                    that creates real value.
                  </p>

                </div>

              </div>

              <span className="featureArrow">
                ↗
              </span>

            </article>


            {/* FEATURE 02 */}
            <article
              className="featureCard featureCardImage"
              onClick={() => openFeature("/growth")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  openFeature("/growth");
                }
              }}
            >

              <div className="featureCardImageWrap">

                <img
                  src={feature2}
                  alt="Professional growth and networking"
                />

                <div className="featureCardImageOverlay"></div>

                <span className="featureImageLabel">
                  GROWTH
                </span>

              </div>


              <div className="featureCardBody">

                <div className="featureTop">

                  <div className="featureIcon">
                    ↗
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
                    Bring conversations, communities,
                    professional relationships, and personal
                    development together in one ecosystem
                    designed around meaningful growth.
                  </p>

                </div>

              </div>

              <span className="featureArrow">
                ↗
              </span>

            </article>


            {/* FEATURE 03 */}
            <article
              className="featureCard featureCardImage"
              onClick={() => openFeature("/communication")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  openFeature("/communication");
                }
              }}
            >

              <div className="featureCardImageWrap">

                <img
                  src={feature3}
                  alt="People communicating and sharing ideas"
                />

                <div className="featureCardImageOverlay"></div>

                <span className="featureImageLabel">
                  COMMUNICATION
                </span>

              </div>


              <div className="featureCardBody">

                <div className="featureTop">

                  <div className="featureIcon">
                    ◌
                  </div>

                  <span className="featureNumber">
                    03
                  </span>

                </div>

                <div className="featureContent">

                  <h4>
                    Smart Communication
                  </h4>

                  <p>
                    Stay connected through meaningful
                    conversations, direct messages, and
                    community discussions. Share ideas,
                    exchange knowledge, and keep every
                    important conversation in one place.
                  </p>

                </div>

              </div>

              <span className="featureArrow">
                ↗
              </span>

            </article>


            {/* FEATURE 04 */}
            <article
              className="featureCard featureCardImage"
              onClick={() => openFeature("/collaboration")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  openFeature("/collaboration");
                }
              }}
            >

              <div className="featureCardImageWrap">

                <img
                  src={feature4}
                  alt="People collaborating on projects"
                />

                <div className="featureCardImageOverlay"></div>

                <span className="featureImageLabel">
                  COLLABORATION
                </span>

              </div>


              <div className="featureCardBody">

                <div className="featureTop">

                  <div className="featureIcon">
                    ⊕
                  </div>

                  <span className="featureNumber">
                    04
                  </span>

                </div>

                <div className="featureContent">

                  <h4>
                    Powerful Collaboration
                  </h4>

                  <p>
                    Turn ideas into action by working with
                    people who share your vision. Find the
                    right teammates, exchange skills, build
                    projects, and create something bigger
                    together.
                  </p>

                </div>

              </div>

              <span className="featureArrow">
                ↗
              </span>

            </article>

          </div>

        </section>


        {/* ================= ABOUT ================= */}
        <section
          className="aboutSection"
          id="about"
        >

          <div className="aboutContent">

            <span className="sectionEyebrow">
              BUILT FOR PEOPLE
            </span>

            <h2>
              Designed for
              <span>Impact.</span>
            </h2>

            <p>
              ConnectSphere is more than another social platform.
              It is a space where people can discover meaningful
              connections, exchange knowledge, collaborate on
              ideas, and create opportunities together.
            </p>

          </div>

          <div className="aboutStats">

            <div>
              <strong>10K+</strong>
              <span>Members</span>
            </div>

            <div>
              <strong>500+</strong>
              <span>Communities</span>
            </div>

            <div>
              <strong>1M+</strong>
              <span>Connections</span>
            </div>

          </div>

        </section>


        {/* ================= CTA ================= */}
        <section className="ctaSection">

          <div className="ctaContent">

            <span className="sectionEyebrow">
              YOUR NEXT CONNECTION IS HERE
            </span>

            <h2>
              Ready to build
              <span>something meaningful?</span>
            </h2>

            <p>
              Join ConnectSphere and start connecting with
              people who can help turn your ideas into reality.
            </p>

            <button
              className="primaryButton"
              onClick={() => navigate("/signup")}
            >
              Start Connecting
              <span>↗</span>
            </button>

          </div>

        </section>


        {/* ================= FOOTER ================= */}
        <footer className="footer">

          <div className="footerBrand">

            <button
              className="navLogo"
              onClick={goHome}
            >
              <span className="navLogoIcon">
                ✦
              </span>

              <span>
                ConnectSphere
              </span>
            </button>

            <p>
              Connect. Create. Grow.
            </p>

          </div>


          <div className="footerLinks">

            <button onClick={goHome}>
              Home
            </button>

            <button onClick={() => scrollToSection("features")}>
              Features
            </button>

            <button onClick={() => scrollToSection("about")}>
              About
            </button>

            <button onClick={() => navigate("/signin")}>
              Sign In
            </button>

          </div>


          <div className="footerBottom">
            <span>
              © 2026 ConnectSphere. All rights reserved.
            </span>

            <span>
              Made for meaningful connections.
            </span>
          </div>

        </footer>

      </main>

    </div>
  );
};

export default LandingPage;