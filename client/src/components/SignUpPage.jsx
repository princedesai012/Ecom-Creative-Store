// src/components/SignUpPage.jsx

import React, { useState } from 'react';
import { Volume2, User, Mail, Lock, ShieldCheck, UserPlus, KeyRound } from 'lucide-react';
import './SignUpPage.css'; // This will be the new, themed CSS file

const SignUpPage = () => {
  // State to manage which step of the form is active
  const [step, setStep] = useState('details'); 

  // State to hold all form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // State for the OTP input
  const [otp, setOtp] = useState('');

  // Dummy handlers for UI demonstration
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleOtpChange = (e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6));

  const handleGetOtp = (e) => {
    e.preventDefault();
    alert("Simulating OTP request...");
    setStep('verify-otp'); 
  };

  const handleVerifyAndSignUp = (e) => {
    e.preventDefault();
    alert('Account created successfully! (Simulated)');
  };

  return (
    <div className="signup-page-container">
      <div className="signup-form-wrapper">
        
        {/* --- Step 1: Create Your Account --- */}
        {step === 'details' && (
          <div className="form-content-wrapper">
            <a href="/" className="brand-logo centered">
              <Volume2 size={18} />
              <span>ZepCart</span>
            </a>
            <div className="form-header">
              <h1 className="form-title">Create Your Account</h1>
              <p className="form-subtitle">Join us and unlock a world of sound.</p>
            </div>
            
            <form className="details-form" onSubmit={handleGetOtp}>
              <div className="input-group">
                <User className="input-icon" size={20} />
                <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <Mail className="input-icon" size={20} />
                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <Lock className="input-icon" size={20} />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
              </div>
              
              {/* This footer now contains the full-width button */}
              <div className="details-footer">
                <button type="submit" className="btn-primary-action">
                  <UserPlus size={18} />
                  <span>Continue & Get OTP</span>
                </button>
              </div>
            </form>
            <p className="footer-link">
              Already have an account? <a href="/login">Sign In</a>
            </p>
          </div>
        )}

        {/* --- Step 2: OTP Verification Form --- */}
        {step === 'verify-otp' && (
          <div className="form-content-wrapper">
            <a href="/" className="brand-logo top-left">
              <Volume2 size={20} />
              <span>ZepCart</span>
            </a>
            <div className="form-header left-aligned">
              <h1 className="form-title">Verify Your Email</h1>
              <p className="form-subtitle">
                An OTP has been sent to {formData.email || 'your email'}.
                <br />
                Please enter it below.
              </p>
            </div>

            <form className="otp-form" onSubmit={handleVerifyAndSignUp}>
              <div className="input-group">
                <KeyRound className="input-icon" size={20} />
                <input type="text" placeholder="6-Digit OTP" value={otp} onChange={handleOtpChange} required />
              </div>
              {/* This button is also full-width */}
              <button type="submit" className="btn-primary-action">
                <ShieldCheck size={18} />
                <span>Verify & Create Account</span>
              </button>
            </form>
            
            <div className="otp-footer">
              <button className="resend-otp-link" onClick={() => alert('Resending OTP...')}>
                Resend OTP
              </button>
              <p className="footer-link">
                Already have an account? <a href="/login">Sign In</a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;