import React, { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/FeedbackModal.css'; // reuse your modal CSS for styling

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  const { orderId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a star rating.");
      return;
    }
    const feedbackData = {
      orderId,
      rating,
      comment,
    };
    console.log("Feedback Submitted:", feedbackData);
    alert("Thank you for your feedback!");
    navigate('/'); // redirect to home or orders page after submission
  };

  return (
    <div className="feedback-page">
      <div className="feedback-modal-content">
        <div className="feedback-header">
          <h2 className="feedback-title">Share Your Feedback</h2>
          <p className="feedback-subtitle">How was your experience with Order #{orderId}?</p>
        </div>

        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="star-rating-container">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <Star
                  key={starValue}
                  className={`star-icon ${starValue <= (hoverRating || rating) ? 'filled' : ''}`}
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHoverRating(starValue)}
                  onMouseLeave={() => setHoverRating(0)}
                  size={40}
                />
              );
            })}
          </div>

          <div className="comment-group">
            <textarea
              placeholder="Tell us more about your experience..."
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
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
