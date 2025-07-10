import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FeedbackPage from "./FeedbackPage"
import "../css/OrderSuccess.css";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [showFeedback, setShowFeedback] = useState(false);

  // Show feedback popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFeedback(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="order-success-container">
        <div className="order-card">
          <div className="emoji">🎉</div>
          <h1 className="success-title">Order Placed Successfully!</h1>
          <p className="success-message">
            Thank you for your order. Your items will be shipped shortly.
          </p>

          <div className="success-buttons">
            <button onClick={() => navigate("/")} className="btn btn-shop">
              Continue Shopping
            </button>
            <button onClick={() => navigate("/orders")} className="btn btn-orders">
              View My Orders
            </button>
          </div>
        </div>
      </div>

      {showFeedback && <FeedbackPage />} {/* Feedback modal shown here */}
    </>
  );
};

export default OrderSuccess;
