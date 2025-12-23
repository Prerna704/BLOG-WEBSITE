import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";
import Profile from "./pages/Profile";
import UpdatePassword from "./pages/UpdatePassword";
import MyBlogs from "./pages/MyBlogs";
import EditBlog from "./pages/EditBlog";

/* 🔐 Protected Route Wrapper */
function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      {/* 🌿 GLOBAL THEME WRAPPER */}
      <div className="min-h-screen bg-luxBg text-luxText">
        <Navbar />

        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔐 PROTECTED ROUTES */}
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateBlog />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/update-password"
            element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Routes>
          {/* ...existing routes */}
          <Route
            path="/my-blogs"
            element={
              <ProtectedRoute>
                <MyBlogs />
              </ProtectedRoute>
            }
          />

           <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditBlog />
              </ProtectedRoute>
            }
          />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

