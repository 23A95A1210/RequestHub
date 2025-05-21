import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">RequestHub</Link>
      </div>
      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <Link to="/internship" className="nav-link">Internship</Link>
        <Link to="/leave" className="nav-link">Leave</Link>
        <Link to="/id" className="nav-link">ID</Link>
        <Link to="/hackathon" className="nav-link">Hackathon</Link>
        <Link to="/loginau" className="mobile-login-btn">Login</Link>
      </div>

      <div className="navbar-desktop-login">
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
      </div>

      <div className="navbar-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span className={`bar ${menuOpen ? "open" : ""}`} />
        <span className={`bar ${menuOpen ? "open" : ""}`} />
        <span className={`bar ${menuOpen ? "open" : ""}`} />
      </div>
    </nav>
  );
};

export default Navbar;