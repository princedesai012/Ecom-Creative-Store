// src/components/SignUpPage.jsx

import React, { useState } from 'react'; // Import useState
import { Volume2, User, Mail, Lock, ShieldCheck, UserPlus } from 'lucide-react';
import './SignUpPage.css';

const SignUpPage = () => {
  // --- State Management for Sign Up Form ---
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

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
    // Front-end validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Prepare data for the backend, removing the confirmPassword field
    const dataToSend = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };
    
    // In a real app, you would send this dataToSend object to your backend API
    console.log('Sign-up data to be sent to backend:', dataToSend);
    alert('Check the console for the sign-up data!');
  };

  return (
    <div className="signup-page-container">
      <div className="signup-form-wrapper">
        <div className="signup-form-header">
          <a href="/" className="brand-logo">
            <Volume2 size={18} />
            <span>AudioTech</span>
          </a>
          <h1 className="signup-title">Create Your Account</h1>
          <p className="signup-subtitle">Join the AudioTech family and unlock a world of sound.</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <User className="input-icon" size={20} />
            <input
              type="text"
              placeholder="Full Name"
              name="name" // Matches the schema
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <Mail className="input-icon" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              name="email" // Matches the schema
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
              name="password" // Matches the schema
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <ShieldCheck className="input-icon" size={20} />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword" // For front-end validation only
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-options">
            <label className="terms-agreement">
              <input type="checkbox" required/>
              <span className="custom-checkbox"></span>
              <span>I agree to the <a href="/terms" target="_blank">Terms & Conditions</a></span>
            </label>
          </div>

          <button type="submit" className="btn-signup">
            <UserPlus size={18} />
            Create Account
          </button>
        </form>

        <p className="login-link">
          Already have an account? <a href="/login">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;