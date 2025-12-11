import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    alert(data.message || "Registered Successfully");
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={submitHandler}>
        <h2>Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={changeHandler}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={changeHandler}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={changeHandler}
          required
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}



