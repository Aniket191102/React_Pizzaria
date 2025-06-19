import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add authentication logic here
    try {
      const res = await axios.get('http://localhost:3000/users');
      const user = res.data.find(
        (a) => a.email === email && a.password === password
      );

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = '/'; // forces full reload (Navbar will re-check localStorage)
      } else {
        console.error('Invalid email or password.');
      }
    } catch (err) {
      console.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p className="register-link">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
