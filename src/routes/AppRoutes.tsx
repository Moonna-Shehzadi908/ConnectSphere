import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import HomeFeed from "../pages/HomeFeed";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomeFeed />} />
    </Routes>
  );
}