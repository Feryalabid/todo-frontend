import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Todo from './pages/Todo';
import { FaBook } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // add loading state

  useEffect(() => {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false); // finish loading after checking localStorage
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    alert('You have been logged out');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f2027] text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white font-sans">
        <header className="flex items-center justify-between px-6 py-4 bg-[#112b3c] shadow-lg">
          <div className="flex items-center gap-2 text-cyan-300 text-2xl font-bold">
            <FaBook />
            <span>ToDo List App</span>
          </div>
          <nav className="flex gap-6 items-center text-lg">
            {user ? (
              <>
                <Link to="/" className="hover:text-cyan-400 transition">Home</Link>
                <Link to="/todo" className="hover:text-cyan-400 transition">ToDo</Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-cyan-600 px-3 py-1.5 rounded hover:bg-cyan-700 transition text-white"
                >
                  <IoIosLogOut className="text-xl" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/signup" className="hover:text-cyan-400 transition">Signup</Link>
                <Link to="/login" className="hover:text-cyan-400 transition">Login</Link>
              </>
            )}
          </nav>
        </header>

        <main className="p-6">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/todo" element={user ? <Todo /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;