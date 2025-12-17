// import { useState } from "react";

// export default function Register() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const submit = async (e) => {
//     e.preventDefault();
//     await fetch("http://localhost:5050/api/auth/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });
//     alert("Account created ✨");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-luxBg animate-fadeIn">
      
//       <div className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 
//                       bg-luxSurface border border-luxBorder rounded-2xl overflow-hidden shadow-2xl">

//         {/* LEFT: FORM */}
//         <form
//           onSubmit={submit}
//           className="p-12 space-y-6"
//         >
//           <h2 className="text-3xl font-bold text-luxHeading">
//             Create your account
//           </h2>

//           <p className="text-luxMuted text-sm">
//             Start writing with intention.
//           </p>

//           <input
//             type="text"
//             placeholder="Full name"
//             required
//             className="w-full bg-transparent border border-luxBorder 
//                        p-3 rounded-md outline-none 
//                        focus:border-luxAccent transition"
//             onChange={(e) =>
//               setForm({ ...form, name: e.target.value })
//             }
//           />

//           <input
//             type="email"
//             placeholder="Email"
//             required
//             className="w-full bg-transparent border border-luxBorder 
//                        p-3 rounded-md outline-none 
//                        focus:border-luxAccent transition"
//             onChange={(e) =>
//               setForm({ ...form, email: e.target.value })
//             }
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             required
//             className="w-full bg-transparent border border-luxBorder 
//                        p-3 rounded-md outline-none 
//                        focus:border-luxAccent transition"
//             onChange={(e) =>
//               setForm({ ...form, password: e.target.value })
//             }
//           />

//           <button
//             type="submit"
//             className="w-full py-3 bg-luxAccent text-luxBg 
//                        rounded-md font-medium 
//                        hover:bg-luxAccentHover transition"
//           >
//             Sign Up
//           </button>
//         </form>

//         {/* RIGHT: VISUAL / TEXT */}
//         <div className="hidden md:flex flex-col justify-center px-12 
//                         bg-gradient-to-br from-luxBg to-luxSurface">
//           <h3 className="text-4xl font-bold text-luxHeading leading-tight">
//             Your ideas  
//             <span className="block text-luxAccent">deserve space.</span>
//           </h3>

//           <p className="mt-4 text-luxMuted max-w-sm">
//             Join a focused writing platform built for clarity, not noise.
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5050/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      alert("Account created ✨");
      navigate("/");
    } else {
      alert(data.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-luxBg animate-fadeIn">
      <div className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 bg-luxSurface border border-luxBorder rounded-2xl overflow-hidden shadow-2xl">
        {/* LEFT: FORM */}
        <form onSubmit={submit} className="p-12 space-y-6">
          <h2 className="text-3xl font-bold text-luxHeading">Create your account</h2>
          <p className="text-luxMuted text-sm">Start writing with intention.</p>

          <input
            type="text"
            placeholder="Full name"
            required
            className="w-full bg-transparent border border-luxBorder p-3 rounded-md outline-none focus:border-luxAccent transition"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full bg-transparent border border-luxBorder p-3 rounded-md outline-none focus:border-luxAccent transition"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full bg-transparent border border-luxBorder p-3 rounded-md outline-none focus:border-luxAccent transition"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            type="submit"
            className="w-full py-3 bg-luxAccent text-luxBg rounded-md font-medium hover:bg-luxAccentHover transition"
          >
            Sign Up
          </button>
        </form>

        {/* RIGHT: VISUAL / TEXT */}
        <div className="hidden md:flex flex-col justify-center px-12 bg-gradient-to-br from-luxBg to-luxSurface">
          <h3 className="text-4xl font-bold text-luxHeading leading-tight">
            Your ideas  
            <span className="block text-luxAccent">deserve space.</span>
          </h3>

          <p className="mt-4 text-luxMuted max-w-sm">
            Join a focused writing platform built for clarity, not noise.
          </p>
        </div>
      </div>
    </div>
  );
}
