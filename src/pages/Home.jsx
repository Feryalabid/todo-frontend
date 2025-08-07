import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/bg.webp';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative z-10 bg-opacity-50 p-10 rounded-lg text-center shadow-xl">
        <h1 className="text-4xl font-extrabold mb-4 tracking-wide drop-shadow-bg-[#112d3a]">
          Welcome to Your Todo Dashboard
        </h1>
        <p className="mb-6 text-lg font-medium tracking-wide">
          You are successfully logged in. Start managing your tasks now!
        </p>
        <button
          onClick={() => navigate('/todo')}
          className="bg-blue-950 hover:bg-blue-900 text-white px-6 py-3 rounded-full text-lg font-semibold transition-all duration-200 shadow-lg"
        >
          Go to Todo
        </button>
      </div>
    </div>
  );
}

export default Home;
