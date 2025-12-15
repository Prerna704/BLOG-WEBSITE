import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5050/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("Welcome back ✨");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-luxBg animate-fadeIn">

      {/* LEFT: TEXT */}
      <div className="hidden md:flex flex-col justify-center px-20">
        <h1 className="text-5xl font-bold text-luxHeading leading-tight">
          Welcome back.
        </h1>
        <p className="mt-4 text-luxMuted text-lg max-w-md">
          Continue where you left off.  
          Your words are waiting.
        </p>
      </div>

      {/* RIGHT: FORM */}
      <div className="flex items-center justify-center">
        <form
          onSubmit={submit}
          className="w-full max-w-md bg-luxSurface border border-luxBorder 
                     rounded-xl p-10 space-y-6 shadow-xl shadow-black/40"
        >
          <h2 className="text-2xl font-semibold text-luxHeading">
            Log in
          </h2>

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full bg-transparent border border-luxBorder 
                       p-3 rounded-md outline-none 
                       focus:border-luxAccent transition"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
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
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
