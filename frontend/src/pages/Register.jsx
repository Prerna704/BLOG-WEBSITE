import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
<<<<<<< HEAD
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

    // 🔐 STRONG PASSWORD VALIDATION
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }

    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // ✅ SAFE DOMAIN CHECK (FIX)
    const emailDomain = form.email.split("@")[1];
    if (!emailDomain || !allowedDomains.includes(emailDomain)) {
      setError("Please use a valid email provider (gmail, outlook, yahoo)");
      return;
    }

    if (!passwordRegex.test(form.password)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
      );
      return;
    }

    try {
      const res = await fetch("http://localhost:5050/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        
        navigate("/login");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Register error:", err);
      setError("Network error! Is your backend running?");
    }
=======
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5050/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("Account created ✨");
>>>>>>> c092f4b (✨ Major UI redesign: elegant dark theme, Tailwind, animations)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-luxBg animate-fadeIn">
<<<<<<< HEAD
      <div className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 bg-luxSurface border border-luxBorder rounded-2xl overflow-hidden shadow-2xl">

        {/* LEFT: FORM */}
        <form onSubmit={submit} autoComplete="off" className="p-12 space-y-6">
=======
      
      <div className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 
                      bg-luxSurface border border-luxBorder rounded-2xl overflow-hidden shadow-2xl">

        {/* LEFT: FORM */}
        <form
          onSubmit={submit}
          className="p-12 space-y-6"
        >
>>>>>>> c092f4b (✨ Major UI redesign: elegant dark theme, Tailwind, animations)
          <h2 className="text-3xl font-bold text-luxHeading">
            Create your account
          </h2>

          <p className="text-luxMuted text-sm">
            Start writing with intention.
          </p>

          <input
            type="text"
<<<<<<< HEAD
            name="name"
            placeholder="Full name"
            autoComplete="off"
            required
            className="w-full bg-transparent border border-luxBorder p-3 rounded-md outline-none focus:border-luxAccent transition"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
=======
            placeholder="Full name"
            required
            className="w-full bg-transparent border border-luxBorder 
                       p-3 rounded-md outline-none 
                       focus:border-luxAccent transition"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
>>>>>>> c092f4b (✨ Major UI redesign: elegant dark theme, Tailwind, animations)
          />

          <input
            type="email"
<<<<<<< HEAD
            name="email"
            placeholder="Email"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
            required
            className="w-full bg-transparent border border-luxBorder p-3 rounded-md outline-none focus:border-luxAccent transition"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
=======
            placeholder="Email"
            required
            className="w-full bg-transparent border border-luxBorder 
                       p-3 rounded-md outline-none 
                       focus:border-luxAccent transition"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
>>>>>>> c092f4b (✨ Major UI redesign: elegant dark theme, Tailwind, animations)
          />

          <input
            type="password"
<<<<<<< HEAD
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            required
            className="w-full bg-transparent border border-luxBorder p-3 rounded-md outline-none focus:border-luxAccent transition"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-luxAccent text-luxBg rounded-md font-medium hover:bg-luxAccentHover transition"
=======
            placeholder="Password"
            required
            className="w-full bg-transparent border border-luxBorder 
                       p-3 rounded-md outline-none 
                       focus:border-luxAccent transition"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            type="submit"
            className="w-full py-3 bg-luxAccent text-luxBg 
                       rounded-md font-medium 
                       hover:bg-luxAccentHover transition"
>>>>>>> c092f4b (✨ Major UI redesign: elegant dark theme, Tailwind, animations)
          >
            Sign Up
          </button>
        </form>

<<<<<<< HEAD
        {/* RIGHT */}
        <div className="hidden md:flex flex-col justify-center px-12 bg-gradient-to-br from-luxBg to-luxSurface">
          <h3 className="text-4xl font-bold text-luxHeading leading-tight">
            Your ideas
=======
        {/* RIGHT: VISUAL / TEXT */}
        <div className="hidden md:flex flex-col justify-center px-12 
                        bg-gradient-to-br from-luxBg to-luxSurface">
          <h3 className="text-4xl font-bold text-luxHeading leading-tight">
            Your ideas  
>>>>>>> c092f4b (✨ Major UI redesign: elegant dark theme, Tailwind, animations)
            <span className="block text-luxAccent">deserve space.</span>
          </h3>

          <p className="mt-4 text-luxMuted max-w-sm">
            Join a focused writing platform built for clarity, not noise.
          </p>
        </div>
<<<<<<< HEAD
=======

>>>>>>> c092f4b (✨ Major UI redesign: elegant dark theme, Tailwind, animations)
      </div>
    </div>
  );
}
