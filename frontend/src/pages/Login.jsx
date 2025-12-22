import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    // 🔐 EMAIL VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allowedDomains = ["gmail.com", "outlook.com", "yahoo.com"];

    const emailDomain = form.email.split("@")[1];

    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!allowedDomains.includes(emailDomain)) {
      setError("Please use a valid email provider (gmail, outlook, yahoo)");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5050/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      } else {
        setError(data.message || "Login failed. Check credentials!");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error! Is your backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-luxBg animate-fadeIn">

      {/* LEFT */}
      <div className="hidden md:flex flex-col justify-center px-20">
        <h1 className="text-5xl font-bold text-luxHeading leading-tight">
          Welcome back.
        </h1>
        <p className="mt-4 text-luxMuted text-lg max-w-md">
          Continue where you left off. Your words are waiting.
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center">
        <form
          onSubmit={submit}
          autoComplete="off"
          className="w-full max-w-md bg-luxSurface border border-luxBorder rounded-xl p-10 space-y-6 shadow-xl shadow-black/40"
        >
          <h2 className="text-2xl font-semibold text-luxHeading">
            Log in
          </h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
            required
            value={form.email}
            className="w-full bg-transparent border border-luxBorder p-3 rounded-md outline-none focus:border-luxAccent transition"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            required
            value={form.password}
            className="w-full bg-transparent border border-luxBorder p-3 rounded-md outline-none focus:border-luxAccent transition"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* ERROR MESSAGE */}
          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md font-medium transition ${
              loading
                ? "bg-luxAccent/50 cursor-not-allowed text-luxBg"
                : "bg-luxAccent text-luxBg hover:bg-luxAccentHover"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
