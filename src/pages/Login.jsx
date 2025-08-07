// frontend/pages/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';

function Login({ setUser }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        alert('Login Successful');
        navigate('/');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('Server error. Please try again later.');
    }
  };

  return (
   <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0d1b2a] via-[#1b263b] to-[#415a77]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#112d3a] bg-opacity-90 backdrop-blur-md text-white rounded-2xl p-20 w-[26rem] shadow-2xl space-y-6"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-1">Welcome Back</h2>
          <p className="text-sm text-gray-300">Login to your account</p>
        </div>

        <div className="flex items-center bg-[#1e4b5a] bg-opacity-30 rounded px-4 py-3">
          <FaUser className="text-white mr-3" />
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
          <FaLock className="text-white mr-3" />
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

        <div className="flex justify-between text-sm text-gray-300">
          <label>
            <input type="checkbox" className="mr-1" /> Remember me
          </label>
          <a href="#" className="hover:underline">Forgot Password?</a>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#234351] to-[#5492b1] text-white font-semibold py-2 rounded hover:opacity-80 transition"
        >
          LOGIN
        </button>
      </form>
    </div>
  );
}

export default Login;
