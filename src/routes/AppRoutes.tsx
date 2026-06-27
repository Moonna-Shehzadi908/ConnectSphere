import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import HomeFeed from "../pages/HomeFeed";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import MessagesPage from "../pages/MessagesPage";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomeFeed />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/messages" element={<MessagesPage />} />
    </Routes>
  );
}