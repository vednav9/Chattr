import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import { axiosInstance } from "./lib/axios";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

function App() {
  const { authUser, checkAuth, isCheckedAuth } = useAuthStore();
  useEffect(
    () => {
      checkAuth();
    },
    { checkAuth }
  );
  console.log({ authUser });

  if (!isCheckedAuth && !authUser) {
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>;
  }
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : navigate("/login")} />
        <Route path="/signup" element={!authUser ? <SignUp /> : navigate("/")} />
        <Route path="/login" element={!authUser ? <Login /> : navigate("/")} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={authUser ? <Profile /> : navigate("/login")} />
      </Routes>
    </div>
  );
}

export default App;
