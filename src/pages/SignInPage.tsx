import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function SignInPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const savedUser = JSON.parse(
      localStorage.getItem("signupUser") || "{}"
    );

    if (!savedUser.email) {
      alert("No account found. Please Sign Up first.");
      return;
    }

    if (
      email === savedUser.email &&
      password === savedUser.password
    ) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: savedUser.email,
          username: savedUser.username,
        })
      );

      alert("Login successful!");
      navigate("/home");
    } else {
      alert("Invalid email or password");
    }
  };

  const googleLogin = () => {
    alert("Google Sign In will be connected later with backend");
  };

  const appleLogin = () => {
    alert("Apple Sign In coming soon");
  };

  return (
    <div className="authPage">
     <div className="authCard">
  

  <h1>ConnectSphere</h1>

        <p>Enter your email and password</p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>Sign In →</button>

        <div className="divider">
          <span>Or continue with</span>
        </div>

        <div className="socialBtns">
          <button onClick={googleLogin}>Google</button>
          <button onClick={appleLogin}>Apple</button>
        </div>

        <p className="bottomText">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")}>
            Create Account
          </span>
        </p>
        <button
    className="backBtn"
    onClick={() => navigate(-1)}
  >
    ← Back
  </button>
      </div>
    </div>
  );
}