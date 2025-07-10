import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../css/FeedbackModal.css';
import { createContactMessage } from "../api/contact"

const FeedbackPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !message) {
      alert("Please fill in both email and message.");
      return;
    }

    try {
      await createContactMessage(email, message);
      alert("Thank you for your feedback!");
      navigate('/');
    } catch (err) {
      console.error("Failed to submit feedback:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="feedback-modal-overlay">
      <div className="feedback-modal-content">
        <button className="close-modal-btn" onClick={handleClose}>
          ❌
        </button>

        <div className="feedback-header">
          <h2 className="feedback-title">Share Your Feedback</h2>
          <p className="feedback-subtitle">We'd love to hear from you.</p>
        </div>

        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="comment-group">
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--input-bg, rgba(0,0,0,0.2))', color: 'var(--text-light)' }}
            />

            <textarea
              placeholder="Tell us more about your experience..."
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn-submit-feedback">
            <Send size={18} />
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;
