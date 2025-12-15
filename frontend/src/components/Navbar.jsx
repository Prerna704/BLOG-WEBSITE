import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

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

        <div className="flex gap-10 text-sm transition-all">
          <Link to="/" className={linkStyle("/")}>Home</Link>
          <Link to="/create" className={linkStyle("/create")}>Write</Link>
          <Link to="/login" className={linkStyle("/login")}>Login</Link>

          <Link
            to="/register"
            className="px-5 py-2 rounded-lg bg-luxAccent text-luxBg font-medium hover:bg-luxAccentHover transition shadow-lg shadow-emerald-500/20"
          >
            Sign up
          </Link>
        </div>

      </div>
    </nav>
  );
}
