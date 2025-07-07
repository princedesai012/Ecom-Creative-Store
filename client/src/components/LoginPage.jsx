// src/components/LoginPage.jsx

import React, { useState } from 'react'; // Import useState
import { Volume2, Mail, Lock, LogIn } from 'lucide-react';
import { login } from '../store/authslice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25C22.56 11.42 22.49 10.62 22.36 9.84H12.27V14.4H18.16C17.86 16.09 17.07 17.54 15.64 18.49V21.6H19.48C21.45 19.82 22.56 17.25 22.56 14.25V12.25Z" fill="#4285F4"/>
      <path d="M12.27 23C15.22 23 17.73 22.03 19.48 20.6H15.64V17.49C14.68 18.09 13.57 18.42 12.27 18.42C9.51 18.42 7.15 16.63 6.25 14.07H2.3V17.26C4.05 20.68 7.84 23 12.27 23Z" fill="#34A853"/>
      <path d="M6.25 14.07C6.02 13.43 5.88 12.75 5.88 12C5.88 11.25 6.02 10.57 6.25 9.93V6.74H2.3C1.52 8.28 1 10.06 1 12C1 13.94 1.52 15.72 2.3 17.26L6.25 14.07Z" fill="#FBBC05"/>
      <path d="M12.27 5.58C13.72 5.58 15.03 6.08 16.04 7.03L19.55 3.55C17.73 1.83 15.22 0.999999 12.27 0.999999C7.84 0.999999 4.05 3.32 2.3 6.74L6.25 9.93C7.15 7.37 9.51 5.58 12.27 5.58Z" fill="#EA4335"/>
    </svg>
);
   

const LoginPage = () => {
  // --- State Management for Login Form ---
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
 const dispatch = useDispatch();
    const navigate = useNavigate();
  // --- Handle input changes ---
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // --- Handle form submission ---
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the login action with form data
    dispatch(login(formData))
      .then((response) => {
        // Handle successful login
        console.log('Login successful:', response);
        navigate('/'); // Redirect to home page or dashboard
      })
      .catch((error) => {
        // Handle login error
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials.');
      });


  };

  return (
    <div className="login-page-container">
      <div className="login-form-wrapper">
        <div className="login-form-header">
          <a href="/" className="brand-logo">
            <Volume2 size={18} />
            <span>ZepCart</span>
          </a>
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Enter your credentials to access your account.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <Mail className="input-icon" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              name="email" // name attribute is crucial
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input
              type="password"
              placeholder="Password"
              name="password" // name attribute is crucial
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span className="custom-checkbox"></span>
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-password-link">Forgot Password?</a>
          </div>

          <button type="submit" className="btn-login">
            <LogIn size={18} />
            Sign In
          </button>
        </form>

        <div className="separator">
            <span>OR CONTINUE WITH</span>
        </div>
        
      

        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign Up for free</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;