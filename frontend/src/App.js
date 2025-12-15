import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";

export default function App() {
  return (
    <BrowserRouter>
      {/* 🌿 GLOBAL THEME WRAPPER */}
      <div className="min-h-screen bg-luxBg text-luxText">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreateBlog />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
