import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UpdatePassword() {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect to login if user not logged in
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const res = await fetch("http://localhost:5050/api/auth/update-password", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}` // if you use JWT
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Password updated successfully!");
        navigate("/");
      } else {
        alert(data.message || "Password update failed!");
      }
    } catch (err) {
      console.error("Update password error:", err);
      alert("Network error, check backend!");
    } finally {
      setLoading(false);
      setForm({ oldPassword: "", newPassword: "" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-luxBg animate-fadeIn">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-luxSurface border border-luxBorder rounded-xl p-10 space-y-6 shadow-xl shadow-black/40"
      >
        <h2 className="text-2xl font-semibold text-luxHeading">Update Password</h2>

        <input
          type="password"
          placeholder="Old Password"
          required
          className="w-full bg-transparent border border-luxBorder p-3 rounded-md outline-none focus:border-luxAccent transition"
          value={form.oldPassword}
          onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
        />

        <input
          type="password"
          placeholder="New Password"
          required
          className="w-full bg-transparent border border-luxBorder p-3 rounded-md outline-none focus:border-luxAccent transition"
          value={form.newPassword}
          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md font-medium transition ${
            loading
              ? "bg-luxAccent/50 cursor-not-allowed text-luxBg"
              : "bg-luxAccent text-luxBg hover:bg-luxAccentHover"
          }`}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
