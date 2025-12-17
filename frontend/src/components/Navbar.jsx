import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Get user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const linkStyle = (path) =>
    pathname === path
      ? "text-luxAccent"
      : "text-luxMuted hover:text-luxHeading";

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-luxBg/80 border-b border-luxBorder">
      <div className="max-w-7xl mx-auto px-10 py-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide text-luxHeading">
          Medium<span className="text-luxAccent">Lite</span>
        </h1>

        <div className="flex gap-10 text-sm transition-all items-center relative">
          <Link to="/" className={linkStyle("/")}>Home</Link>
          <Link to="/create" className={linkStyle("/create")}>Write</Link>

          {/* Show Login & Sign Up only if not logged in */}
          {!user && (
            <>
              <Link to="/login" className={linkStyle("/login")}>Login</Link>
              <Link
                to="/register"
                className="px-5 py-2 rounded-lg bg-luxAccent text-luxBg font-medium hover:bg-luxAccentHover transition shadow-lg shadow-emerald-500/20"
              >
                Sign Up
              </Link>
            </>
          )}

          {/* Show Profile button if logged in */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="px-4 py-2 rounded-lg bg-luxAccent text-luxBg font-medium hover:bg-luxAccentHover transition"
              >
                {user.name}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-luxSurface border border-luxBorder rounded-lg shadow-lg p-3 flex flex-col gap-2 z-50">
                  <span className="text-sm text-luxHeading font-semibold">{user.name}</span>
                  <span className="text-xs text-luxMuted">{user.email}</span>

                  <Link
                    to="/update-password"
                    className="text-sm text-luxAccent hover:underline"
                  >
                    Update Password
                  </Link>

                  <Link
                    to="/profile"
                    className="text-sm text-luxAccent hover:underline"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={logout}
                    className="text-sm text-red-500 hover:underline mt-2 text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
