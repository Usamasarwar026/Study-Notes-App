// src/Layout.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Layout.css';

function Layout({ children, user, onLogout }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = () => {
    onLogout(); // Call the passed logout function
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="layout">
      <header className="header" role="banner">
        <h1>Note Taking App</h1>
        <button className="nav-toggle" aria-label="Toggle navigation" onClick={toggleNav}>
          &#9776;
        </button>
        <nav className={`nav ${isNavOpen ? 'open' : ''}`} role="navigation">
          {user && <Link to="/">Home</Link>} {/* Show Home link only if user is logged in */}
          <Link to="/about">About</Link>
          <Link to="/register" className="nav-button">Sign Up</Link>
          {user ? (
            <Link onClick={handleLogout} className="nav-button">Logout</Link>
          ) : (
            <Link to="/login" className="nav-button">Login</Link>
          )}
        </nav>
      </header>
      <main className="main-content" role="main">
        {children}
      </main>
      <footer className="footer" role="contentinfo">
        <p>&copy; 2024 Collaborative Note-Taking App</p>
      </footer>
    </div>
  );
}

export default Layout;
