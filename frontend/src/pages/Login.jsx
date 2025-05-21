import React, { useState } from 'react'
import "../styles/Login.css"
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [showLogin, setShowLogin] = useState("");
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = () => {
      if (mail === 'gsivagangadhar367@gmail.com' && pass === 'Aq@12345') {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    };
  
    return (
      <div className="main-grid">
        <header className="grid-header">
          <h1>Welcome</h1>
        </header>
  
        <main className="grid-main">
          <div className="button-group">
            <button className="user-btn" onClick={() => setShowLogin("student")}>
              <span className="btn-text">Student</span>
              <span className="btn-arrow">→</span>
            </button>
            <button className="admin-btn" onClick={() => setShowLogin("admin")}>
              <span className="btn-text">Admin</span>
              <span className="btn-arrow">→</span>
            </button>
          </div>
  
          {showLogin && (
            <div className="login-box">
              <h2>{showLogin=="admin" ? 'Admin Login' : "Student Login"}</h2>
              <input
                type="email"
                placeholder="Enter email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                className="login-input"
              />
              <input
                type="password"
                placeholder="Enter password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="login-input"
              />
              <button onClick={handleLogin} className="login-btn">
                <span className="btn-text">Sign In</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          )}
        </main>
  
        <footer className="grid-footer">
          <p>© 2023 Your Brand. All rights reserved.</p>
        </footer>
      </div>
    );
}

export default Login