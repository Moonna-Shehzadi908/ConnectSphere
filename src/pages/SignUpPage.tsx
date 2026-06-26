import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createAccount = () => {
    if (!username || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const existingUser = localStorage.getItem("signupUser");

    if (existingUser) {
      const parsed = JSON.parse(existingUser);

      if (parsed.email === email) {
        alert("Email already registered");
        return;
      }
    }

    localStorage.setItem(
      "signupUser",
      JSON.stringify({
        username,
        email,
        password,
      })
    );

    alert("Account created successfully!");
    navigate("/signin");
  };

  return (
    <div className="authPage">
      <div className="authCard">
        <h1>ConnectSphere</h1>
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={createAccount}>
          Create Account →
        </button>

        <p className="bottomText">
          Already have account?{" "}
          <span onClick={() => navigate("/signin")}>
            Sign In
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