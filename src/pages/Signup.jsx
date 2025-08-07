// frontend/pages/Signup.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

function Signup({ setUser }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        navigate("/");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0d1b2a] via-[#1b263b] to-[#415a77]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#112d3a] bg-opacity-90 backdrop-blur-md text-white rounded-2xl p-15 w-[26rem] shadow-2xl space-y-6"
      >
        <h2 className="text-3xl font-semibold text-center text-white mb-8">
          Sign Up
        </h2>

        <div className="flex items-center bg-[#1e4b5a] bg-opacity-30 rounded px-4 py-3">
          <FaUser className="text-white mr-2" />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="bg-transparent w-full text-white placeholder-white outline-none"
            required
          />
        </div>

        <div className="flex items-center bg-[#1e4b5a] bg-opacity-30 rounded px-4 py-3">
          <FaUser className="text-white mr-2" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="bg-transparent w-full text-white placeholder-white outline-none"
            required
          />
        </div>

        <div className="flex items-center bg-[#1e4b5a] bg-opacity-30 rounded px-4 py-3">
          <FaLock className="text-white mr-2" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="bg-transparent w-full text-white placeholder-white outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#1d3557] to-[#457b9d] py-2 rounded hover:opacity-80 transition font-semibold"
        >
          SIGN UP
        </button>
      </form>
    </div>
  );
}

export default Signup;
