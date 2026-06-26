import "./LandingPage.css";
import heroImage from "../assets/landingpage.webp";
import feature1 from "../assets/company.webp";
import feature2 from "../assets/mbl.webp";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
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
            <button
              className="navBtn"
              onClick={() => navigate("/home")}
            >
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

        {/* HERO TEXT */}
        <div className="heroText">
          <h2>
            Where Creative Minds
            <br />
            Collide and Grow.
          </h2>

          <p>
            ConnectSphere is a next-generation social ecosystem
            for creators, leaders, and innovators. Build meaningful
            connections and scale your impact.
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

        {/* HERO IMAGE */}
        <div className="imageBox">
          <img src={heroImage} alt="ConnectSphere Hero" />

          <div className="floatingCard">
            <strong>⚡ Live Connection</strong>
            <p>2.6k users are active right now</p>
          </div>
        </div>

        {/* IMPACT */}
        <div className="bottom">
          <h3>Designed for Impact</h3>
          <p>
            Modern tools for modern creators &
            professionals
          </p>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="featuresSection">
        <div className="featureCard">
          <div className="featureIcon">✦</div>
          <h4>Infinite Connections</h4>
          <p>
            Expand your network through communities,
            events and meaningful interactions.
          </p>
        </div>

        <div className="featureImage">
          <img src={feature1} alt="Connections" />
        </div>

        <div className="featureCard purple">
          <div className="featureIcon">✦</div>
          <h4>Unified Growth</h4>
          <p>
            Collaborate with creators, professionals
            and businesses on one powerful platform.
          </p>
        </div>

        <div className="featureCard">
          <div className="featureIcon">▣</div>
          <h4>Precision Analytics</h4>
          <p>
            Monitor engagement, audience insights
            and performance in real time.
          </p>
        </div>

        <div className="featureImage">
          <img src={feature2} alt="Analytics" />
        </div>

        <div className="featureCard">
          <div className="featureIcon">↗</div>
          <h4>Exponential Growth</h4>
          <p>
            Build influence and unlock opportunities
            through smart networking tools.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <h2>Trusted by Visionaries</h2>

        <div className="testimonialGrid">
          <div className="testimonial">
            <div className="stars">★★★★★</div>
            <p>
              ConnectSphere transformed how our team
              collaborates and discovers opportunities.
            </p>
            <h5>Sarah Ahmed</h5>
            <span>Marketing Director</span>
          </div>

          <div className="testimonial">
            <div className="stars">★★★★★</div>
            <p>
              A clean and modern platform that helped
              us build meaningful relationships.
            </p>
            <h5>Kamran Khan</h5>
            <span>Startup Founder</span>
          </div>

          <div className="testimonial">
            <div className="stars">★★★★★</div>
            <p>
              The best networking experience we've
              used for our startup community.
            </p>
            <h5>Hina Malik</h5>
            <span>Product Manager</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ctaSection">
        <h2>Ready to scale your influence?</h2>

        <p>
          Join thousands of creators and professionals
          already growing with ConnectSphere.
        </p>

        <button className="primaryBtn">
          Get Started Now
        </button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footerCol">
          <h3>ConnectSphere</h3>
          <p>
            Empowering creators and professionals
            through meaningful digital connections.
          </p>
        </div>

        <div className="footerCol">
          <h4>Platform</h4>
          <a href="#">Features</a>
          <a href="#">Communities</a>
          <a href="#">Analytics</a>
          <a href="#">AI Tools</a>
        </div>

        <div className="footerCol">
          <h4>Company</h4>
          <a href="#">About</a>
          <a href="#">Careers</a>
          <a href="#">Contact</a>
          <a href="#">Support</a>
        </div>

        <div className="footerCol">
          <h4>Legal</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookies</a>
        </div>
      </footer>
    </div>
  );
}