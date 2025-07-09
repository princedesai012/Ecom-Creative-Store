import React, { useState } from 'react';
import { Volume2, Mail, Lock, LogIn } from 'lucide-react';
import { login } from '../store/authslice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css';



const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData))
      .then((response) => {
        console.log('Login successful:', response);
        navigate('/');
      })
      .catch((error) => {
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
            
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
          
            <input
              type="password"
              placeholder="Password"
              name="password"
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

       <a href="/admin/login" className="btn-admin-login">
  Admin Login
</a>


        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign Up for free</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
